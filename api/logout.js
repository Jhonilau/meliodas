import redis from '../../lib/redis';

export default async function handler(req, res) {
  const { username } = req.body;
  if (!username)
    return res.status(400).json({ message: 'Username tidak diberikan.' });

  await redis.del(`active:${username}`);
  res.status(200).json({ message: 'Logout berhasil.' });
}
