// Import functions for fetching files and their content
import { fetchFiles, fetchFileContent } from '../utils/fetchActions.js';
// Import CSV parsing utility
import { parseCSV } from '../utils/parseCSV.js';

/**
 * Controller function to fetch and process files data
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export async function getFilesData(req, res) {
    try {
        // Fetch list of available files
        const files = await fetchFiles();
        const result = [];

        // Process each file
        for (const file of files) {
            try {
                // Fetch content of current file
                const content = await fetchFileContent(file);
                // Parse CSV content into structured data
                const parsedData = parseCSV(content);
                
                // Only add to result if file contains data
                if (parsedData.length > 0) {
                    result.push({
                        file,
                        // Transform and format the parsed data
                        lines: parsedData.map(({ text, number, hex }) => ({ 
                            text, 
                            number: parseInt(number), // Convert number string to integer
                            hex 
                        }))
                    });
                }
            } catch (error) {
                // Log any errors during individual file processing
                console.error(`Error processing file ${file}:`, error);
            }
        }

        // Send successful response with processed data
        res.json(result);
    } catch (error) {
        // Handle any errors during the entire process
        console.error('Error fetching files:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
