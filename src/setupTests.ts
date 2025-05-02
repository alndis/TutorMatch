import '@testing-library/jest-dom';

// Полифилл для fetch API в Node.js среде
if (typeof fetch === 'undefined') {
  global.fetch = require('node-fetch');
}

// Mock React Router DOM
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => ({
    pathname: '/',
    search: '',
    hash: '',
    state: null,
    key: ''
  })
}));

// Мокаем все асинхронные функции из data/tutors.ts
jest.mock('./data/tutors', () => ({
  getTutors: jest.fn().mockResolvedValue([
    {
      id: '1',
      userId: 'user1',
      name: 'John Doe',
      avatar: 'https://example.com/avatar.jpg',
      subjects: ['Math', 'Physics'],
      hourlyRate: 25,
      rating: 4.8,
      totalReviews: 15,
      education: ['BSc in Mathematics'],
      experience: '5 years of teaching',
      bio: 'Experienced tutor with a passion for teaching',
      availability: ['Mon', 'Wed', 'Fri'],
      location: 'New York',
      online: true,
      inPerson: true,
      featuredSubject: 'Math'
    }
  ]),
  getTutorById: jest.fn().mockImplementation((id) => ({
    id,
    userId: 'user1',
    name: 'John Doe',
    avatar: 'https://example.com/avatar.jpg',
    subjects: ['Math', 'Physics'],
    hourlyRate: 25,
    rating: 4.8,
    totalReviews: 15,
    education: ['BSc in Mathematics'],
    experience: '5 years of teaching',
    bio: 'Experienced tutor with a passion for teaching',
    availability: ['Mon', 'Wed', 'Fri'],
    location: 'New York',
    online: true,
    inPerson: true,
    featuredSubject: 'Math'
  })),
  getTutorByIdAsync: jest.fn().mockResolvedValue({
    id: '1',
    userId: 'user1',
    name: 'John Doe',
    avatar: 'https://example.com/avatar.jpg',
    subjects: ['Math', 'Physics'],
    hourlyRate: 25,
    rating: 4.8,
    totalReviews: 15,
    education: ['BSc in Mathematics'],
    experience: '5 years of teaching',
    bio: 'Experienced tutor with a passion for teaching',
    availability: ['Mon', 'Wed', 'Fri'],
    location: 'New York',
    online: true,
    inPerson: true,
    featuredSubject: 'Math'
  }),
  getTutorReviewsAsync: jest.fn().mockResolvedValue([{
    id: 'review1',
    tutorId: '1',
    userId: 'user2',
    userName: 'Jane Smith',
    rating: 5,
    comment: 'Excellent tutor!',
    date: '2023-05-10'
  }]),
  getSubjects: jest.fn().mockReturnValue(['Math', 'Physics', 'Chemistry']),
  getSubjectsAsync: jest.fn().mockResolvedValue(['Math', 'Physics', 'Chemistry'])
}));

// Мокаем API функции для работы с пользователями
jest.mock('./api/users', () => ({
  fetchUsers: jest.fn().mockResolvedValue([
    {
      id: 'user1',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
      role: 'tutor',
      subjects: ['Math', 'Physics'],
      bookings: [],
      favorites: []
    },
    {
      id: 'user2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'password',
      role: 'student',
      bookings: [],
      favorites: []
    }
  ]),
  createUser: jest.fn().mockResolvedValue({}),
  updateUser: jest.fn().mockResolvedValue({}),
}));

// Мокаем API функции для работы с репетиторами
jest.mock('./api/tutors', () => ({
  fetchTutors: jest.fn().mockResolvedValue([
    {
      id: '1',
      userId: 'user1',
      name: 'John Doe',
      avatar: 'https://example.com/avatar.jpg',
      subjects: ['Math', 'Physics'],
      hourlyRate: 25,
      rating: 4.8,
      totalReviews: 15,
      education: ['BSc in Mathematics'],
      experience: '5 years of teaching',
      bio: 'Experienced tutor with a passion for teaching',
      availability: ['Mon', 'Wed', 'Fri'],
      location: 'New York',
      online: true,
      inPerson: true,
      featuredSubject: 'Math'
    }
  ]),
  fetchTutorById: jest.fn().mockResolvedValue({
    id: '1',
    userId: 'user1',
    name: 'John Doe',
    avatar: 'https://example.com/avatar.jpg',
    subjects: ['Math', 'Physics'],
    hourlyRate: 25,
    rating: 4.8,
    totalReviews: 15,
    education: ['BSc in Mathematics'],
    experience: '5 years of teaching',
    bio: 'Experienced tutor with a passion for teaching',
    availability: ['Mon', 'Wed', 'Fri'],
    location: 'New York',
    online: true,
    inPerson: true,
    featuredSubject: 'Math'
  }),
  fetchReviewsByTutorId: jest.fn().mockResolvedValue([{
    id: 'review1',
    tutorId: '1',
    userId: 'user2',
    userName: 'Jane Smith',
    rating: 5,
    comment: 'Excellent tutor!',
    date: '2023-05-10'
  }])
}));

// Отключаем предупреждения React Router для тестов
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

console.error = (...args) => {
  if (
    /Warning:.*Consider adding an error boundary/.test(args[0]) ||
    /React Router Future Flag Warning/.test(args[0]) ||
    /The above error occurred in the/.test(args[0])
  ) {
    return;
  }
  originalConsoleError(...args);
};

console.warn = (...args) => {
  if (/React Router Future Flag Warning/.test(args[0])) {
    return;
  }
  originalConsoleWarn(...args);
};
