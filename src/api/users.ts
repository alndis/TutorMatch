const API_URL = 'http://82.202.158.103:3001';

export async function fetchUsers() {
  const res = await fetch(`${API_URL}/users`);
  return res.json();
}

export async function fetchUserById(id: string) {
  const res = await fetch(`${API_URL}/users/${id}`);
  return res.json();
}

export async function fetchUserByEmail(email: string) {
  const res = await fetch(`${API_URL}/users?email=${encodeURIComponent(email)}`);
  const users = await res.json();
  return users[0] || null;
}

export async function createUser(user: any) {
  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
  return res.json();
}

export async function updateUser(id: string, data: any) {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deleteUser(id: string) {
  await fetch(`${API_URL}/users/${id}`, { method: 'DELETE' });
}
