import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TutorCard from '../components/TutorCard';
import TutorFilter from '../components/TutorFilter';
import { getTutors } from '../data/tutors';
import { Tutor } from '../types';
import { BookOpen } from 'lucide-react';
import Modal from '../components/Modal';
import BookingForm from '../components/BookingForm';
import ContactForm from '../components/ContactForm';

const TutorsList: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSubject = queryParams.get('subject') || '';
  
  const [allTutors, setAllTutors] = useState<Tutor[]>([]);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [filters, setFilters] = useState({
    searchTerm: '',
    subject: initialSubject,
    minPrice: 0,
    maxPrice: 100,
    onlineOnly: false,
    inPersonOnly: false
  });
  const [isBookingModalOpen, setBookingModalOpen] = useState(false);
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);

  useEffect(() => {
    // Загружаем всех репетиторов с API при первом рендере
    getTutors().then(data => {
      setAllTutors(data);
      setTutors(data); // по умолчанию показываем всех
    });
  }, []);

  useEffect(() => {
    // Фильтрация по локальному массиву allTutors
    const filteredTutors = allTutors.filter(tutor => {
      const matchesSearch = filters.searchTerm === '' ||
        tutor.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        tutor.subjects.some(subject => subject.toLowerCase().includes(filters.searchTerm.toLowerCase())) ||
        tutor.bio.toLowerCase().includes(filters.searchTerm.toLowerCase());

      const matchesSubject = filters.subject === '' ||
        tutor.subjects.includes(filters.subject);

      const matchesPrice = tutor.hourlyRate >= filters.minPrice && tutor.hourlyRate <= filters.maxPrice;

      const matchesMode =
        (!filters.onlineOnly && !filters.inPersonOnly) ||
        (filters.onlineOnly && tutor.online) ||
        (filters.inPersonOnly && tutor.inPerson);

      return matchesSearch && matchesSubject && matchesPrice && matchesMode;
    });
    setTutors(filteredTutors);
  }, [filters, allTutors]);
  
  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleBookLesson = (tutor: Tutor) => {
    setSelectedTutor(tutor);
    setBookingModalOpen(true);
  };

  const handleContactTutor = (tutor: Tutor) => {
    setSelectedTutor(tutor);
    setContactModalOpen(true);
  };

  const handleBookingSubmit = () => {
    // Логика для сохранения записи
    console.log(`Занятие с ${selectedTutor?.name} забронировано`);
    setBookingModalOpen(false);
  };

  const handleContactSubmit = (message: string) => {
    // Логика для отправки сообщения
    console.log(`Сообщение для ${selectedTutor?.name}: ${message}`);
    setContactModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Найдите идеального репетитора</h1>
        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
          Просмотрите наше сообщество профессиональных репетиторов, чтобы найти подходящего для ваших учебных целей
        </p>
      </div>
      
      <TutorFilter onFilterChange={handleFilterChange} />
      
      {tutors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors.map(tutor => (
            <TutorCard
              key={tutor.id}
              tutor={tutor}
              onBookLesson={() => handleBookLesson(tutor)}
              onContactTutor={() => handleContactTutor(tutor)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <BookOpen className="h-16 w-16 text-blue-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Репетиторы не найдены</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Мы не смогли найти репетиторов, соответствующих вашим критериям. Попробуйте изменить фильтры или поисковый запрос.
          </p>
        </div>
      )}

      {isBookingModalOpen && selectedTutor && (
        <Modal onClose={() => setBookingModalOpen(false)}>
          <BookingForm
            tutor={selectedTutor}
            onSubmit={handleBookingSubmit}
            onCancel={() => setBookingModalOpen(false)}
          />
        </Modal>
      )}

      {isContactModalOpen && selectedTutor && (
        <Modal onClose={() => setContactModalOpen(false)}>
          <ContactForm
            tutor={selectedTutor}
            onSubmit={handleContactSubmit}
            onCancel={() => setContactModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default TutorsList;