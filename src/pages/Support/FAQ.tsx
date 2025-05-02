import React from 'react';

const FAQ: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Часто задаваемые вопросы</h1>
      
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Как найти репетитора?</h2>
          <p className="text-gray-600">
            Используйте поиск на главной странице, укажите предмет и другие параметры. 
            Вы можете просмотреть профили репетиторов и выбрать подходящего.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Как оплатить занятия?</h2>
          <p className="text-gray-600">
            После выбора репетитора вы можете забронировать занятие и произвести оплату 
            через безопасную платежную систему.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Могу ли я отменить занятие?</h2>
          <p className="text-gray-600">
            Да, вы можете отменить занятие за 24 часа до его начала без штрафа.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;