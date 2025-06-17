const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());

const users = [
  { username: "jhonilau", password: "tester123" },
  { username: "admin", password: "admin123" }
];

let sessionMap = {}; // { username: sessionId }

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.json({ success: false, message: "Username atau password salah." });

  const sessionId = Date.now().toString() + Math.random().toString(36).substr(2);
  sessionMap[username] = sessionId;
  res.json({ success: true, username, sessionId });
});

app.post('/check-session', (req, res) => {
  const { username, sessionId } = req.body;
  const valid = sessionMap[username] === sessionId;
  res.json({ valid });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server aktif di http://localhost:${PORT}`));
