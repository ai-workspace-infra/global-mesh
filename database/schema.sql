-- ==============================================================================
-- Global Mesh PostgreSQL 15+ Schema (适配 Supabase Cloud DB)
-- Project: xworktech | Ref: iqkxspmhcfqmhk...
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. VPS 运营商表
CREATE TABLE IF NOT EXISTS vps_providers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(32) UNIQUE NOT NULL,
    name VARCHAR(64) NOT NULL,
    website VARCHAR(255) NOT NULL,
    api_endpoint VARCHAR(255),
    color VARCHAR(16) DEFAULT '#3b82f6',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 全球 PoP 节点表
CREATE TABLE IF NOT EXISTS mesh_nodes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    node_id VARCHAR(64) UNIQUE NOT NULL,
    provider_code VARCHAR(32) NOT NULL REFERENCES vps_providers(code) ON DELETE CASCADE,
    city VARCHAR(64) NOT NULL,
    country VARCHAR(64) NOT NULL,
    country_code VARCHAR(8) NOT NULL,
    region VARCHAR(32) NOT NULL, -- APAC, EMEA, US-W, US-E, LATAM, MEA
    lat NUMERIC(9, 6),
    lon NUMERIC(9, 6),
    rtt_ms INT DEFAULT 30,
    status VARCHAR(16) DEFAULT 'active', -- active, degraded, maintenance
    xconec_role VARCHAR(64) DEFAULT 'Gateway Ingress',
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_mesh_nodes_provider ON mesh_nodes(provider_code);
CREATE INDEX IF NOT EXISTS idx_mesh_nodes_region ON mesh_nodes(region);
CREATE INDEX IF NOT EXISTS idx_mesh_nodes_country ON mesh_nodes(country_code);

-- 3. 节点 7 维综合能力与规格表 (对应看板 7 行矩阵)
CREATE TABLE IF NOT EXISTS node_capabilities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    node_id VARCHAR(64) UNIQUE NOT NULL REFERENCES mesh_nodes(node_id) ON DELETE CASCADE,
    cpu_shared_support INT DEFAULT 1,      -- 1: 完全支持, 0.5: 部分, 0: 无
    gpu_support INT DEFAULT 0,             -- 1: 完全支持, 0.5: 部分, 0: 无
    k8s_support INT DEFAULT 1,             -- 1: 托管 K8s (LKE/VKE), 0.5: 需自建, 0: 无
    arch_support INT DEFAULT 1,            -- 1: x86+ARM, 0.5: 仅 x86, 0: 无
    billing_support INT DEFAULT 1,         -- 1: 灵活按时+按月, 0.5: 仅周期付
    region_pop_support INT DEFAULT 1,      -- 1: 核心主备覆盖
    xconec_gateway_support INT DEFAULT 1,  -- 1: 0 端口入站 WireGuard/mTLS
    monthly_cost_usd NUMERIC(8, 2) DEFAULT 5.00,
    traffic_tb INT DEFAULT 1,
    details JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. 国家流量地理热力表 (对应附件 2 矢量世界地图与排行榜)
CREATE TABLE IF NOT EXISTS geo_country_stats (
    country_code VARCHAR(8) PRIMARY KEY,
    country_name VARCHAR(64) NOT NULL,
    request_count BIGINT DEFAULT 0,
    request_display VARCHAR(32) NOT NULL, -- e.g. '142.9k'
    bandwidth_bytes BIGINT DEFAULT 0,
    active_vps_count INT DEFAULT 0,
    top_providers TEXT[] DEFAULT '{}',
    color_intensity VARCHAR(16) DEFAULT '#2b73e3',
    rank_order INT DEFAULT 999,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. 核心流量与安全遥测时序表 (对应附件 2 顶部 3 卡片与底部安全性 4 卡片)
CREATE TABLE IF NOT EXISTS telemetry_snapshots (
    id BIGSERIAL PRIMARY KEY,
    snapshot_time TIMESTAMPTZ DEFAULT NOW(),
    total_requests VARCHAR(32) DEFAULT '225.58k',
    requests_growth VARCHAR(16) DEFAULT '↗ 26.1%',
    total_bandwidth VARCHAR(32) DEFAULT '3.11 GB',
    bandwidth_growth VARCHAR(16) DEFAULT '↗ 11.0%',
    total_visitors VARCHAR(32) DEFAULT '27.41k',
    visitors_growth VARCHAR(16) DEFAULT '↗ 29.5%',
    encrypted_requests VARCHAR(32) DEFAULT '214.95k',
    encrypted_req_rate VARCHAR(16) DEFAULT '95.29%',
    encrypted_bandwidth VARCHAR(32) DEFAULT '3.05 GB',
    encrypted_bw_rate VARCHAR(16) DEFAULT '97.90%',
    sparklines JSONB DEFAULT '{}'::jsonb
);

-- 6. API 动态对账与变更审计日志
CREATE TABLE IF NOT EXISTS sync_audit_logs (
    id BIGSERIAL PRIMARY KEY,
    provider VARCHAR(32) NOT NULL,
    synced_regions_count INT NOT NULL,
    status VARCHAR(16) DEFAULT 'success',
    raw_response_bytes INT,
    synced_at TIMESTAMPTZ DEFAULT NOW()
);
