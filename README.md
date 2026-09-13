# Global Mesh · 一朵不是云的虚拟云
> **A Virtual Cloud That Isn't Just a Cloud**  
> 基于全球 5 大靠谱 VPS 运营商（Linode / Hetzner / UCloud / Contabo / Vultr）的区域交叉覆盖，结合 **Xconec Gateway / One 零信任体系** 构筑的全球非业务带外管理网络（Out-of-Band OOB Network）。

---

## 🌟 核心理念：为什么是“一朵不是云的虚拟云”？

1. **去中心化与防云厂商锁死 (Cloud-Neutral Mesh)**：
   - 彻底摆脱对单一云巨头（AWS / GCP / Azure）的单一依赖与账号/风控单点隐患。
   - 聚合全球 5 家高性价比、互补性极强的独立云厂商：
     - **Linode (Akamai)**：企业级 400G+ Tier-1 私有骨干中继，99.99% SLA，LKE 免费 Kubernetes 控制面；
     - **Hetzner Cloud**：欧洲与北美的算力性价比霸主（€3.79 2C4G ARM），单机 20TB 高速流量，天然的遥测监控与日志汇聚中心；
     - **UCloud Global (uLighthost)**：专注大中华与亚太（香港、东京、台北优质 CN2/BGP），低至 $2.5/mo 的国内运维极速接入第一跳；
     - **Contabo**：4C6G / 100G NVMe / 32TB 流量的资源怪兽（$5.50/mo），承载跨云数据库增量冷备与大型 CI Runner 镜像缓存；
     - **Vultr**：全球 33+ PoP 节点之王，补齐南美、中东、非洲边陲盲区，原生全系 GPU 算力与全自助 BGP Anycast / BYOIP。
2. **双平面绝对物理隔离 (Out-of-Band OOB)**：
   - **业务平面**：面向终端用户的生产公网服务，运行在业务集群上；
   - **非业务管理专网**：所有 SSH 跳板、K8s 控制面 API (6443)、Prometheus 指标拉取、备份传输、BMC/IPMI **严禁监听公网 IP**，全部收敛至由 Global Mesh 构建的内部虚拟私网（`10.240.0.0/16`）。
3. **零信任默认拒绝 (Default-Deny)**：
   - 全球所有 VPS 节点对外入站端口数量为 **0**；
   - 各机房 `Xconec Gateway` 容器通过纯出站（Outbound-Only）WireGuard/mTLS 加密隧道与协调控制面保活；
   - SRE 工程师使用 `Xconec One` 客户端配合硬件 MFA 动态接入，按需签发 15 分钟短效证书，用完即毁。

---

## 📁 目录结构

```text
global-mesh/
├── docs/                                  # 核心设计文档与架构白皮书
│   └── global_oob_management_network.md   # 全球非业务管理网络全景白皮书与能力矩阵
├── web/                                   # 交互式前端可视化看板
│   ├── index.html                         # 综合看板 (7×50 紧凑热力图 + 附件地理位置流量图)
│   └── data/
│       └── vps_live_data.json             # 动态抓取与各机房节点实时数据源
├── deploy/                                # 基础设施自动化配置代码
│   ├── cloud-init/
│   │   └── baseline-security.sh           # 0 公网入站端口防火墙与 BBR 拥塞控制基线
│   ├── docker-compose/
│   │   └── docker-compose.yml             # Xconec Gateway 跨云容器化部署模板
│   └── systemd/
│       └── xconec-gateway.service         # Linux systemd 守护进程服务模板
├── scripts/                               # 数据同步与动态探测工具
│   ├── sync_vps_regions.py                # 自动直连 Linode / Vultr 等云厂商 API 脚本
│   └── latency_probe.py                   # 实时测量客户端至全球节点的 RTT 与丢包率
└── README.md
```

---

## 🚀 快速使用

### 1. 打开交互式多云热力与地理看板
双击在浏览器中直接打开 `web/index.html`：
- **顶部个人名片**：橙色圆头像 HP、账号标识 `@da93628bc13d47af9a · Plus` 与 5 维指标卡；
- **VPS 能力矩阵 (7行 × 50列)**：超紧凑贡献热力图，横轴为各厂商 50 个 PoP 节点，纵轴为 CPU/GPU/K8s/架构/计费等能力；
- **地理位置与流量地图**：高精度矢量世界地图（Requests by country）、右侧国家柱状排行榜、顶部 3 项流量折线卡与底部 4 项安全性加密指标走势；
- **动态抓取引擎**：点击 **“⚡ 动态抓取与实时测速”** 按钮即可触发多云接口实时对账。

### 2. 节点安全加固与网关部署
在任意采购的 VPS 节点（Ubuntu 22.04/24.04 或 Debian 12）上执行：

```bash
# 1. 执行防火墙安全基线 (全部入站封禁，仅保留出站与虚拟网卡通道)
sudo bash deploy/cloud-init/baseline-security.sh

# 2. 启动 Xconec Gateway 组建跨云 Mesh
docker compose -f deploy/docker-compose/docker-compose.yml up -d
```

### 3. 全球月度预算预估
构建覆盖亚太、欧洲、北美、拉美及中东非五大战略防区、100% 异构双活容灾的管理网络，月度总预算仅约 **$20 ~ $23 / 月**：
- UCloud 香港/东京 (亚太首跳): ~$2.50 ~ $4.50
- Hetzner 芬兰/纽伦堡 (遥测监控 20TB): €3.79 (~$4.10)
- Contabo 圣路易斯 (4C6G/32TB 冷备): $5.50
- Linode 法兰克福 (Akamai 骨干): $5.00
- Vultr 圣保罗 (边缘盲区): $3.50
