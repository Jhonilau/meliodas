const sessions = globalThis.sessions || {};
globalThis.sessions = sessions;

export function setSession(username, token) {
  sessions[username] = token;
}

export function getSession(username) {
  return sessions[username];
}

export function clearSession(username) {
  delete sessions[username];
}
