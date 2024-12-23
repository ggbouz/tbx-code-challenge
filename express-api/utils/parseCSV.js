/**
 * Converts CSV content into an array of JavaScript objects
 * @param {string} content - The CSV content as a string
 * @return {Array<Object>} Array of objects where keys are CSV headers and values are row values
 */
export function parseCSV(content) {
  // Split the content into lines using newline character
  const lines = content.split('\n');
  // Extract headers from the first line
  const headers = lines[0].split(',');
  // Initialize array to store resulting objects
  const result = [];

  // Iterate through each line starting from index 1 (skipping headers)
  for (let i = 1; i < lines.length; i++) {
    // Split current line into values
    const values = lines[i].split(',');
    // Only process lines that have the same number of values as headers
    if (values.length === headers.length) {
      const obj = {};
      // Map each header with its corresponding value
      headers.forEach((header, index) => {
        // Remove whitespace from both header and value
        obj[header.trim()] = values[index].trim();
      });
      // Add the object to results array
      result.push(obj);
    }
  }

  return result;
}
