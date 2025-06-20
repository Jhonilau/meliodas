import { setRedis } from '../../lib/redis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Metode tidak diizinkan' });
  }

  const { username } = req.body;
  try {
    await setRedis(username, 'false');
    return res.status(200).json({ message: 'Berhasil logout' });
  } catch (err) {
    return res.status(500).json({ message: 'Gagal logout' });
  }
}
