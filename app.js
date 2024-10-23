const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

// Route zum Abrufen der Sensordaten vom Raspberry Pi
app.get('/data', async (req, res) => {
  try {
    // IP-Adresse des Raspberry Pi (ersetze <raspberry_ip> mit der tatsächlichen IP-Adresse deines Pi)
    const response = await axios.get('http://<raspberry_ip>:5000/data');
    res.json(response.data);  // Sensordaten von Pi an die Webseite weitergeben
  } catch (error) {
    console.error('Fehler beim Abrufen der Sensordaten:', error);
    res.status(500).send('Fehler beim Abrufen der Sensordaten');
  }
});

// Statische Dateien wie HTML und CSS bereitstellen
app.use(express.static(path.join(__dirname, 'public')));

// Starten des Servers
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
