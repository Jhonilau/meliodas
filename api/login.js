import users from '../lib/users.js';
import { setSession, getSession } from '../lib/session.js';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: 'Username atau password salah.' });

  const existing = await getSession(username);
  if (existing !== null && existing !== undefined) {
    return res.status(403).json({ message: 'Akun sedang login di tempat lain.' });
  }

  const token = uuidv4();
  await setSession(username, token);
  return res.status(200).json({ message: 'Login berhasil', token });
}
