export interface SummaryMetrics {
  total_vendors: number;
  total_active_pops: number;
  optimal_latency: string;
  inbound_ports: number;
  cross_coverage: string;
}

export interface TelemetrySnapshot {
  total_requests: string;
  requests_growth: string;
  total_bandwidth: string;
  bandwidth_growth: string;
  total_visitors: string;
  visitors_growth: string;
  encrypted_requests: string;
  encrypted_req_growth: string;
  encrypted_req_rate: string;
  encrypted_bandwidth: string;
  encrypted_bw_rate: string;
}

export interface CountryStat {
  country_code: string;
  country_name: string;
  request_count: number;
  request_display: string;
  percent_share: number;
  active_pops_count: number;
  color_intensity: string;
}
