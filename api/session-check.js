import redis from '../lib/redis';

export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) return res.status(400).json({ message: 'Username tidak ada' });

  const token = await redis.get(`active:${username}`);
  return res.status(200).json({ token });
}
