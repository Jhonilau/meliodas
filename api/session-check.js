import redis from '../../lib/redis';

export default async function handler(req, res) {
  const { username, token } = req.query;
  const current = await redis.get(`session:${username}`);
  if (current !== token) return res.status(401).json({ message: 'Session tidak valid' });
  return res.status(200).json({ message: 'Valid' });
}
