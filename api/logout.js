import { clearSession } from '../lib/session.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username } = req.body;
  clearSession(username);
  return res.status(200).json({ message: 'Logout berhasil' });
}
