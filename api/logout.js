import { getRedis, delRedis } from '../lib/redis.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, token } = req.body;
  const sessionKey = `session:${username}`;
  const stored = await getRedis(sessionKey);

  if (!stored.result || stored.result !== token) {
    return res.status(403).json({ message: 'Token tidak valid' });
  }

  await delRedis(sessionKey);
  res.status(200).json({ message: 'Logout berhasil' });
}
