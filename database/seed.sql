-- ==============================================================================
-- Global Mesh PostgreSQL 15+ Seed Data
-- ==============================================================================

-- 1. Providers
INSERT INTO vps_providers (code, name, website, api_endpoint, color) VALUES
('linode', 'Linode (Akamai)', 'https://cloud.linode.com', 'https://api.linode.com/v4/regions', '#2563eb'),
('hetzner', 'Hetzner Cloud', 'https://console.hetzner.com', 'https://api.hetzner.cloud/v1/locations', '#dc2626'),
('ucloud', 'UCloud Global', 'https://www.ucloud-global.com/zh/promotion/ulighthost', 'https://api.ucloud.cn', '#06b6d4'),
('contabo', 'Contabo', 'https://new.contabo.com/servers/vps', 'https://api.contabo.com/v1', '#4f46e5'),
('vultr', 'Vultr', 'https://my.vultr.com/', 'https://api.vultr.com/v2/regions', '#0284c7')
ON CONFLICT (code) DO NOTHING;

-- 2. Country Stats (附件 2 榜单 1:1 注入)
INSERT INTO geo_country_stats (country_code, country_name, request_count, request_display, bandwidth_bytes, active_vps_count, top_providers, color_intensity, rank_order) VALUES
('JP', 'Japan', 142900, '142.9k', 2147483648, 12, ARRAY['vultr', 'linode', 'ucloud', 'contabo'], '#0a2d75', 1),
('US', 'United States', 59910, '59.91k', 1610612736, 14, ARRAY['hetzner', 'linode', 'vultr', 'contabo'], '#1044a0', 2),
('PH', 'Philippines', 21080, '21.08k', 536870912, 1, ARRAY['ucloud'], '#2b73e3', 3),
('NL', 'Netherlands', 13430, '13.43k', 429496729, 4, ARRAY['linode', 'vultr'], '#2b73e3', 4),
('HK', 'Hong Kong', 8440, '8.44k', 322122547, 3, ARRAY['ucloud', 'vultr'], '#0a2d75', 5),
('DE', 'Germany', 8240, '8.24k', 644245094, 8, ARRAY['hetzner', 'linode', 'contabo'], '#1552b8', 6),
('IN', 'India', 6990, '6.99k', 214748364, 3, ARRAY['linode', 'vultr'], '#1b59c4', 7),
('CN', 'China', 6070, '6.07k', 182452224, 2, ARRAY['ucloud'], '#1b59c4', 8),
('SG', 'Singapore', 4760, '4.76k', 375809638, 5, ARRAY['linode', 'hetzner', 'ucloud', 'contabo', 'vultr'], '#0a2d75', 9),
('IL', 'Israel', 4470, '4.47k', 107374182, 1, ARRAY['vultr'], '#2b73e3', 10),
('IT', 'Italy', 3140, '3.14k', 85899345, 2, ARRAY['linode', 'vultr'], '#5895f0', 11),
('CA', 'Canada', 2860, '2.86k', 75161927, 2, ARRAY['linode', 'vultr'], '#8bb5f7', 12)
ON CONFLICT (country_code) DO NOTHING;

-- 3. Telemetry Snapshot
INSERT INTO telemetry_snapshots (
    total_requests, requests_growth, total_bandwidth, bandwidth_growth,
    total_visitors, visitors_growth, encrypted_requests, encrypted_req_rate,
    encrypted_bandwidth, encrypted_bw_rate, sparklines
) VALUES (
    '225.58k', '↗ 26.1%', '3.11 GB', '↗ 11.0%',
    '27.41k', '↗ 29.5%', '214.95k', '95.29%',
    '3.05 GB', '97.90%',
    '{"req": [38,32,40,30,35,22,39,28,34,20,32,18,36,24,33,26,38,15,28,34,22,35,30,25,33,18,30,35,24,29,20,32,28,34,22,31,19,28,34,8,32]}'::jsonb
);
