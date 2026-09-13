package models

import "time"

// SummaryMetrics represents the 5-metric capsule card
type SummaryMetrics struct {
	TotalVendors    int    `json:"total_vendors"`
	TotalActivePoPs int    `json:"total_active_pops"`
	OptimalLatency  string `json:"optimal_latency"`
	InboundPorts    int    `json:"inbound_ports"`
	CrossCoverage   string `json:"cross_coverage"`
}

// MeshNode represents a VPS datacenter point of presence
type MeshNode struct {
	ID           string    `json:"id"`
	Vendor       string    `json:"vendor"`
	City         string    `json:"city"`
	Country      string    `json:"country"`
	CountryCode  string    `json:"country_code"`
	Region       string    `json:"region"`
	RTT          int       `json:"rtt"`
	Capabilities []float64 `json:"capabilities"` // 7 values for the 7 rows
	Description  string    `json:"description"`
	Status       string    `json:"status"`
	Role         string    `json:"role"`
}

// CountryStat represents a country entry in the ranked map list
type CountryStat struct {
	CountryCode     string  `json:"country_code"`
	CountryName     string  `json:"country_name"`
	RequestCount    int64   `json:"request_count"`
	RequestDisplay  string  `json:"request_display"`
	PercentShare    float64 `json:"percent_share"`
	ActivePoPsCount int     `json:"active_pops_count"`
	ColorIntensity  string  `json:"color_intensity"`
}

// TelemetrySnapshot represents the live traffic and encryption data
type TelemetrySnapshot struct {
	TotalRequests      string   `json:"total_requests"`
	RequestsGrowth     string   `json:"requests_growth"`
	TotalBandwidth     string   `json:"total_bandwidth"`
	BandwidthGrowth    string   `json:"bandwidth_growth"`
	TotalVisitors      string   `json:"total_visitors"`
	VisitorsGrowth     string   `json:"visitors_growth"`
	EncryptedRequests  string   `json:"encrypted_requests"`
	EncryptedReqGrowth string   `json:"encrypted_req_growth"`
	EncryptedReqRate   string   `json:"encrypted_req_rate"`
	EncryptedReqRateGr string   `json:"encrypted_req_rate_growth"`
	EncryptedBandwidth string   `json:"encrypted_bandwidth"`
	EncryptedBwGrowth  string   `json:"encrypted_bw_growth"`
	EncryptedBwRate    string   `json:"encrypted_bw_rate"`
	EncryptedBwRateGr  string   `json:"encrypted_bw_rate_growth"`
	Sparklines         []int    `json:"sparklines"`
	Timestamp          time.Time `json:"timestamp"`
}
