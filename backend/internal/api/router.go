package api

import "net/http"

func NewRouter() http.Handler {
	mux := http.NewServeMux()

	// Health check (Cloud Run ping)
	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	// V1 API Endpoints
	mux.HandleFunc("/api/v1/metrics/summary", SummaryHandler)
	mux.HandleFunc("/api/v1/telemetry", TelemetryHandler)
	mux.HandleFunc("/api/v1/geo/stats", GeoStatsHandler)
	mux.HandleFunc("/api/v1/sync", SyncHandler)

	return withCORS(mux)
}

func withCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		next.ServeHTTP(w, r)
	})
}
