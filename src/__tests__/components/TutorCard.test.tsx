import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TutorCard from '../../components/TutorCard';
import { AuthProvider } from '../../context/AuthContext';

// Мок для useAuth
jest.mock('../../context/AuthContext', () => {
  const originalModule = jest.requireActual('../../context/AuthContext');
  return {
    ...originalModule,
    useAuth: () => ({
      isAuthenticated: true,
      isFavorite: jest.fn().mockReturnValue(false),
      toggleFavorite: jest.fn().mockReturnValue(true)
    })
  };
});

describe('TutorCard', () => {
  const mockTutor = {
    id: '1',
    userId: 'user1',
    name: 'John Doe',
    avatar: 'http://example.com/avatar.jpg',
    subjects: ['Math', 'Physics'],
    hourlyRate: 25,
    rating: 4.8,
    totalReviews: 10,
    education: ['BSc in Mathematics'],
    experience: '5 years of teaching',
    bio: 'Experienced tutor with a passion for teaching',
    availability: ['Mon', 'Wed', 'Fri'],
    location: 'New York',
    online: true,
    inPerson: true,
    featuredSubject: 'Math'
  };
  
  const mockOnBookLesson = jest.fn();
  const mockOnContactTutor = jest.fn();
  
  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          {component}
        </AuthProvider>
      </BrowserRouter>
    );
  };
  
  test('отображает информацию о репетиторе', () => {
    renderWithProviders(
      <TutorCard 
        tutor={mockTutor}
        onBookLesson={mockOnBookLesson}
        onContactTutor={mockOnContactTutor}
      />
    );
    
    expect(screen.getByText(mockTutor.name)).toBeInTheDocument();
    expect(screen.getByText(`$${mockTutor.hourlyRate}/час`)).toBeInTheDocument();
    expect(screen.getByText(mockTutor.subjects[0])).toBeInTheDocument();
    expect(screen.getByText(mockTutor.location)).toBeInTheDocument();
  });
  
  test('вызывает onBookLesson при клике на кнопку бронирования', () => {
    renderWithProviders(
      <TutorCard 
        tutor={mockTutor}
        onBookLesson={mockOnBookLesson}
        onContactTutor={mockOnContactTutor}
      />
    );
    
    fireEvent.click(screen.getByText(/Забронировать/i));
    expect(mockOnBookLesson).toHaveBeenCalled();
  });
  
  test('вызывает onContactTutor при клике на кнопку связи', () => {
    renderWithProviders(
      <TutorCard 
        tutor={mockTutor}
        onBookLesson={mockOnBookLesson}
        onContactTutor={mockOnContactTutor}
      />
    );
    
    fireEvent.click(screen.getByText(/Связаться/i));
    expect(mockOnContactTutor).toHaveBeenCalled();
  });
});
