import { setRedis, getRedis } from '../../lib/redis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Metode tidak diizinkan' });
  }

  const { username, password } = req.body;

  const users = [
    { username: 'jhonilau', password: 'tester123' },
    { username: 'admin', password: 'admin123' },
  ];

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Username atau password salah.' });
  }

  try {
    const loginStatus = await getRedis(username);
    if (loginStatus.result === 'true') {
      return res.status(403).json({ message: 'Akun sedang digunakan di tempat lain.' });
    }

    await setRedis(username, 'true');
    return res.status(200).json({ message: 'Login berhasil.' });
  } catch (err) {
    console.error('Redis error:', err);
    return res.status(500).json({ message: 'Gagal menyimpan status login.' });
  }
}
