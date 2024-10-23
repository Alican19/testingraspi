const express = require('express');
const app = express();

let sensorData = { temperatur: null, luftfeuchtigkeit: null };  // Speichern der Sensordaten im Speicher

// Middleware, um JSON-Daten im Body der Anfrage zu parsen
app.use(express.json());

// POST-Route zum Empfangen der Sensordaten vom Raspberry Pi
app.post('/data', (req, res) => {
    const { temperatur, luftfeuchtigkeit } = req.body;

    // Überprüfen, ob die notwendigen Daten vorhanden sind
    if (temperatur !== undefined && luftfeuchtigkeit !== undefined) {
        // Sensordaten im Speicher speichern
        sensorData = { temperatur, luftfeuchtigkeit };
        console.log(`Daten empfangen: Temperatur=${temperatur}°C, Luftfeuchtigkeit=${luftfeuchtigkeit}%`);
        
        // Erfolgsmeldung senden
        res.status(200).send('Daten erfolgreich gespeichert!');
    } else {
        // Fehlermeldung, wenn die Daten unvollständig sind
        res.status(400).send('Fehler: Temperatur und Luftfeuchtigkeit müssen angegeben werden.');
    }
});

// GET-Route zum Abrufen der aktuellen Sensordaten
app.get('/data', (req, res) => {
    if (sensorData.temperatur !== null && sensorData.luftfeuchtigkeit !== null) {
        // Aktuelle Sensordaten zurückgeben
        res.status(200).json(sensorData);
    } else {
        // Fehler: Keine Daten vorhanden
        res.status(404).send('Keine Sensordaten verfügbar.');
    }
});

// Starte den Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});
