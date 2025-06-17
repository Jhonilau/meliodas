import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Metode tidak diizinkan' });
  }

  const { username, password } = req.body;

  const filePath = path.resolve(process.cwd(), 'users.json');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const users = JSON.parse(fileContent);

  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    return res.status(200).json({ message: `Selamat datang, ${username}!` });
  } else {
    return res.status(401).json({ message: 'Login gagal. Username atau password salah.' });
  }
}
