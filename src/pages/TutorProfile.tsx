import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Video, Users, Clock, Calendar, Send, ChevronLeft, Heart } from 'lucide-react';
import { getTutorByIdAsync, getTutorReviewsAsync } from '../data/tutors';
import { Tutor, Review } from '../types';
import ReviewCard from '../components/ReviewCard';
import Modal from '../components/Modal';
import BookingForm from '../components/BookingForm';
import ContactForm from '../components/ContactForm';
import { useAuth } from '../context/AuthContext';

const TutorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isFavorite, toggleFavorite } = useAuth();
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState<'about' | 'reviews'>('about');
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isBookingModalOpen, setBookingModalOpen] = useState(false);
  const [isContactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      getTutorByIdAsync(id).then(tutorData => {
        setTutor(tutorData || null);
      });
      getTutorReviewsAsync(id).then(setReviews);
      setIsBookmarked(isFavorite(id));
    }
  }, [id, isFavorite]);

  if (!tutor) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Репетитор не найден</h2>
        <p className="mt-2 text-gray-600">Репетитор, которого вы ищете, не существует или был удален.</p>
        <Link to="/tutors" className="mt-4 inline-block text-blue-600 hover:underline">
          Вернуться к списку репетиторов
        </Link>
      </div>
    );
  }

  // Calculate average rating
  const averageRating = tutor.rating;

  // Generate full star icons for rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="h-5 w-5 text-amber-500 fill-current" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
            <defs>
              <linearGradient id="half-fill" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" fill="url(#half-fill)" />
          </svg>
        );
      } else {
        stars.push(<Star key={i} className="h-5 w-5 text-gray-300" />);
      }
    }

    return stars;
  };

  const toggleBookmark = () => {
    if (id) {
      const newState = toggleFavorite(id);
      setIsBookmarked(newState);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/tutors" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Назад к списку репетиторов
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - 2/3 width on large screens */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tutor Header */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <img 
                src={tutor.avatar} 
                alt={tutor.name} 
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
              />
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start">
                  <h1 className="text-2xl font-bold text-gray-900 mr-3">{tutor.name}</h1>
                  <button 
                    onClick={toggleBookmark}
                    className={`p-1 rounded-full ${isBookmarked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'} transition-colors duration-300`}
                    aria-label={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
                  >
                    <Heart className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
                  </button>
                </div>
                
                <div className="flex items-center justify-center md:justify-start mt-2">
                  <div className="flex mr-2">
                    {renderStars(averageRating)}
                  </div>
                  <span className="text-gray-600">
                    {averageRating.toFixed(1)} ({tutor.totalReviews} reviews)
                  </span>
                </div>
                
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-center md:justify-start text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{tutor.location}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {tutor.subjects.map((subject, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('about')}
                className={`py-4 px-6 text-center font-medium text-sm border-b-2 ${
                  activeTab === 'about'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                About
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-6 text-center font-medium text-sm border-b-2 ${
                  activeTab === 'reviews'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Reviews ({reviews.length})
              </button>
            </nav>
          </div>
          
          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {activeTab === 'about' && (
              <div className="p-6">
                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Обо мне</h2>
                  <p className="text-gray-700">{tutor.bio}</p>
                </section>
                
                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Образование</h2>
                  <ul className="space-y-3">
                    {tutor.education.map((edu, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4M20 12C20 16.4183 16.4183 20 12 20M20 12C20 7.58172 16.4183 4 12 4" />
                        </svg>
                        <span className="text-gray-700">{edu}</span>
                      </li>
                    ))}
                  </ul>
                </section>
                
                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Опыт</h2>
                  <p className="text-gray-700">{tutor.experience}</p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Стиль преподавания</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="font-medium text-gray-900 mb-2">Доступные форматы</h3>
                      <div className="space-y-2">
                        {tutor.online && (
                          <div className="flex items-center">
                            <Video className="h-5 w-5 text-teal-500 mr-2" />
                            <span className="text-gray-700">Онлайн уроки</span>
                          </div>
                        )}
                        {tutor.inPerson && (
                          <div className="flex items-center">
                            <Users className="h-5 w-5 text-indigo-500 mr-2" />
                            <span className="text-gray-700">Очные занятия</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="font-medium text-gray-900 mb-2">Доступность</h3>
                      <div className="space-y-1">
                        {tutor.availability.map((day, index) => (
                          <div key={index} className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-gray-700">{day}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Отзывы студентов</h2>
                  <div className="flex items-center">
                    <div className="flex mr-2">
                      {renderStars(averageRating)}
                    </div>
                    <span className="text-gray-700 font-medium">{averageRating.toFixed(1)}</span>
                  </div>
                </div>
                
                {reviews.length > 0 ? (
                  <div className="space-y-6">
                    {reviews.map(review => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Пока нет отзывов.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Sidebar - 1/3 width on large screens */}
        <div className="lg:col-span-1 space-y-6">
          {/* Pricing Card */}
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Информация о бронировании</h2>
            
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-600">Почасовая ставка</span>
              <span className="text-2xl font-bold text-gray-900">${tutor.hourlyRate}</span>
            </div>
            
            <div className="py-4 space-y-2">
              <div className="flex items-center text-gray-700">
                <Clock className="h-5 w-5 text-blue-500 mr-2" />
                <span>Занятия по 60 минут</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                <span>Доступен {tutor.availability.length} дней в неделю</span>
              </div>
            </div>
            
            <button
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-4"
              onClick={() => setBookingModalOpen(true)}
            >
              Забронировать занятие
            </button>
            
            <button
              className="w-full py-3 px-4 border border-blue-600 text-blue-600 rounded-md font-medium hover:bg-blue-50 transition-colors duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={() => setContactModalOpen(true)}
            >
              <Send className="h-4 w-4 mr-2" />
              Связаться с {tutor.name.split(' ')[0]}
            </button>
          </div>
        </div>
      </div>
      {isBookingModalOpen && (
        <Modal onClose={() => setBookingModalOpen(false)}>
          <BookingForm
            tutor={tutor}
            onSubmit={() => setBookingModalOpen(false)}
            onCancel={() => setBookingModalOpen(false)}
          />
        </Modal>
      )}
      {isContactModalOpen && (
        <Modal onClose={() => setContactModalOpen(false)}>
          <ContactForm
            tutor={tutor}
            onSubmit={() => setContactModalOpen(false)}
            onCancel={() => setContactModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default TutorProfile;