import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Metode tidak diizinkan' });
  }

  const { username } = req.body;
  const filePath = path.join(process.cwd(), 'api', 'users.json');

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const users = JSON.parse(fileContent);
    const userIndex = users.findIndex(u => u.username === username);

    if (userIndex !== -1) {
      users[userIndex].active = false;
      fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    }

    res.status(200).json({ message: "Logout berhasil" });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}
