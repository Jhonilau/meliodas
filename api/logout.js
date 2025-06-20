import redis from '../../lib/redis';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { username } = req.body;
  await redis.del(`active:${username}`);
  return res.status(200).json({ message: 'Logout berhasil' });
}
