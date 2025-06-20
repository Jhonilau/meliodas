import { v4 as uuidv4 } from 'uuid';
import redis from '../lib/redis';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Metode tidak diizinkan' });

  const { username, password } = req.body;
  const users = require('./users.json');

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: 'Username atau password salah.' });

  const token = uuidv4();

  await redis.set(`session:${username}`, token);
  return res.status(200).json({ message: 'Login berhasil', token });
}
