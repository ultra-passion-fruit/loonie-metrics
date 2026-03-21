const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors()); // Allows your Vite frontend (localhost:5173) to connect
app.use(express.json());

const PORT = 3001;
const STATSCAN_URL = 'https://www150.statcan.gc.ca/t1/wds/rest';

// This is your custom endpoint
app.post('/api/stats', async (req, res) => {
  try {
    // Forward the exact request body from your frontend to StatsCan
    const response = await axios.post(
      `${STATSCAN_URL}/getCubeMetadata`, 
      req.body
    );
    
    // Send the data back to your frontend
    res.json(response.data);
  } catch (error) {
    console.error("Proxy Error:", error.message);
    res.status(500).json({ error: "Failed to fetch data from StatsCan" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend proxy running at http://localhost:${PORT}`);
});