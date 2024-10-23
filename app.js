const express = require('express');
const path = require('path');
const app = express();

// Simulierte Sensordaten (werden später durch POST-Anfragen überschrieben)
let sensorData = { temperature: 22.5, humidity: 60 };

// Middleware zum Bereitstellen statischer Dateien (z.B. CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware zum Verarbeiten von JSON-Daten (für POST-Anfragen)
app.use(express.json());

// POST-Route zum Empfangen der Sensordaten vom Raspberry Pi
app.post('/data', (req, res) => {
  // Die Sensordaten vom Raspberry Pi werden in sensorData gespeichert
  sensorData = req.body;
  console.log(`Daten empfangen: ${JSON.stringify(sensorData)}`);
  res.status(200).send('Data received successfully');
});

// GET-Route zum Abrufen der aktuellen Sensordaten
app.get('/data', (req, res) => {
  res.json(sensorData);  // Hier werden die aktuellen Sensordaten zurückgegeben
});

// Route zum Bereitstellen der Monitoring-Webseite
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
