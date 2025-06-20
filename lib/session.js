if (!globalThis.activeSessions) {
  globalThis.activeSessions = {};
}

export function setSession(username, token) {
  globalThis.activeSessions[username] = token;
}

export function getSession(username) {
  return globalThis.activeSessions[username];
}

export function clearSession(username) {
  delete globalThis.activeSessions[username];
}
