import redis from '../lib/redis.js';

export default async function handler(req, res) {
  const { username, token } = req.query;

  if (!username || !token) {
    return res.status(400).json({ active: false });
  }

  const storedToken = await redis.get(`session:${username}`);
  const isValid = storedToken === token;

  return res.status(200).json({ active: isValid });
}
