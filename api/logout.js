import { delRedis } from '../lib/redis.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username } = req.body;
  await delRedis(`session:${username}`);
  return res.status(200).json({ message: 'Logout berhasil.' });
}
