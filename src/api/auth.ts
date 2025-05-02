const API_URL = 'http://82.202.156.91:3001';

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/users?email=${email}`);
  const users = await res.json();
  if (users.length > 0) {
    return users[0];
  }
  throw new Error('Invalid email or password');
}

export async function register(name: string, email: string, password: string, role: string) {
  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, role, favorites: [], bookings: [] })
  });
  return res.json();
}
