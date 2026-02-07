const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('public'));

app.get('/api/talks', (req, res) => {
  const talksPath = path.join(__dirname, 'data', 'talks.json');
  fs.readFile(talksPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send({ error: 'Failed to read talk data' });
      return;
    }
    res.send(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`NeonTech Event Server running at http://localhost:${PORT}`);
});
