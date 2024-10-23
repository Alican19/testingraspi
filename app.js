const express = require('express');
const path = require('path');
const app = express();

// Simulierte Sensordaten (werden durch POST-Anfragen überschrieben)
let sensorData = { temperature: 22.5, humidity: 60 };

// Statische Dateien bereitstellen
app.use(express.static(path.join(__dirname, 'public')));

// Middleware für JSON-Daten
app.use(express.json());

// POST-Route zum Empfangen der Sensordaten vom Raspberry Pi
app.post('/data', (req, res) => {
  sensorData = req.body;
  console.log(`Daten empfangen: ${JSON.stringify(sensorData)}`);
  res.status(200).send('Data received successfully');
});

// GET-Route zum Abrufen der aktuellen Sensordaten
app.get('/data', (req, res) => {
  res.json(sensorData);
});

// Route für die Vue.js-Anwendung
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
