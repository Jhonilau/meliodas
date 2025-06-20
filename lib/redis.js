const REDIS_URL = process.env.REDIS_URL;
const REDIS_TOKEN = process.env.REDIS_TOKEN;

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
  const data = await res.json();
  return data.result;
}

export async function deleteRedis(key) {
  return await fetch(`${REDIS_URL}/del/${key}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
    },
  });
}
