export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // добавлено поле
  role: 'student' | 'tutor';
  avatar?: string;
  bookings?: Booking[];
  favorites?: string[]; // массив идентификаторов избранных репетиторов
  subjects?: TutorSubject[]; // теперь массив объектов, а не строк
}

export interface Booking {
  id: string;
  tutorId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'canceled';
  subject?: string;
}

export interface Tutor {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  subjects: string[];
  hourlyRate: number;
  rating: number;
  totalReviews: number;
  education: string[];
  experience: string;
  bio: string;
  availability: string[];
  location: string;
  online: boolean;
  inPerson: boolean;
  featuredSubject?: string;
}

export interface TutorSubject {
  name: string;
  description: string;
  level: string;
  price: number;
}

export interface Review {
  id: string;
  tutorId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: 'student' | 'tutor') => Promise<void>;
  logout: () => void;
  bookLesson: (tutorId: string, date: string, time: string, subject?: string) => Booking | undefined;
  toggleFavorite: (tutorId: string) => boolean;
  isFavorite: (tutorId: string) => boolean;
  getFavoriteTutors: () => Tutor[];
}