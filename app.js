const express = require('express');
const path = require('path');
const app = express();

// Simulierte Sensordaten
let sensorData = { temperature: 22.5, humidity: 60 };

// Middleware zum Bereitstellen statischer Dateien (z.B. CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Route zum Abrufen der aktuellen Sensordaten (z.B. vom Raspberry Pi)
app.get('/data', (req, res) => {
  res.json(sensorData);  // Hier würdest du die tatsächlichen Daten vom Raspberry Pi senden
});

// Route zum Bereitstellen der Monitoring-Webseite
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
