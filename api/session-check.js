import redis from '../lib/redis.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  const { username, token } = req.query;
  if (!username || !token) return res.status(400).json({ message: 'Bad request' });

  const activeToken = await redis.get(`session:${username}`);
  if (activeToken !== token) {
    return res.status(403).json({ message: 'Token tidak valid' });
  }

  return res.status(200).json({ message: 'Token valid' });
}
