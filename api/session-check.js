import { getSession } from '../lib/session.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, token } = req.body;
  const currentToken = getSession(username);

  if (currentToken !== token) {
    return res.status(403).json({ message: 'Sesi tidak valid.' });
  }

  return res.status(200).json({ message: 'Sesi valid.' });
}
