const API_URL = 'http://localhost:3001';

export async function fetchBookings() {
  const res = await fetch(`${API_URL}/bookings`);
  return res.json();
}

export async function fetchBookingsByUserId(userId: string) {
  const res = await fetch(`${API_URL}/bookings?userId=${userId}`);
  return res.json();
}

export async function fetchBookingsByTutorId(tutorId: string) {
  const res = await fetch(`${API_URL}/bookings?tutorId=${tutorId}`);
  return res.json();
}

export async function createBooking(booking: any) {
  const res = await fetch(`${API_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(booking)
  });
  return res.json();
}

export async function updateBooking(id: string, data: any) {
  const res = await fetch(`${API_URL}/bookings/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deleteBooking(id: string) {
  await fetch(`${API_URL}/bookings/${id}`, { method: 'DELETE' });
}
