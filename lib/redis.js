const REDIS_URL = 'https://free-pug-33553.upstash.io';
const REDIS_TOKEN = 'AYMRAAIjcDE0NjQwZWNmZGRmNDY0MjM2OWM3YWIwMDViMDljYWQ4Y3AxMA';

export async function setRedis(key, value) {
  return await fetch(`${REDIS_URL}/set/${key}/${value}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
    },
  });
}

export async function getRedis(key) {
  const res = await fetch(`${REDIS_URL}/get/${key}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
    },
  });
  return res.json();
}
