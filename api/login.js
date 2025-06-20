import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Metode tidak diizinkan' });
  }

  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username dan password wajib diisi.' });
  }

  const filePath = path.join(process.cwd(), 'api', 'users.json');

  let users = [];

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    try {
      users = JSON.parse(fileContent);
    } catch (jsonErr) {
      return res.status(500).json({ message: 'Format users.json tidak valid.' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Gagal membaca users.json' });
  }

  const userIndex = users.findIndex(u => u.username === username && u.password === password);

  if (userIndex === -1) {
    return res.status(401).json({ message: 'Username atau password salah.' });
  }

  if (users[userIndex].active === true) {
    return res.status(403).json({ message: 'Akun sedang digunakan di perangkat lain.' });
  }

  users[userIndex].active = true;

  try {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');
    return res.status(200).json({ message: 'Login berhasil' });
  } catch (err) {
    return res.status(500).json({ message: 'Gagal menyimpan status login.' });
  }
}
