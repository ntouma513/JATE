const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001; // Render needs process.env.PORT

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the client/dist directory
app.use(express.static(path.join(__dirname, '../client/dist')));

// Catch-all route to serve the main HTML file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Start server and listen on the assigned PORT
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
