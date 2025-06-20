import redis from '../lib/redis.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method Not Allowed' });

  const username = req.query.username;
  const token = req.query.token;
  if (!username || !token) return res.status(400).json({ message: 'Missing credentials' });

  const savedToken = await redis.get(`session:${username}`);
  if (savedToken !== token) {
    await redis.del(`session:${username}`);  // auto-reset
    return res.status(403).json({ message: 'Sesi tidak valid atau sudah logout' });
  }

  return res.status(200).json({ message: 'Sesi aktif' });
}
