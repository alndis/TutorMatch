const API_URL = 'http://82.202.158.103:3001';

export async function fetchReviews() {
  const res = await fetch(`${API_URL}/reviews`);
  return res.json();
}

export async function fetchReviewsByTutorId(tutorId: string) {
  const res = await fetch(`${API_URL}/reviews?tutorId=${tutorId}`);
  return res.json();
}

export async function createReview(review: any) {
  const res = await fetch(`${API_URL}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review)
  });
  return res.json();
}

export async function deleteReview(id: string) {
  await fetch(`${API_URL}/reviews/${id}`, { method: 'DELETE' });
}
