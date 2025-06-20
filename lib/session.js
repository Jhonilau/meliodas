const REDIS_URL = process.env.REDIS_URL;
const REDIS_TOKEN = process.env.REDIS_TOKEN;

export async function setSession(username, token) {
  await fetch(`${REDIS_URL}/set/session:${username}/${token}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
    },
  });
}

export async function getSession(username) {
  const res = await fetch(`${REDIS_URL}/get/session:${username}`, {
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
    },
  });
  const data = await res.json();
  return data.result;
}

export async function clearSession(username) {
  await fetch(`${REDIS_URL}/del/session:${username}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
    },
  });
}
