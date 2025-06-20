import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Metode tidak diizinkan' });
  }

  const { username, password } = req.body;
  const filePath = path.join(process.cwd(), 'api', 'users.json');

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const users = JSON.parse(fileContent);

    const userIndex = users.findIndex(u => u.username === username && u.password === password);

    if (userIndex === -1) {
      return res.status(401).json({ message: 'Username atau password salah.' });
    }

    if (users[userIndex].active === true) {
      return res.status(403).json({ message: 'Akun sedang digunakan di perangkat lain.' });
    }

    users[userIndex].active = true; // tandai login

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    return res.status(200).json({ message: "Login berhasil" });
  } catch (err) {
    return res.status(500).json({ message: 'Server error: ' + err.message });
  }
}
