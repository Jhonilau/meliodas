import fs from 'fs';
import path from 'path';
import redis from '../../lib/redis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Metode tidak diizinkan' });
  }

  const { username, password } = req.body;
  const filePath = path.join(process.cwd(), 'api', 'users.json');

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const users = JSON.parse(fileContent);

    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
      return res.status(401).json({ message: 'Username atau password salah.' });
    }

    const isLoggedIn = await redis.get(`user:${username}`);
    if (isLoggedIn === 'true') {
      return res.status(403).json({ message: 'Akun sedang login di perangkat lain.' });
    }

    await redis.set(`user:${username}`, 'true'); // simpan status login
    return res.status(200).json({ message: 'Login berhasil' });

  } catch (err) {
    return res.status(500).json({ message: 'Gagal menyimpan status login.' });
  }
}
