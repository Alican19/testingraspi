const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, this is Azure Web App running a Node.js application!');
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
