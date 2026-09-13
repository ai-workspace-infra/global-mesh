package api

import (
	"encoding/json"
	"net/http"
	"time"

	"global-mesh-service/internal/models"
	"global-mesh-service/internal/sync"
)

// SummaryHandler returns 5-metrics for the top capsule card
func SummaryHandler(w http.ResponseWriter, r *http.Request) {
	summary := models.SummaryMetrics{
		TotalVendors:    5,
		TotalActivePoPs: 48,
		OptimalLatency:  "< 32 ms",
		InboundPorts:    0,
		CrossCoverage:   "100%",
	}
	respondJSON(w, http.StatusOK, summary)
}

// TelemetryHandler returns live traffic and security metrics matching screenshot 2
func TelemetryHandler(w http.ResponseWriter, r *http.Request) {
	snapshot := models.TelemetrySnapshot{
		TotalRequests:      "225.58k",
		RequestsGrowth:     "↗ 26.1%",
		TotalBandwidth:     "3.11 GB",
		BandwidthGrowth:    "↗ 11.0%",
		TotalVisitors:      "27.41k",
		VisitorsGrowth:     "↗ 29.5%",
		EncryptedRequests:  "214.95k",
		EncryptedReqGrowth: "↗ 28.9%",
		EncryptedReqRate:   "95.29%",
		EncryptedReqRateGr: "↗ 2.2%",
		EncryptedBandwidth: "3.05 GB",
		EncryptedBwGrowth:  "↗ 9.3%",
		EncryptedBwRate:    "97.90%",
		EncryptedBwRateGr:  "↘ 1.6%",
		Sparklines:         []int{38, 32, 40, 30, 35, 22, 39, 28, 34, 20, 32, 18, 36, 24, 33, 26, 38, 15, 28, 34, 22, 35, 30, 25, 33, 18, 30, 35, 24, 29, 20, 32, 28, 34, 22, 31, 19, 28, 34, 8, 32},
		Timestamp:          time.Now(),
	}
	respondJSON(w, http.StatusOK, snapshot)
}

// GeoStatsHandler returns the country ranked list matching screenshot 2
func GeoStatsHandler(w http.ResponseWriter, r *http.Request) {
	countries := []models.CountryStat{
		{CountryCode: "JP", CountryName: "Japan", RequestCount: 142900, RequestDisplay: "142.9k", PercentShare: 82.0, ActivePoPsCount: 12, ColorIntensity: "#0a2d75"},
		{CountryCode: "US", CountryName: "United States", RequestCount: 59910, RequestDisplay: "59.91k", PercentShare: 48.0, ActivePoPsCount: 14, ColorIntensity: "#1044a0"},
		{CountryCode: "PH", CountryName: "Philippines", RequestCount: 21080, RequestDisplay: "21.08k", PercentShare: 22.0, ActivePoPsCount: 1, ColorIntensity: "#2b73e3"},
		{CountryCode: "NL", CountryName: "Netherlands", RequestCount: 13430, RequestDisplay: "13.43k", PercentShare: 14.0, ActivePoPsCount: 4, ColorIntensity: "#2b73e3"},
		{CountryCode: "HK", CountryName: "Hong Kong", RequestCount: 8440, RequestDisplay: "8.44k", PercentShare: 10.0, ActivePoPsCount: 3, ColorIntensity: "#0a2d75"},
		{CountryCode: "DE", CountryName: "Germany", RequestCount: 8240, RequestDisplay: "8.24k", PercentShare: 9.8, ActivePoPsCount: 8, ColorIntensity: "#1552b8"},
		{CountryCode: "IN", CountryName: "India", RequestCount: 6990, RequestDisplay: "6.99k", PercentShare: 8.5, ActivePoPsCount: 3, ColorIntensity: "#1b59c4"},
		{CountryCode: "CN", CountryName: "China", RequestCount: 6070, RequestDisplay: "6.07k", PercentShare: 7.6, ActivePoPsCount: 2, ColorIntensity: "#1b59c4"},
		{CountryCode: "SG", CountryName: "Singapore", RequestCount: 4760, RequestDisplay: "4.76k", PercentShare: 6.2, ActivePoPsCount: 5, ColorIntensity: "#0a2d75"},
		{CountryCode: "IL", CountryName: "Israel", RequestCount: 4470, RequestDisplay: "4.47k", PercentShare: 5.8, ActivePoPsCount: 1, ColorIntensity: "#2b73e3"},
		{CountryCode: "IT", CountryName: "Italy", RequestCount: 3140, RequestDisplay: "3.14k", PercentShare: 4.2, ActivePoPsCount: 2, ColorIntensity: "#5895f0"},
		{CountryCode: "CA", CountryName: "Canada", RequestCount: 2860, RequestDisplay: "2.86k", PercentShare: 3.9, ActivePoPsCount: 2, ColorIntensity: "#8bb5f7"},
	}
	respondJSON(w, http.StatusOK, countries)
}

// SyncHandler triggers real live sync
func SyncHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}
	res, err := sync.RunLiveSync()
	if err != nil {
		respondJSON(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	respondJSON(w, http.StatusOK, res)
}

func respondJSON(w http.ResponseWriter, status int, data any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(data)
}
