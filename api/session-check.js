import { getRedis } from '../lib/redis.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, token } = req.body;
  const savedToken = await getRedis(`session:${username}`);

  if (!savedToken || savedToken !== token) {
    return res.status(403).json({ message: 'Sesi tidak valid.' });
  }

  return res.status(200).json({ message: 'Sesi valid.' });
}
