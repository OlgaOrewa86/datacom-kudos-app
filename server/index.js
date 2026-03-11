const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// In-memory storage for demonstration
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

let kudos = [];

// Endpoints
app.get('/api/users', (req, res) => {
  res.json(users);
});

app.get('/api/kudos', (req, res) => {
  // return most recent first
  res.json(kudos.slice().reverse());
});

app.post('/api/kudos', (req, res) => {
  const { fromId, toId, message } = req.body;
  const from = users.find(u => u.id === fromId);
  const to = users.find(u => u.id === toId);
  if (!from || !to || !message) {
    return res.status(400).json({ error: 'Invalid data' });
  }
  const newKudo = {
    id: kudos.length + 1,
    from,
    to,
    message,
    timestamp: new Date().toISOString()
  };
  kudos.push(newKudo);
  res.status(201).json(newKudo);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
