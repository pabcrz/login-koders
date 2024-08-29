const API_URL = "https://reto-backend.onrender.com";

export function connection() {
  return fetch(`${API_URL}/users`)
    .then((res) => res.json())
    .then((data) => data);
}

export function register(user) {
  return fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: user.name,
      profilePic: user.profilePic,
      email: user.email,
      password: user.password,
    }),
  });
}

export function login(user) {
  return fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password,
    }),
  });
}
