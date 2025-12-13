import './SymptomInput.css';

export default function SymptomInput({
  id,
  value,
  onChange,
  placeholder = 'Enter symptoms...',
}) {
  return (
    <input
      id={id}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="symptom-input"
    />
  );
}
