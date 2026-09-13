#!/usr/bin/env bash
# ==============================================================================
# Global Mesh / Xconec Gateway - 0 入站端口暴露安全基线与网络优化脚本
# ==============================================================================
set -euo pipefail

echo "==> [1/3] 配置 Linux 内核 BBR 拥塞控制与 IP 转发..."
cat << 'SYSCTL' > /etc/sysctl.d/99-global-mesh.conf
net.core.default_qdisc = fq
net.ipv4.tcp_congestion_control = bbr
net.ipv4.ip_forward = 1
net.ipv6.conf.all.forwarding = 1
net.ipv4.conf.all.rp_filter = 2
SYSCTL
sysctl --system

echo "==> [2/3] 配置 iptables 零暴露基线 (默认丢弃所有入站连接)..."
# 清空现有规则
iptables -F
iptables -X
iptables -t nat -F
iptables -t nat -X

# 默认策略：入站丢弃，转发丢弃，出站允许
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

# 允许本地环回接口
iptables -A INPUT -i lo -j ACCEPT
iptables -A OUTPUT -o lo -j ACCEPT

# 允许已经建立的关联出站连接的响应流量 (出站长连接保活)
iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

# 仅放行 Xconec 虚拟隧道接口 (例如 xconec0 / wg0)
iptables -A INPUT -i xconec+ -j ACCEPT
iptables -A FORWARD -i xconec+ -j ACCEPT
iptables -A FORWARD -o xconec+ -j ACCEPT

# 开启内网受管网段 (10.240.0.0/16) 的 NAT 伪装
iptables -t nat -A POSTROUTING -s 10.240.0.0/16 -o eth0 -j MASQUERADE

echo "==> [3/3] 持久化防火墙规则..."
if command -v netfilter-persistent &> /dev/null; then
    netfilter-persistent save
fi

echo "==> [DONE] 节点安全基线已就绪，所有公网外部端口完全隐身！"
