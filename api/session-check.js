import redis from '../lib/redis';

export default async function handler(req, res) {
  const username = req.headers['x-username'];
  const token = req.headers['x-token'];

  if (!username || !token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const session = await redis.get(`session:${username}`);
  if (session !== token) {
    return res.status(403).json({ message: 'Session invalid atau digunakan di tempat lain' });
  }

  return res.status(200).json({ message: 'Session valid' });
}
