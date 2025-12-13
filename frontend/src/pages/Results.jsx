import './Results.css';

export default function Results({ suggestions, userInput, riskLevel, disclaimer, onBack, error }) {
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

  const getRiskLevelBgColor = (level) => {
    switch(level) {
      case 'Low':
        return '#d4edda';
      case 'Medium':
        return '#fff3cd';
      case 'High':
        return '#f8d7da';
      default:
        return '#e2e3e5';
    }
  };

  // Parse and format the suggestions with bold text and proper line breaks
  const renderFormattedText = (text) => {
    if (!text) return null;
    
    return text.split('\n').map((line, index) => {
      if (!line.trim()) return <br key={index} />;
      
      // Check if line contains ** (bold markers)
      const isBold = line.includes('**');
      const isHeading = /^[A-Z\s]+:/.test(line.trim());
      
      // Remove ** markers
      let processedLine = line.replace(/\*\*/g, '');
      
      // Check for numbered items
      const isNumbered = /^\d+\.\s/.test(processedLine);
      
      return (
        <p
          key={index}
          className={`suggestion-line ${(isBold || isHeading) ? 'bold-text' : ''} ${isNumbered ? 'numbered-item' : ''}`}
        >
          {processedLine}
        </p>
      );
    });
  };

  return (
    <div className="results-container">
      <div className="results-card">
        <button onClick={onBack} className="back-button">← Back</button>
        <h1>Health Assessment Results</h1>

        {error && (
          <div className="error-message">
            <strong>Error:</strong> {error}
          </div>
        )}

        {!error && (
          <>
            <div className="user-input-section">
              <h2>Your Symptoms:</h2>
              <p className="user-input">{userInput}</p>
            </div>

            {riskLevel && (
              <div className="risk-level-section" style={{ borderColor: getRiskLevelColor(riskLevel), backgroundColor: getRiskLevelBgColor(riskLevel) }}>
                <div className="risk-level-label">Risk Assessment:</div>
                <div className="risk-level-badge" style={{ color: getRiskLevelColor(riskLevel) }}>
                  {riskLevel}
                </div>
              </div>
            )}

            <div className="suggestions-section">
              <h2>Information & Recommendations:</h2>
              <div className="suggestions-content">
                {renderFormattedText(suggestions)}
              </div>
            </div>

            {disclaimer && (
              <div className="final-disclaimer">
                <strong>⚠️ Important:</strong> {disclaimer}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
