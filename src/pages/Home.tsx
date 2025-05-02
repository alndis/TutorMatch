import React from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, BarChart } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
                Найдите идеального репетитора для вашего учебного пути
              </h1>
              <p className="text-xl text-blue-100">
                Свяжитесь с экспертами-репетиторами, которые специализируются на нужных вам предметах. Учитесь в своем темпе и достигайте своих образовательных целей.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/tutors"
                  className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md shadow-md hover:bg-gray-100 transition-colors duration-300 text-center"
                >
                  Найти репетитора
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-3 bg-blue-500 text-white font-medium rounded-md shadow-md hover:bg-blue-400 transition-colors duration-300 text-center"
                >
                  Стать репетитором
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="../data/img/hero.webp" 
                alt="Students learning"
                className="rounded-lg shadow-2xl max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Subjects */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Популярные предметы</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Изучите наши самые востребованные предметы с высоко оцененными репетиторами
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredSubjects.map((subject, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                  {subject.icon}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{subject.name}</h3>
                  <p className="text-gray-600 mb-4">{subject.description}</p>
                  <Link
                    to={`/tutors?subject=${subject.name}`}
                    className="text-blue-600 font-medium hover:text-blue-800 flex items-center"
                  >
                    Найти репетиторов
                    <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Как работает TutorMatch</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Наша платформа упрощает поиск квалифицированных репетиторов всего за несколько простых шагов
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Что говорят наши студенты</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Узнайте, что говорят студенты, которые нашли своих идеальных репетиторов на нашей платформе
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-md p-6 relative"
              >
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 inline ${i < testimonial.rating ? 'text-amber-500' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M10 15.934L4.618 18.95l1.016-6.454-4.372-4.263 6.036-.877L10 2.022l2.702 5.334 6.036.877-4.372 4.263 1.016 6.454L10 15.934z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">"{testimonial.comment}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-10 w-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.subject}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Готовы начать обучение?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к тысячам студентов, которые достигают своих образовательных целей с помощью наших экспертов-репетиторов.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/tutors"
              className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md shadow-md hover:bg-gray-100 transition-colors duration-300"
            >
              Найти репетитора
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 bg-blue-500 text-white font-medium rounded-md shadow-md border border-blue-400 hover:bg-blue-400 transition-colors duration-300"
            >
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Данные для популярных предметов
const featuredSubjects = [
  {
    name: 'Математика',
    description: 'От базовой арифметики до высшей математики, наши репетиторы помогут на любом уровне.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  },
  {
    name: 'Наука',
    description: 'Биология, химия, физика и другие предметы от опытных преподавателей.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  },
  {
    name: 'Языки',
    description: 'Изучайте новые языки или совершенствуйте навыки с нашими экспертами-лингвистами.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
    </svg>
  },
  {
    name: 'Музыка',
    description: 'Освойте инструменты, вокал или теорию музыки с нашими опытными учителями.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
    </svg>
  }
];

// Данные для раздела "Как это работает"
const howItWorks = [
  {
    title: 'Найдите репетитора',
    description: 'Просмотрите нашу обширную базу квалифицированных репетиторов, отфильтруйте по предмету, доступности, цене и другим параметрам.',
    icon: <Search className="h-8 w-8" />
  },
  {
    title: 'Забронируйте занятия',
    description: 'Выберите удобное время для занятий, с возможностью как онлайн, так и очного обучения.',
    icon: <BookOpen className="h-8 w-8" />
  },
  {
    title: 'Учитесь и развивайтесь',
    description: 'Получайте персональное обучение, адаптированное под ваш стиль учебы и цели, и отслеживайте свой прогресс.',
    icon: <BarChart className="h-8 w-8" />
  }
];

// Данные для отзывов
const testimonials = [
  {
    name: 'Эмили Джонсон',
    subject: 'Математический анализ',
    rating: 5,
    comment: "Я не понимала матанализ, пока не нашла своего репетитора на TutorMatch. Теперь я уверена в своих знаниях, и мои оценки значительно улучшились!",
    avatar: '../data/img/emily.webp'
  },
  {
    name: 'Майкл Чен',
    subject: 'Испанский язык',
    rating: 5,
    comment: 'Мой репетитор по испанскому — потрясающий! Индивидуальные занятия и разговорная практика помогли мне стать намного свободнее всего за несколько месяцев.',
    avatar: '../data/img/michael.webp'
  },
  {
    name: 'Сара Уильямс',
    subject: 'Физика',
    rating: 4,
    comment: 'Я нашла репетитора по физике, который объясняет сложные темы простым языком. Очень рекомендую эту платформу!',
    avatar: '../data/img/sarah.jpeg'
  }
];

export default Home;