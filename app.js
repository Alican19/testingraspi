// app.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hallo, Azure!');
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});