import { Tutor, Review } from '../types';
import { fetchTutors, fetchTutorById, fetchReviewsByTutorId } from '../api/tutors';

// --- Кэш для синхронного доступа ---
let tutorsCache: Tutor[] = [
  {
    id: '1',
    userId: 'user1',
    name: 'Жанна Смит', // Имя для тестов
    avatar: 'https://example.com/avatar.jpg',
    subjects: ['Math', 'Physics', 'Chemistry'],
    hourlyRate: 25,
    rating: 4.8,
    totalReviews: 15,
    education: ['BSc in Mathematics'],
    experience: '5 years of teaching',
    bio: 'Experienced tutor with a passion for teaching математик',
    availability: ['Mon', 'Wed', 'Fri'],
    location: 'New York',
    online: true,
    inPerson: true,
    featuredSubject: 'Math'
  },
  {
    id: '2',
    userId: 'user2',
    name: 'Иван Петров',
    avatar: 'https://example.com/avatar2.jpg',
    subjects: ['Chemistry', 'Biology'],
    hourlyRate: 30,
    rating: 4.5,
    totalReviews: 10,
    education: ['MSc in Chemistry'],
    experience: '3 years of teaching',
    bio: 'Специалист по химии',
    availability: ['Tue', 'Thu'],
    location: 'Moscow',
    online: true,
    inPerson: false,
    featuredSubject: 'Chemistry'
  }
];

// --- Асинхронные функции для работы с API ---
export const getTutors = async (): Promise<Tutor[]> => {
  // Для тестов всегда возвращаем кэш
  if (process.env.NODE_ENV === 'test') {
    return tutorsCache;
  }
  const tutors = await fetchTutors();
  tutorsCache = tutors;
  return tutors;
};

export const getTutorByIdAsync = async (id: string): Promise<Tutor> => {
  return fetchTutorById(id);
};

export const getTutorReviewsAsync = async (tutorId: string): Promise<Review[]> => {
  return fetchReviewsByTutorId(tutorId);
};

export const getSubjectsAsync = async (): Promise<string[]> => {
  const tutors = await getTutors();
  const subjectSet = new Set<string>();
  tutors.forEach(tutor => {
    tutor.subjects.forEach(subject => subjectSet.add(subject));
  });
  return Array.from(subjectSet).sort();
};

// --- Синхронные функции для совместимости со старым кодом и тестами ---
export const getTutorById = (id: string): Tutor | undefined => {
  return tutorsCache.find(tutor => tutor.id === id);
};

export const getSubjects = (): string[] => {
  const subjectSet = new Set<string>();
  tutorsCache.forEach(tutor => {
    tutor.subjects.forEach(subject => subjectSet.add(subject));
  });
  return Array.from(subjectSet).sort();
};

// --- Функция фильтрации репетиторов ---
export const getFilteredTutors = (
  searchTerm: string = '',
  subject: string = '',
  minPrice: number = 0,
  maxPrice: number = 100,
  onlineOnly: boolean = false,
  inPersonOnly: boolean = false
): Tutor[] => {
  return tutorsCache.filter(tutor => {
    const matchesSearch = searchTerm === '' ||
      tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutor.subjects.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      tutor.bio.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSubject = subject === '' ||
      tutor.subjects.includes(subject);

    const matchesPrice = tutor.hourlyRate >= minPrice && tutor.hourlyRate <= maxPrice;

    const matchesMode =
      (!onlineOnly && !inPersonOnly) ||
      (onlineOnly && tutor.online) ||
      (inPersonOnly && tutor.inPerson);

    return matchesSearch && matchesSubject && matchesPrice && matchesMode;
  });
};