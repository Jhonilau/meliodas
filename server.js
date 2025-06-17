require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());

const users = [
  { username: "jhonilau", password: "tester123", email: "jhonilau21@gmail.com" }
];

let otpMap = {};

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) return res.json({ success: false, message: "Username/Password salah!" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpMap[username] = otp;

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: user.email,
    subject: 'Kode OTP Login Anda',
    text: `Kode OTP Anda: ${otp}`
  });

  res.json({ success: true, message: "OTP dikirim ke email pengguna." });
});

app.post('/verify-otp', (req, res) => {
  const { username, otp } = req.body;
  if (otpMap[username] === otp) {
    delete otpMap[username];
    res.json({ success: true });
  } else {
    res.json({ success: false, message: "OTP salah!" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server aktif di http://localhost:${PORT}`));
