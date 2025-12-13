import './SubmitButton.css';

export default function SubmitButton({ onClick, isLoading }) {
  return (
    <button
      className="submit-button"
      onClick={onClick}
      disabled={isLoading}
      type="button"
    >
      {isLoading ? (
        <>
          <span className="spinner"></span> Processing...
        </>
      ) : (
        'Get Suggestions'
      )}
    </button>
  );
}
