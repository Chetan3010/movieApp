// api/proxy.js
const axios = require('axios');

module.exports = async (req, res) => {
  let url;
  let params = {};

  if (req.method === 'POST') {
    // For POST requests, get URL from body
    ({ url, ...params } = req.body);
  } else {
    // For GET requests, get URL from query params
    ({ url, ...params } = req.query);
  }

  if (!url) {
    console.error('URL is missing from the request');
    return res.status(400).json({ error: 'URL is required' });
  }

  // Get the bearer token from environment variable
  const bearerToken = process.env.TMDB_BEARER_TOKEN;

  if (!bearerToken) {
    console.error('Bearer token is missing from environment variables');
    return res.status(500).json({ error: 'Bearer token is not configured' });
  }

  try {
    console.log('Sending request to TMDB API:', url);
    const response = await axios({
      method: req.method,
      url: `https://api.themoviedb.org${url}`,
      params: params,
      data: req.method === 'POST' ? req.body : undefined,
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Received response from TMDB API');
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error in TMDB API request:', error.message);
    if (error.response) {
      console.error('TMDB API response status:', error.response.status);
      console.error('TMDB API response data:', error.response.data);
    }
    res.status(error.response?.status || 500).json({ error: error.message, details: error.response?.data });
  }
};