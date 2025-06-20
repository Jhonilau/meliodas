import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_URL.split(':')[0],
  port: parseInt(process.env.REDIS_URL.split(':')[1]),
  password: process.env.REDIS_TOKEN,
  tls: { rejectUnauthorized: false }
});

export default redis;
