const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('public'));

app.get('/api/talks', (req, res) => {
  const talksPath = path.join(__dirname, 'data', 'talks.json');
  const { speaker } = req.query;

  fs.readFile(talksPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send({ error: 'Failed to read talk data' });
      return;
    }
    
    let talks = JSON.parse(data);
    
    if (speaker) {
      const searchTerm = speaker.toLowerCase();
      talks = talks.filter(talk => 
        talk.speakers && talk.speakers.some(s => s.toLowerCase().includes(searchTerm))
      );
    }

    res.send(talks);
  });
});

app.listen(PORT, () => {
  console.log(`NeonTech Event Server running at http://localhost:${PORT}`);
});
