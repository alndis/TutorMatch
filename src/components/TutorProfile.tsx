import React, { useState } from 'react';

const TutorProfile: React.FC = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const handleContact = () => {
    setShowContactForm(true);
  };

  const handleBookSession = () => {
    setShowBookingForm(true);
  };

  return (
    <div>
      {/* ... existing JSX ... */}
      
      <button
        onClick={handleBookSession}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors duration-300"
      >
        Забронировать занятие
      </button>
      
      <button
        onClick={handleContact}
        className="w-full py-3 px-4 border border-blue-600 text-blue-600 rounded-md font-medium hover:bg-blue-50 transition-colors duration-300"
      >
        Связаться с репетитором
      </button>

      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Связаться с репетитором</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Сообщение</label>
                <textarea
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  rows={4}
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Отправить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showBookingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Забронировать занятие</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Дата</label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Время</label>
                <input
                  type="time"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowBookingForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Подтвердить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorProfile;