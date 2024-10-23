const express = require('express');
const app = express();
app.use(express.json());

// Beispiel-API-Endpunkt
app.post('/data', (req, res) => {
  const data = req.body;  // Daten vom Raspberry Pi
  console.log(data);
  res.status(200).send('Data received');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
