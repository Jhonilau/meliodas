import fs from 'fs/promises';
import path from 'path';

const usersPath = path.resolve('api/users.json');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username } = req.body;
  const usersRaw = await fs.readFile(usersPath, 'utf-8');
  const users = JSON.parse(usersRaw);

  const user = users.find(u => u.username === username);
  if (user) {
    user.activeToken = null;
    await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
  }

  return res.status(200).json({ message: 'Logout berhasil' });
}
