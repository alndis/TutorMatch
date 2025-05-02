import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User, AuthContextType, Booking, Tutor } from '../types';
import { getTutorById } from '../data/tutors';
import { createUser, fetchUsers, updateUser } from '../api/users';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Новый login с загрузкой актуальных данных пользователя
  const login = async (email: string, password: string) => {
    const users = await fetchUsers();
    const foundUser = users.find((u: any) => u.email === email);
    if (foundUser && foundUser.password === password) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
    } else {
      throw new Error('Неверный email или пароль');
    }
  };

  // Новый register с поддержкой subjects для tutor-ов
  const register = async (
    name: string,
    email: string,
    password: string,
    role: 'student' | 'tutor',
    subjects: string[] = []
  ) => {
    const users = await fetchUsers();
    if (users.some((u: any) => u.email === email)) {
      throw new Error('Пользователь с таким email уже существует');
    }
    if (users.some((u: any) => u.name === name)) {
      throw new Error('Пользователь с таким именем уже существует');
    }
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      password,
      role,
      bookings: [],
      favorites: [],
      avatar: '',
      ...(role === 'tutor' ? { subjects } : {})
    } as any;
    await createUser(newUser);
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Функция для бронирования занятия с обновлением пользователя в db.json
  const bookLesson = async (tutorId: string, date: string, time: string, subject?: string) => {
    if (!user) return;

    // Разрешаем бронирование для любого пользователя (student или tutor)
    const booking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      tutorId,
      date,
      time,
      status: 'pending',
      subject
    };

    const updatedUser = {
      ...user,
      bookings: [...(user.bookings || []), booking]
    };

    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    await updateUser(user.id, updatedUser); // сохраняем в db.json

    return booking;
  };

  // Функция для добавления/удаления репетитора из избранного с обновлением пользователя в db.json
  const toggleFavorite = async (tutorId: string) => {
    if (!user) return false;

    let newFavorites: string[];
    const isFavorite = user.favorites?.includes(tutorId);

    if (isFavorite) {
      newFavorites = (user.favorites || []).filter(id => id !== tutorId);
    } else {
      newFavorites = [...(user.favorites || []), tutorId];
    }

    const updatedUser = {
      ...user,
      favorites: newFavorites
    };

    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    await updateUser(user.id, updatedUser); // сохраняем в db.json

    return !isFavorite;
  };

  const isFavorite = (tutorId: string) => {
    return user?.favorites?.includes(tutorId) || false;
  };

  const getFavoriteTutors = () => {
    if (!user?.favorites?.length) return [];
    return user.favorites
      .map(id => getTutorById(id))
      .filter((tutor): tutor is Tutor => !!tutor);
  };

  // --- Добавьте методы для работы с предметами tutor-а ---
  const updateTutorSubjects = async (subjects: string[]) => {
    if (!user || user.role !== 'tutor') return;
    const updatedUser = { ...user, subjects };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    await updateUser(user.id, updatedUser);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      // При старте берем актуальные данные пользователя из API
      const parsed = JSON.parse(storedUser);
      fetchUsers().then(users => {
        const freshUser = users.find((u: any) => u.id === parsed.id);
        if (freshUser) {
          setUser(freshUser);
          localStorage.setItem('user', JSON.stringify(freshUser));
        }
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      bookLesson,
      toggleFavorite,
      isFavorite,
      getFavoriteTutors,
      updateTutorSubjects // экспортируем для использования в Dashboard
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};