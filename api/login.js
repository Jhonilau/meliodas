import { setRedis, getRedis } from '../lib/redis.js';
import { v4 as uuidv4 } from 'uuid';
import users from './users.json' with { type: 'json' };

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: 'Username atau password salah.' });

  const sessionKey = `session:${username}`;
  const existing = await getRedis(sessionKey);

  if (existing.result && existing.result !== '') {
    return res.status(403).json({ message: 'Akun sedang digunakan di perangkat lain.' });
  }

  const token = uuidv4();
  await setRedis(sessionKey, token);
  res.status(200).json({ message: 'Login berhasil', token });
}
