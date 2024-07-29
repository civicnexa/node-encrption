// Import necessary modules
const express = require("express");
const { SHA256, enc } = require("crypto-js");

// Function to convert ASCII to Hex
const asciiToHex = (value) => enc.Utf8.parse(value).toString(enc.Hex);

// Function to compute hash
const computeHash = (url, key) => {
  return SHA256(enc.Hex.parse(key + asciiToHex(url.toLowerCase())))
    .toString(enc.Hex)
    .toUpperCase();
};

// Create Express app
const app = express();
const port = 3000; // You can change the port as needed

// Middleware to parse JSON in the request body
app.use(express.json());

// Define endpoint to compute hash
app.post("/computeHash", (req, res) => {
  const { url, key } = req.body;

  // Check if url and key are provided
  if (!url || !key) {
    return res
      .status(400)
      .json({ error: 'Both "url" and "key" parameters are required.' });
  }

  // Compute the hash
  const hash = computeHash(url, key);

  // Send the hash as a response
  res.json({ hash });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
