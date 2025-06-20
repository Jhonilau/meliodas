import { v4 as uuidv4 } from 'uuid';
import redis from '../lib/redis.js';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Metode tidak diizinkan' });

  const filePath = path.join(process.cwd(), 'api', 'users.json');
  const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: 'Username atau password salah.' });

  const token = uuidv4();
  await redis.set(`session:${username}`, token);
  return res.status(200).json({ message: 'Login berhasil', token });
}
