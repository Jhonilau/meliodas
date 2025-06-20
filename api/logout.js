import { delRedis } from '../lib/redis.js';

export default async function handler(req, res) {
  const { username } = req.body;

  if (!username) return res.status(400).json({ message: 'Username dibutuhkan' });

  try {
    await delRedis(`active:${username}`);
    return res.status(200).json({ message: 'Logout berhasil' });
  } catch (err) {
    return res.status(500).json({ message: 'Gagal logout' });
  }
}
