import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Политика конфиденциальности</h1>
      
      <div className="prose max-w-none">
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Сбор информации</h2>
            <p className="text-gray-600">
              Мы собираем только необходимую информацию для работы сервиса. 
              Это включает ваше имя, email и информацию о предпочтениях в обучении.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. Использование данных</h2>
            <p className="text-gray-600">
              Ваши данные используются для предоставления услуг и улучшения качества сервиса. 
              Мы не передаем их третьим лицам без вашего согласия.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Защита информации</h2>
            <p className="text-gray-600">
              Мы применяем современные методы защиты для обеспечения безопасности 
              ваших персональных данных.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;