import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const adminKey = req.headers['x-admin-key'];

  if (adminKey !== 'admin123') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Gunakan path eksplisit agar work di serverless Vercel
  const filePath = path.join(process.cwd(), 'api', 'users.json');

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const users = JSON.parse(fileContent);
    res.status(200).json(users);
  } catch (err) {
    console.error("❌ Gagal membaca users.json:", err.message);
    res.status(500).json({ message: 'Gagal membaca file user.' });
  }
}
