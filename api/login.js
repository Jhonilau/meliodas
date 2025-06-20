import { v4 as uuidv4 } from 'uuid';
import redis from '../lib/redis.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Metode tidak diizinkan' });
  }

  const { username, password } = req.body;

  // Baca file users.json
  const filePath = path.join(__dirname, 'users.json');
  const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Username atau password salah.' });
  }

  const token = uuidv4();

  const existing = await redis.get(`session:${username}`);
  if (existing && existing !== token) {
    return res.status(403).json({ message: 'Akun sedang digunakan di perangkat lain.' });
  }

  await redis.set(`session:${username}`, token);
  return res.status(200).json({ message: 'Login berhasil', token });
}
