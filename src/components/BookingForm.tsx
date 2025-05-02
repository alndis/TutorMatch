import React, { useState } from 'react';
import { Tutor } from '../types';
import { useAuth } from '../context/AuthContext';

interface BookingFormProps {
  tutor: Tutor;
  onSubmit: () => void;
  onCancel: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ tutor, onSubmit, onCancel }) => {
  const { bookLesson } = useAuth();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [subject, setSubject] = useState(tutor.subjects[0] || '');
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !time) {
      setError('Пожалуйста, выберите дату и время занятия.');
      return;
    }
    
    try {
      // Вызываем метод бронирования из контекста авторизации
      const booking = bookLesson(tutor.id, date, time, subject);
      
      if (booking) {
        // Успешно забронировано
        onSubmit();
      }
    } catch (err) {
      setError('Произошла ошибка при бронировании. Пожалуйста, попробуйте снова.');
    }
  };

  // Генерируем доступные временные слоты
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 20; hour++) {
      slots.push(`${hour}:00`);
      if (hour < 20) slots.push(`${hour}:30`);
    }
    return slots;
  };
  
  const timeSlots = generateTimeSlots();

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Забронировать занятие с {tutor.name}</h2>
      
      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Предмет
          </label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border rounded-md p-2"
          >
            {tutor.subjects.map(subj => (
              <option key={subj} value={subj}>{subj}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Дата занятия
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]} // Нельзя выбрать прошедшую дату
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Время
          </label>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border rounded-md p-2"
            required
          >
            <option value="">Выберите время...</option>
            {timeSlots.map(slot => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Отмена
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Забронировать
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
