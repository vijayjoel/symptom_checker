import './History.css';

export default function History({ reports, onBack, onDelete, onViewReport }) {
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
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
    <div className="history-container">
      <div className="history-card">
        <h1>Report History</h1>

        {reports.length === 0 ? (
          <div className="empty-state">
            <p>No reports yet. Submit your first symptom assessment to get started!</p>
          </div>
        ) : (
          <div className="reports-list">
            {reports.map((report) => (
              <div key={report.id} className="report-item" onClick={() => onViewReport(report)}>
                <div className="report-header">
                  <div className="report-date">{formatDate(report.timestamp)}</div>
                  <div
                    className="report-risk-badge"
                    style={{ backgroundColor: getRiskLevelColor(report.riskLevel), color: 'white' }}
                  >
                    {report.riskLevel}
                  </div>
                </div>

                <div className="report-symptoms">
                  <strong>Symptoms:</strong> {report.symptoms}
                </div>

                <div className="report-preview">
                  <strong>Assessment:</strong>
                  <p>{report.suggestions.substring(0, 150)}...</p>
                </div>

                <button
                  className="delete-button"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the onViewReport when clicking delete
                    if (window.confirm('Are you sure you want to delete this report?')) {
                      onDelete(report.id);
                    }
                  }}
                >
                  🗑️ Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
