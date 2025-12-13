import { useState } from 'react';
import './DoctorSuggestions.css';

export default function DoctorSuggestions() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('General');
  const [userLocation, setUserLocation] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const doctors = {
    'General': [
      { id: 1, name: 'Dr. Sarah Johnson', specialty: 'General Practitioner', experience: '10 years', rating: 4.8, phone: '+1-234-567-8901', locations: ['Downtown Clinic', 'Main Street Medical', 'Central Health Center'] },
      { id: 2, name: 'Dr. Michael Chen', specialty: 'General Practitioner', experience: '15 years', rating: 4.9, phone: '+1-234-567-8902', locations: ['Main Street Medical', 'Park Avenue Clinic', 'Riverside Medical'] },
    ],
    'Cardiology': [
      { id: 3, name: 'Dr. James Wilson', specialty: 'Cardiologist', experience: '12 years', rating: 4.9, phone: '+1-234-567-8903', locations: ['Heart Care Center', 'Downtown Clinic', 'Medical Tower'] },
      { id: 4, name: 'Dr. Emily Davis', specialty: 'Cardiologist', experience: '8 years', rating: 4.7, phone: '+1-234-567-8904', locations: ['Cardiac Institute', 'Main Street Medical', 'Central Health Center'] },
    ],
    'Neurology': [
      { id: 5, name: 'Dr. Robert Martinez', specialty: 'Neurologist', experience: '14 years', rating: 4.8, phone: '+1-234-567-8905', locations: ['Brain Health Clinic', 'Medical Tower', 'Downtown Clinic'] },
      { id: 6, name: 'Dr. Lisa Thompson', specialty: 'Neurologist', experience: '11 years', rating: 4.6, phone: '+1-234-567-8906', locations: ['Neuro Center', 'Park Avenue Clinic', 'Riverside Medical'] },
    ],
    'Respiratory': [
      { id: 7, name: 'Dr. David Brown', specialty: 'Pulmonologist', experience: '13 years', rating: 4.8, phone: '+1-234-567-8907', locations: ['Lung Care Clinic', 'Main Street Medical', 'Medical Tower'] },
      { id: 8, name: 'Dr. Jennifer Lee', specialty: 'Pulmonologist', experience: '9 years', rating: 4.7, phone: '+1-234-567-8908', locations: ['Respiratory Center', 'Downtown Clinic', 'Central Health Center'] },
    ],
    'Gastroenterology': [
      { id: 9, name: 'Dr. William Taylor', specialty: 'Gastroenterologist', experience: '16 years', rating: 4.9, phone: '+1-234-567-8909', locations: ['GI Specialists', 'Main Street Medical', 'Park Avenue Clinic'] },
      { id: 10, name: 'Dr. Patricia White', specialty: 'Gastroenterologist', experience: '10 years', rating: 4.8, phone: '+1-234-567-8910', locations: ['Digestive Health', 'Medical Tower', 'Riverside Medical'] },
    ],
  };

  const specialties = Object.keys(doctors);

  // Get all unique locations
  const allLocations = [...new Set(
    Object.values(doctors).flatMap(doctorList =>
      doctorList.flatMap(doc => doc.locations)
    )
  )].sort();

  const handleSearch = () => {
    if (!userLocation.trim()) {
      alert('Please enter a location');
      return;
    }

    const currentDoctors = doctors[selectedSpecialty] || [];
    
    // Filter doctors by location
    const filtered = currentDoctors.filter(doctor =>
      doctor.locations.some(loc =>
        loc.toLowerCase().includes(userLocation.toLowerCase())
      )
    );

    setFilteredDoctors(filtered);
    setHasSearched(true);
  };

  const handleSpecialtyChange = (specialty) => {
    setSelectedSpecialty(specialty);
    setFilteredDoctors([]);
    setHasSearched(false);
    setUserLocation('');
  };

  const getRiskLevelColor = (level) => {
    switch(level) {
      case 'Low':
        return '#28a745';
      case 'Medium':
        return '#ffc107';
      case 'High':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  return (
    <div className="doctor-suggestions-container">
      <div className="doctor-suggestions-card">
        <h1>Find a Doctor</h1>
        <p className="subtitle">Connect with qualified healthcare professionals near you</p>

        <div className="specialty-selector">
          <h3>Select Specialty:</h3>
          <div className="specialty-buttons">
            {specialties.map((specialty) => (
              <button
                key={specialty}
                className={`specialty-btn ${selectedSpecialty === specialty ? 'active' : ''}`}
                onClick={() => handleSpecialtyChange(specialty)}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>

        <div className="location-search-section">
          <h3>Search by Location:</h3>
          <div className="location-search-bar">
            <input
              type="text"
              value={userLocation}
              onChange={(e) => setUserLocation(e.target.value)}
              placeholder="e.g., Downtown Clinic, Main Street, Park Avenue..."
              className="location-input"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button className="search-btn" onClick={handleSearch}>
              🔍 Search
            </button>
          </div>
          
          {allLocations.length > 0 && (
            <div className="suggested-locations">
              <p className="suggestions-label">Suggested locations:</p>
              <div className="location-tags">
                {allLocations.map((location) => (
                  <button
                    key={location}
                    className="location-tag"
                    onClick={() => {
                      setUserLocation(location);
                    }}
                  >
                    📍 {location}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="doctors-list">
          {hasSearched ? (
            <>
              {filteredDoctors.length === 0 ? (
                <div className="empty-state">
                  <p>No doctors found in <strong>"{userLocation}"</strong> for <strong>{selectedSpecialty}</strong> specialty.</p>
                  <p>Try searching for a different location or specialty.</p>
                </div>
              ) : (
                <>
                  <div className="search-results-info">
                    Found <strong>{filteredDoctors.length}</strong> doctor(s) in <strong>"{userLocation}"</strong> for <strong>{selectedSpecialty}</strong>
                  </div>
                  {filteredDoctors.map((doctor) => (
                    <div key={doctor.id} className="doctor-card">
                      <div className="doctor-header">
                        <div className="doctor-info">
                          <h3 className="doctor-name">{doctor.name}</h3>
                          <p className="doctor-specialty">{doctor.specialty}</p>
                        </div>
                        <div className="doctor-rating">
                          <span className="rating-stars">⭐ {doctor.rating}</span>
                        </div>
                      </div>

                      <div className="doctor-details">
                        <div className="detail-item">
                          <span className="detail-label">📅 Experience:</span>
                          <span className="detail-value">{doctor.experience}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">📍 Available Locations:</span>
                          <span className="detail-value">{doctor.locations.join(', ')}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">📞 Phone:</span>
                          <span className="detail-value">{doctor.phone}</span>
                        </div>
                      </div>

                      <div className="doctor-actions">
                        <button className="btn-appointment">Book Appointment</button>
                        <button className="btn-call">Call Now</button>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </>
          ) : (
            <div className="empty-state">
              <p>👆 Select a specialty and enter your location to find doctors near you.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
