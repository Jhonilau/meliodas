export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Metode tidak diizinkan' });
  }

  const { username, password } = req.body;

  const users = [
    { username: "jhonilau", password: "tester123" },
    { username: "charlessusanto", password: "aleng123" },
    { username: "wisnudp", password: "pucukkangkung123" },
    { username: "selanabila", password: "fendi188" },
    { username: "selvieliza", password: "kerangwin" },
    { username: "harisetiadi", password: "bola123" },
    { username: "sitsun", password: "banteng69" },
    { username: "wisnuwd", password: "pucukubi123" },
    { username: "wisnulc", password: "bodat123" },
    { username: "singgoy", password: "polo123" },
    { username: "adminkey", password: "admin123" }
  ];

  const found = users.find(u => u.username === username && u.password === password);
  if (found) {
    return res.status(200).json({ message: "Login berhasil" });
  } else {
    return res.status(401).json({ message: "Username atau password salah." });
  }
}
