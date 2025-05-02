import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from '../../context/AuthContext';

// Тестовый компонент для доступа к функциям AuthContext
const TestComponent = () => {
  const { user, isAuthenticated, login, register, bookLesson } = useAuth();
  
  return (
    <div>
      <div data-testid="auth-status">
        {isAuthenticated ? 'Авторизован' : 'Не авторизован'}
      </div>
      {user && <div data-testid="user-name">{user.name}</div>}
      
      <button onClick={() => login('test@example.com', 'password')}>
        Логин
      </button>
      
      <button onClick={() => register('Test User', 'new@example.com', 'password', 'student')}>
        Регистрация
      </button>
      
      <button onClick={() => bookLesson('tutor1', '2023-01-01', '10:00', 'Math')}>
        Бронировать урок
      </button>
    </div>
  );
};

// Переопределяем моки для API
const mockUpdateUser = jest.fn().mockResolvedValue({});
const mockFetchUsers = jest.fn().mockResolvedValue([
  {
    id: 'user1',
    name: 'Test User',
    email: 'test@example.com',
    password: 'password',
    role: 'tutor',
    bookings: []
  }
]);

jest.mock('../../api/users', () => ({
  fetchUsers: () => mockFetchUsers(),
  updateUser: (id, data) => mockUpdateUser(id, data),
  createUser: jest.fn().mockResolvedValue({}),
}));

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('должен предоставлять статус авторизации', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </BrowserRouter>
    );
    
    expect(screen.getByTestId('auth-status').textContent).toBe('Не авторизован');
  });

  it('должен выполнять вход пользователя', async () => {
    // Подготавливаем мок для успешного входа
    mockFetchUsers.mockResolvedValue([{
      id: 'user1',
      name: 'Test User',
      email: 'test@example.com',
      password: 'password',
      role: 'tutor',
      bookings: []
    }]);
    
    render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </BrowserRouter>
    );
    
    fireEvent.click(screen.getByText('Логин'));
    
    // Ожидаем обновления состояния после входа
    await waitFor(() => {
      expect(mockFetchUsers).toHaveBeenCalled();
      expect(screen.getByTestId('auth-status').textContent).toBe('Авторизован');
    });
  });

  it('должен разрешать бронирование для tutorов и студентов', async () => {
    // Подготавливаем localStorage с авторизованным пользователем
    const mockUser = {
      id: 'user1',
      name: 'Tutor User',
      email: 'tutor@example.com',
      role: 'tutor',
      bookings: []
    };
    
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </BrowserRouter>
    );
    
    // Убеждаемся, что пользователь авторизован перед нажатием
    await waitFor(() => {
      expect(screen.getByTestId('auth-status').textContent).toBe('Авторизован');
    });
    
    // Нажимаем кнопку бронирования
    fireEvent.click(screen.getByText('Бронировать урок'));
    
    // Ожидаем вызов updateUser с новой бронью
    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalled();
      
      // Проверяем, что в вызове updateUser передаётся обновлённый пользователь с bookings
      const updateCall = mockUpdateUser.mock.calls[0];
      expect(updateCall[0]).toBe('user1'); // ID пользователя
      expect(updateCall[1].bookings.length).toBe(1); // Один booking добавлен
      expect(updateCall[1].bookings[0].tutorId).toBe('tutor1'); // tutorId в booking
    });
  });
});
