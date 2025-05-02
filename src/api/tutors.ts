const API_URL = 'http://localhost:3001';

export async function fetchTutors() {
  const res = await fetch(`${API_URL}/tutors`);
  return res.json();
}

export async function fetchTutorById(id: string) {
  const res = await fetch(`${API_URL}/tutors/${id}`);
  return res.json();
}

export async function fetchReviewsByTutorId(tutorId: string) {
  const res = await fetch(`${API_URL}/reviews?tutorId=${tutorId}`);
  return res.json();
}

export async function createTutor(tutor: any) {
  const res = await fetch(`${API_URL}/tutors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tutor)
  });
  return res.json();
}

export async function updateTutor(id: string, data: any) {
  const res = await fetch(`${API_URL}/tutors/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deleteTutor(id: string) {
  await fetch(`${API_URL}/tutors/${id}`, { method: 'DELETE' });
}
