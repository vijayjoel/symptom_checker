import { useState } from "react";
import "./DoctorSuggestions.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function DoctorSuggestions() {
  const [userLocation, setUserLocation] = useState("");
  const [hospitals, setHospitals] = useState([]); // Changed from filteredDoctors
  const [isLoading, setIsLoading] = useState(false); // New state for loading
  const [error, setError] = useState(""); // New state for errors
  const [hasSearched, setHasSearched] = useState(false);

  // Removed selectedSpecialty and doctors data as we'll fetch hospitals

  const allLocations = []; // This will be fetched from backend or removed if not needed for hospitals

  const handleSearch = async () => {
    if (!userLocation.trim()) {
      setError("Please enter a location");
      setHospitals([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/hospitals?location=${encodeURIComponent(
          userLocation
        )}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch hospitals");
      }
      const data = await response.json();
      setHospitals(data.hospitals || []);
    } catch (err) {
      setError(err.message || "An error occurred while fetching hospitals.");
      setHospitals([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Removed handleSpecialtyChange and getRiskLevelColor as they are not directly related to hospitals

  return (
    <div className="doctor-suggestions-container">
      <div className="doctor-suggestions-card">
        <h1>Find Hospitals by Location</h1>
        <p className="subtitle">Search for hospitals by entering a location.</p>

        {/* Removed specialty selector */}

        <div className="location-search-section">
          <h3>Search by Location:</h3>
          <div className="location-search-bar">
            <input
              type="text"
              value={userLocation}
              onChange={(e) => setUserLocation(e.target.value)}
              placeholder="e.g., hospitals in india  and near your city"
              className="location-input"
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <button className="search-btn" onClick={handleSearch}>
              🔍 Search Hospitals
            </button>
          </div>

          {/* Removed suggested locations as we'll fetch from backend */}
        </div>

        <div className="hospitals-list">
          {isLoading && <p>Loading hospitals...</p>}
          {error && <p className="error-message">Error: {error}</p>}

          {!isLoading && !error && hasSearched && (
            <>
              {hospitals.length === 0 ? (
                <div className="empty-state">
                  <p>
                    No hospitals found in <strong>"{userLocation}"</strong>.
                  </p>
                  <p>Try searching for a different location.</p>
                </div>
              ) : (
                <>
                  <div className="search-results-info">
                    Found <strong>{hospitals.length}</strong> hospital(s) in{" "}
                    <strong>"{userLocation}"</strong>
                  </div>
                  {hospitals.map((hospital) => (
                    <div key={hospital.id} className="hospital-card">
                      <div className="hospital-header">
                        <div className="hospital-info">
                          <h3 className="hospital-name">{hospital.name}</h3>
                          {hospital.specialties &&
                            hospital.specialties.length > 0 && (
                              <p className="hospital-specialties">
                                Specialties: {hospital.specialties.join(", ")}
                              </p>
                            )}
                        </div>
                        {hospital.rating && (
                          <div className="hospital-rating">
                            <span className="rating-stars">
                              ⭐ {hospital.rating}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="hospital-details">
                        {hospital.address && (
                          <div className="detail-item">
                            <span className="detail-label">📍 Address:</span>
                            <span className="detail-value">
                              {hospital.address}
                            </span>
                          </div>
                        )}
                        {hospital.phone && (
                          <div className="detail-item">
                            <span className="detail-label">📞 Phone:</span>
                            <span className="detail-value">
                              {hospital.phone}
                            </span>
                          </div>
                        )}
                        {hospital.website && (
                          <div className="detail-item">
                            <span className="detail-label">🌐 Website:</span>
                            <a
                              href={hospital.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="detail-value"
                            >
                              {hospital.website}
                            </a>
                          </div>
                        )}
                      </div>

                      <div className="hospital-actions">
                        {hospital.phone && (
                          <button className="btn-call">Call Hospital</button>
                        )}
                        {hospital.website && (
                          <button
                            className="btn-website"
                            onClick={() =>
                              window.open(hospital.website, "_blank")
                            }
                          >
                            Visit Website
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </>
          )}

          {!isLoading && !error && !hasSearched && (
            <div className="empty-state">
              <p>👆 Enter a location to find hospitals near you.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}