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
        return res.status(400).json({ error: 'URL is required' });
    }

    // Get the bearer token from environment variable
    const bearerToken = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTg2YjkwMGI4MWNjNDUzYWY1NmUyY2ZmN2E3MTg4YiIsIm5iZiI6MTcyMzkxMTcwOC41MTgyNDcsInN1YiI6IjY0NGU5NWRkMzVjMzBhMDM3MDYxNWExMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j4jgoDp8vh1klDn2LZ4bfXVeGE8BDBkFYZiaEVNLQio`

    if (!bearerToken) {
        return res.status(500).json({ error: 'Bearer token is not configured' });
    }

    try {
        const response = await axios({
            method: req.method,
            url: url,
            params: params,
            data: req.method === 'POST' ? req.body : undefined,
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.log(error);
        res.status(error.response?.status || 500).json({ error: error.message });
    }
};