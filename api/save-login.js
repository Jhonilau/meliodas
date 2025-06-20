import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const filePath = path.join(process.cwd(), 'api', 'users.json');

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username dan password wajib diisi.' });
    }

    const usersRaw = fs.readFileSync(filePath, 'utf-8');
    let users = [];

    try {
      users = JSON.parse(usersRaw);
    } catch (jsonErr) {
      return res.status(500).json({ message: 'Format users.json tidak valid.' });
    }

    const exists = users.find((u) => u.username === username);
    if (exists) {
      return res.status(409).json({ message: 'Username sudah ada.' });
    }

    users.push({ username, password, active: false });

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');

    res.status(200).json({ message: 'User berhasil ditambahkan' });

  } catch (err) {
    console.error('[SAVE-LOGIN ERROR]', err);
    res.status(500).json({ message: 'Terjadi kesalahan saat menyimpan user.' });
  }
}
