import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username } = req.body;
  const filePath = path.join(process.cwd(), 'api', 'users.json');

  let users = [];
  try {
    users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (e) {
    users = [];
  }

  const now = new Date().toISOString();
  const existing = users.find(u => u.username === username);

  if (existing) {
    existing.lastLogin = now;
  } else {
    users.push({ username, password: "", lastLogin: now });
  }

  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  res.status(200).json({ message: "Login saved." });
}
