export const formatResponse = (rawResponse) => {
  // Basic formatting - ensure response is clean and well-structured
  if (!rawResponse) {
    return 'No suggestions available';
  }

  // Convert escaped newlines to actual newlines
  let formatted = rawResponse.trim();
  formatted = formatted.replace(/\\n/g, '\n');

  // Ensure proper line breaks are preserved
  formatted = formatted.replace(/\n\n+/g, '\n\n');

  return formatted;
};
