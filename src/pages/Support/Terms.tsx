import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Условия использования</h1>
      
      <div className="prose max-w-none">
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Общие положения</h2>
            <p className="text-gray-600">
              Используя наш сервис, вы соглашаетесь с данными условиями использования. 
              Пожалуйста, внимательно прочитайте их.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. Регистрация</h2>
            <p className="text-gray-600">
              Для использования сервиса необходимо создать учетную запись. 
              Вы несете ответственность за сохранность своих учетных данных.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Правила использования</h2>
            <p className="text-gray-600">
              При использовании сервиса запрещено нарушать законодательство РФ 
              и права других пользователей.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;