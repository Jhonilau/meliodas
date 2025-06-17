export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Metode tidak diizinkan' });
  }

  const { username, password } = req.body;

  // ✅ Data akun disimpan langsung di sini
  const users = [
    { username: "jhonilau", password: "tester123" },
    { username: "charlessusanto", password: "aleng123" }
  ];

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    return res.status(200).json({ message: `Selamat datang, ${username}!` });
  } else {
    return res.status(401).json({ message: 'Login gagal. Username atau password salah.' });
  }
}
