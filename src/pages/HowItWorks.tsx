import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Video, MessageSquare, Star, CheckCircle } from 'lucide-react';

const HowItWorks: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Как работает TutorMatch</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Наша платформа упрощает поиск квалифицированных репетиторов, которые помогут вам достичь ваших учебных целей. Вот пошаговое руководство.
          </p>
        </div>
      </section>
      
      {/* Steps Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="mb-16 relative">
                {index < steps.length - 1 && (
                  <div className="absolute left-12 top-24 bottom-0 w-0.5 bg-blue-100 hidden sm:block" />
                )}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
                  <div className="flex-shrink-0 w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white">
                      {step.icon}
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h2>
                    <p className="text-lg text-gray-600 mb-6">{step.description}</p>
                    {step.image && (
                      <img 
                        src={step.image} 
                        alt={step.title}
                        className="rounded-lg shadow-md mx-auto sm:mx-0 max-w-full h-auto"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Часто задаваемые вопросы</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Найдите ответы на часто задаваемые вопросы о нашей платформе
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4">
                    <span className="text-gray-800">{faq.question}</span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600">
                    {faq.answer}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Почему выбирают TutorMatch?</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Наша платформа предлагает множество преимуществ по сравнению с традиционными услугами репетиторства
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Готовы начать?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к тысячам студентов, которые уже получают пользу от персонализированного обучения на нашей платформе.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/register"
              className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md shadow-md hover:bg-gray-100 transition-colors duration-300"
            >
              Зарегистрироваться
            </Link>
            <Link
              to="/tutors"
              className="px-6 py-3 bg-blue-500 text-white font-medium rounded-md shadow-md border border-blue-400 hover:bg-blue-400 transition-colors duration-300"
            >
              Просмотреть репетиторов
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Данные для шагов
const steps = [
  {
    title: "Создайте аккаунт",
    description: "Зарегистрируйтесь бесплатно, чтобы начать. Вам нужно будет указать основную информацию и выбрать, являетесь ли вы учеником, ищущим репетитора, или репетитором, предлагающим свои услуги.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>,
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    title: "Найдите идеального репетитора",
    description: "Используйте наши инструменты поиска и фильтрации, чтобы найти репетиторов, соответствующих вашим конкретным потребностям. Вы можете фильтровать по предмету, ценовому диапазону, доступности и другим параметрам.",
    icon: <Search className="h-8 w-8" />,
    image: "https://images.pexels.com/photos/4144101/pexels-photo-4144101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    title: "Запланируйте занятия",
    description: "После того, как вы нашли подходящего репетитора, вы можете запланировать занятия прямо через нашу платформу. Выберите удобное для вас обоих время и решите, предпочитаете ли вы онлайн или очное обучение.",
    icon: <Calendar className="h-8 w-8" />,
    image: "https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    title: "Учитесь и развивайтесь",
    description: "Посещайте запланированные занятия и начинайте учиться! Для онлайн-занятий наша платформа предоставляет интегрированные инструменты видеоконференций. Для очных занятий вы можете согласовать место встречи напрямую с репетитором.",
    icon: <Video className="h-8 w-8" />,
    image: "https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    title: "Оставьте отзыв",
    description: "После занятий вы можете оставить отзывы и оценки для вашего репетитора. Это помогает другим ученикам найти хороших репетиторов и помогает репетиторам строить свою репутацию на платформе.",
    icon: <Star className="h-8 w-8" />,
    image: "https://images.pexels.com/photos/7129701/pexels-photo-7129701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];

// Данные для FAQ
const faqs = [
  {
    question: "Сколько стоит использование TutorMatch?",
    answer: "TutorMatch бесплатен для регистрации и поиска репетиторов. Репетиторы устанавливают свои собственные почасовые ставки, и вы платите непосредственно за забронированные занятия. Мы не взимаем дополнительную плату с учеников."
  },
  {
    question: "Могу ли я попробовать репетитора перед регулярными занятиями?",
    answer: "Да, многие репетиторы предлагают бесплатное или со скидкой вводное занятие, чтобы вы могли убедиться, что они подходят для вашего стиля обучения и потребностей. Вы можете увидеть эту информацию на их странице профиля."
  },
  {
    question: "Как проходят онлайн-занятия?",
    answer: "Онлайн-занятия проходят через нашу интегрированную платформу видеоконференций. Вы получите ссылку для присоединения к занятию в назначенное время. Платформа включает такие функции, как совместное использование экрана, цифровая доска и обмен документами для улучшения учебного опыта."
  },
  {
    question: "По каким предметам я могу найти репетиторов?",
    answer: "У нас есть репетиторы по широкому спектру предметов, включая математику, естественные науки, языки, музыку, гуманитарные науки, подготовку к экзаменам и многое другое. Вы можете просмотреть полный список предметов на странице Предметы."
  },
  {
    question: "Как стать репетитором на TutorMatch?",
    answer: "Чтобы стать репетитором, создайте аккаунт и выберите роль 'Репетитор'. Вам нужно будет заполнить свой профиль информацией о вашем образовании, опыте, предметах, которые вы преподаете, и вашей почасовой ставке. После заполнения ваш профиль будет проверен нашей командой, прежде чем быть опубликованным."
  },
  {
    question: "Есть ли минимальное обязательство для занятий?",
    answer: "Нет, минимального обязательства нет. Вы можете забронировать столько занятий, сколько вам нужно, хотя многие репетиторы предлагают скидки ученикам, которые бронируют несколько занятий."
  }
];

// Данные о преимуществах
const benefits = [
  {
    title: "Проверенные репетиторы",
    description: "Мы тщательно проверяем все профили репетиторов, чтобы убедиться, что они имеют квалификацию и опыт, о которых заявляют.",
    icon: <CheckCircle className="h-8 w-8" />
  },
  {
    title: "Гибкое расписание",
    description: "Бронируйте занятия в удобное для вас время, с возможностью как регулярных уроков, так и разовой помощи.",
    icon: <Calendar className="h-8 w-8" />
  },
  {
    title: "Персонализированное обучение",
    description: "Получайте образование, адаптированное под ваши конкретные потребности, стиль обучения и темп, а не универсальное обучение.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  },
  {
    title: "Удобное общение",
    description: "Наша система сообщений позволяет легко поддерживать связь с вашим репетитором между занятиями.",
    icon: <MessageSquare className="h-8 w-8" />
  },
  {
    title: "Онлайн и очные варианты",
    description: "Выбирайте, предпочитаете ли вы учиться онлайн из любого места или встречаться лично для более традиционного опыта.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  },
  {
    title: "Безопасные платежи",
    description: "Наша безопасная платежная система защищает как учеников, так и репетиторов и гарантирует, что вы платите только за полученные занятия.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  }
];

export default HowItWorks;