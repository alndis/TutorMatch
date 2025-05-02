import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import TutorsList from '../../pages/TutorsList';

// Создаем мок-модули для компонентов, используемых в TutorsList
jest.mock('../../components/TutorCard', () => {
  return {
    __esModule: true,
    default: ({ tutor, onBookLesson, onContactTutor }) => (
      <div data-testid="tutor-card">
        <div>{tutor.name}</div>
        <button onClick={onBookLesson}>Забронировать</button>
        <button onClick={onContactTutor}>Связаться</button>
      </div>
    )
  };
});

jest.mock('../../components/TutorFilter', () => {
  return {
    __esModule: true,
    default: ({ onFilterChange }) => (
      <div data-testid="tutor-filter">
        <input 
          type="text" 
          data-testid="search-input"
          onChange={(e) => onFilterChange({
            searchTerm: e.target.value,
            subject: '',
            minPrice: 0,
            maxPrice: 100,
            onlineOnly: false,
            inPersonOnly: false
          })}
        />
      </div>
    )
  };
});

jest.mock('../../components/Modal', () => {
  return {
    __esModule: true,
    default: ({ children, onClose }) => (
      <div data-testid="modal">
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    )
  };
});

jest.mock('../../components/BookingForm', () => {
  return {
    __esModule: true,
    default: ({ tutor, onSubmit, onCancel }) => (
      <div data-testid="booking-form">
        <div>Booking form for {tutor.name}</div>
        <button onClick={onSubmit}>Submit</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    )
  };
});

jest.mock('../../components/ContactForm', () => {
  return {
    __esModule: true,
    default: ({ tutor, onSubmit, onCancel }) => (
      <div data-testid="contact-form">
        <div>Contact form for {tutor.name}</div>
        <button onClick={() => onSubmit('Test message')}>Submit</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    )
  };
});

// Мокаем данные для тестирования
jest.mock('../../data/tutors', () => ({
  getTutors: jest.fn().mockResolvedValue([
    {
      id: '1',
      name: 'John Doe',
      subjects: ['Math'],
      hourlyRate: 25,
      rating: 4.5,
      online: true,
      inPerson: true,
      avatar: 'avatar.jpg',
      totalReviews: 10,
      bio: 'Math teacher'
    }
  ])
}));

describe('TutorsList Page', () => {
  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          {component}
        </AuthProvider>
      </BrowserRouter>
    );
  };

  test('должен отображать список репетиторов и фильтры', async () => {
    renderWithProviders(<TutorsList />);
    
    // Проверяем наличие фильтров
    expect(await screen.findByTestId('tutor-filter')).toBeInTheDocument();
    
    // Проверяем наличие карточек репетиторов (после загрузки данных)
    const tutorCard = await screen.findByTestId('tutor-card');
    expect(tutorCard).toBeInTheDocument();
  });

  test('должен открывать модальное окно при клике на "Забронировать"', async () => {
    renderWithProviders(<TutorsList />);
    
    // Ждем загрузки данных и отображения карточки
    const bookButton = await screen.findByText('Забронировать');
    
    // Кликаем на кнопку "Забронировать"
    fireEvent.click(bookButton);
    
    // Проверяем открытие модального окна с формой бронирования
    expect(await screen.findByTestId('modal')).toBeInTheDocument();
    expect(await screen.findByTestId('booking-form')).toBeInTheDocument();
  });
});
