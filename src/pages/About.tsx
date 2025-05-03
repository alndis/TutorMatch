import React from 'react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">О нашей платформе</h1>
          <p className="mt-4 text-lg text-gray-600">
            TutorMatch соединяет талантливых репетиторов с мотивированными учениками для эффективного и персонализированного обучения.
          </p>
        </div>
        
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Наша миссия</h2>
          <p className="mb-6 text-gray-600">
            Мы стремимся сделать качественное образование доступным для каждого, кто хочет учиться. 
            Наша платформа предоставляет инструменты для эффективного взаимодействия между учителями и учениками, 
            создания индивидуальных планов обучения и достижения академических целей.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Наши ценности</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-600 space-y-2">
            <li>Доступность образования для всех, вне зависимости от географических или финансовых ограничений</li>
            <li>Качество обучения и проверенная экспертиза наших репетиторов</li>
            <li>Индивидуальный подход к каждому ученику</li>
            <li>Инновационные методы обучения и постоянное совершенствование</li>
            <li>Прозрачность во всех аспектах работы платформы</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Наша команда</h2>
          <p className="mb-6 text-gray-600">
            TutorMatch создана командой энтузиастов образования и технологий. Мы объединяем опыт в педагогике, 
            разработке программного обеспечения и дизайне пользовательского опыта, чтобы создать платформу, 
            которая делает процесс обучения более эффективным и приятным.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8">
            <div className="flex flex-col items-center">
              <img src="img/ceo.webp" alt="Генеральный директор" className="w-28 h-28 rounded-full object-cover mb-3 shadow" />
              <div className="font-semibold text-gray-900">М. В. Мишустин</div>
              <div className="text-gray-500 text-sm">Генеральный директор</div>
            </div>
            <div className="flex flex-col items-center">
              <img src="img/cto.jpg" alt="Технический директор" className="w-28 h-28 rounded-full object-cover mb-3 shadow" />
              <div className="font-semibold text-gray-900">C. C. Собянин</div>
              <div className="text-gray-500 text-sm">Технический директор</div>
            </div>
            <div className="flex flex-col items-center">
              <img src="img/coo.jpg" alt="Операционный директор" className="w-28 h-28 rounded-full object-cover mb-3 shadow" />
              <div className="font-semibold text-gray-900">С. В. Лавров</div>
              <div className="text-gray-500 text-sm">Операционный директор</div>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">История компании</h2>
          <p className="mb-6 text-gray-600">
            Основанная в 2025 году, TutorMatch начиналась как небольшой стартап с большими амбициями. 
            Мы выросли благодаря поддержке нашего сообщества учителей и учеников, которые верили в нашу миссию 
            и помогали нам улучшать платформу с каждым днем.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
