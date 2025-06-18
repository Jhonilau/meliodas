import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== 'admin123') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const filePath = path.resolve(process.cwd(), 'users.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const users = JSON.parse(fileContent);

  res.status(200).json(users);
}
