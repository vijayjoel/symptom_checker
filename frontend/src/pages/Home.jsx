import { useState } from 'react';
import SymptomInput from '../components/SymptomInput';
import SubmitButton from '../components/SubmitButton';
import './Home.css';

export default function Home({ onSubmit, isLoading }) {
  const [symptoms, setSymptoms] = useState('');
  const [freeText, setFreeText] = useState('');

  const handleSubmit = () => {
    if (!symptoms.trim() && !freeText.trim()) {
      alert('Please enter at least one symptom or description');
      return;
    }
    onSubmit(symptoms, freeText);
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h1>Symptom Checker</h1>
        <p className="subtitle">
          Enter your symptoms below and get general health information
        </p>

        <div className="form-group">
          <label htmlFor="symptoms">Common Symptoms:</label>
          <SymptomInput
            id="symptoms"
            value={symptoms}
            onChange={setSymptoms}
            placeholder="e.g., headache, fever, cough"
          />
        </div>

        <div className="form-group">
          <label htmlFor="freeText">Additional Details:</label>
          <textarea
            id="freeText"
            value={freeText}
            onChange={(e) => setFreeText(e.target.value)}
            placeholder="Describe any additional symptoms or context..."
            className="free-text-input"
            rows="3"
          />
        </div>

        <SubmitButton onClick={handleSubmit} isLoading={isLoading} />

        <div className="disclaimer">
          <strong>⚠️ Disclaimer:</strong> This tool provides general health
          information only and is not a substitute for professional medical
          advice. Always consult a healthcare professional for diagnosis.
        </div>
      </div>
    </div>
  );
}
