import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const usersPath = path.resolve('api/users.json');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body;
  const usersRaw = await fs.readFile(usersPath, 'utf-8');
  const users = JSON.parse(usersRaw);

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: 'Username atau password salah.' });

  const token = uuidv4();
  user.activeToken = token;
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2));

  return res.status(200).json({ message: 'Login berhasil', token });
}
