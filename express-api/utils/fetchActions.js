import fetch from 'node-fetch';

// API configuration constants
const API_URL = 'https://echo-serv.tbxnet.com/v1/secret';
const API_KEY = 'Bearer aSuperSecretKey';

/**
 * Fetches the list of available files from the API
 * @returns {Promise<Array>} Array of file names
 */
export async function fetchFiles() {
  // Make GET request to the files endpoint
  const response = await fetch(`${API_URL}/files`, {
    headers: { 'Authorization': API_KEY }
  });
  // Parse JSON response
  const data = await response.json();
  // Return only the files array from the response
  return data.files;
}

/**
 * Fetches the content of a specific file from the API
 * @param {string} fileName - Name of the file to fetch
 * @returns {Promise<string>} File content as text
 */
export async function fetchFileContent(fileName) {
  // Make GET request to fetch specific file content
  const response = await fetch(`${API_URL}/file/${fileName}`, {
    headers: { 'Authorization': API_KEY }
  });
  // Return the file content as text
  return await response.text();
}
