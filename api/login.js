import { v4 as uuidv4 } from 'uuid';
import { setRedis, getRedis } from '../lib/redis.js';

const users = [
  { username: 'jhonilau', password: 'tester123' },
  { username: 'singgoy', password: 'polo123' },
  { username: 'brianadam', password: 'cobates123' },
  { username: 'aleksusanto', password: 'sadboy123' },
  { username: 'selanabila', password: 'fendi188' },
  { username: 'harisetiadi', password: 'bola123' },
  { username: 'selvieliza', password: 'kerangwin' },
  { username: 'sitsun', password: 'banteng69' },
  { username: 'charlessusanto', password: 'aleng123' },
  { username: 'wisnuwd', password: 'pucukubi123' },
  { username: 'wisnudp', password: 'pucukkangkung123' },
  { username: 'wisnulc', password: 'bodat123' }
];

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: 'Username atau password salah.' });

  const token = uuidv4();
  await setRedis(`session:${username}`, token);
  return res.status(200).json({ message: 'Login berhasil', token });
}
