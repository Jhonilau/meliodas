import { delRedis } from '../lib/redis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Metode tidak diizinkan' });
  }

  const { username } = req.body;
  await delRedis(`active:${username}`);
  return res.status(200).json({ message: 'Logout berhasil' });
}
