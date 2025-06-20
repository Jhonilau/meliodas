import redis from '../../lib/redis.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Only POST' });
  const { username, token } = req.body;
  const stored = await redis.get(`session:${username}`);
  if (stored && stored === token) {
    return res.status(200).json({ active: true });
  }
  res.status(401).json({ active: false });
}
