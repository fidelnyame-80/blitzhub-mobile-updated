import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Allow only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Methods', 'POST'); // Restrict to POST requests
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers

  try {
    // Parse the incoming request body
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Forward the data to your target endpoint (e.g., Google Apps Script)
    const googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    const response = await fetch(googleAppsScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, subject, message }),
    });

    // Handle the response from Google Apps Script
    const result = await response.json();
    if (response.ok) {
      return res.status(200).json(result); // Success response
    } else {
      return res.status(500).json({ error: 'Failed to forward data to Google Apps Script.' });
    }
  } catch (error) {
    console.error('Error handling request:', error); // Log the error for debugging
    return res.status(500).json({ error: 'An unexpected error occurred.' });
  }
}
