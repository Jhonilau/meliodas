import Redis from 'ioredis';

const R = new Redis({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_TOKEN,
  tls: { rejectUnauthorized: false }
});

export default R;
