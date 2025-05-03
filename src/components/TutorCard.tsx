import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Video, Users, Heart } from 'lucide-react';
import { Tutor } from '../types';
import { useAuth } from '../context/AuthContext';

interface TutorCardProps {
  tutor: Tutor;
  onBookLesson: () => void; // Добавляем пропс
  onContactTutor: () => void;
}

const TutorCard: React.FC<TutorCardProps> = ({ tutor, onBookLesson, onContactTutor }) => {
  const { isFavorite, toggleFavorite, isAuthenticated } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(isFavorite(tutor.id));

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAuthenticated) {
      const newState = toggleFavorite(tutor.id);
      setIsBookmarked(newState);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:translate-y-[-4px]">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
          <img 
            src={tutor.avatar} 
            alt={tutor.name} 
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-100"
          />
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start">
              <h3 className="text-xl font-semibold text-gray-800">{tutor.name}</h3>
              <button 
                onClick={handleToggleFavorite}
                className={`ml-2 p-1 rounded-full ${isBookmarked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'} transition-colors duration-300`}
                aria-label={isBookmarked ? "Удалить из избранного" : "Добавить в избранное"}
              >
                <Heart className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>
            </div>
            <div className="flex items-center justify-center sm:justify-start mt-1">
              <Star className="h-5 w-5 text-amber-500 mr-1" />
              <span className="text-gray-700 font-medium">{tutor.rating.toFixed(1)}</span>
              <span className="text-gray-500 ml-1">({tutor.totalReviews} reviews)</span>
            </div>
            {tutor.featuredSubject && (
              <span className="inline-block mt-1 text-sm text-blue-600">
                Специализация: {tutor.featuredSubject}
              </span>
            )}
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex flex-wrap gap-2">
            {tutor.subjects.slice(0, 3).map((subject: string, index: number) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {subject}
              </span>
            ))}
            {tutor.subjects.length > 3 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                +{tutor.subjects.length - 3} ещё
              </span>
            )}
          </div>
          
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{tutor.location}</span>
          </div>
          
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
            {tutor.online && (
              <div className="flex items-center">
                <Video className="h-4 w-4 text-teal-500 mr-1" />
                <span>Онлайн занятия</span>
              </div>
            )}
            {tutor.inPerson && (
              <div className="flex items-center">
                <Users className="h-4 w-4 text-indigo-500 mr-1" />
                <span>Очные занятия</span>
              </div>
            )}
          </div>
          
          <div className="text-lg font-semibold text-gray-900">
            ${tutor.hourlyRate}/час
          </div>
        </div>
        
        <div className={
          // flex-col на мобильных, flex-row на sm+
          "flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-2"
        }>
          <Link 
            to={`/tutors/${tutor.id}`} 
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm font-medium mb-2 sm:mb-0"
          >
            Посмотреть профиль
          </Link>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button 
              className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-sm font-medium"
              onClick={onBookLesson}
            >
              Забронировать
            </button>
            <button 
              className="w-full sm:w-auto px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 text-sm font-medium"
              onClick={onContactTutor}
            >
              Связаться
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;