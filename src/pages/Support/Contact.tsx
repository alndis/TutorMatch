import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Свяжитесь с нами</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6">Контактная информация</h2>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-blue-500 mr-3" />
              <span>+7 (999) 123-45-67</span>
            </div>
            
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-blue-500 mr-3" />
              <span>support@tutormatch.ru</span>
            </div>
            
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-blue-500 mr-3" />
              <span>Москва, ул. Примерная, д. 1</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6">Напишите нам</h2>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ваше имя
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Сообщение
              </label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Отправить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;