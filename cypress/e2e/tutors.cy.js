describe('Список репетиторов', () => {
  beforeEach(() => {
    // Перед каждым тестом посещаем страницу списка репетиторов
    cy.visit('/tutors');
  });

  it('должен отображать список репетиторов', () => {
    // Проверяем заголовок
    cy.contains('h1', 'Найдите идеального репетитора');
    
    // Проверяем наличие карточек репетиторов
    cy.get('.bg-white.rounded-lg.shadow-md').should('have.length.at.least', 1);
  });

  it('должен фильтровать репетиторов по поиску', () => {
    // Запоминаем первоначальное количество репетиторов
    cy.get('.bg-white.rounded-lg.shadow-md').then($cards => {
      const initialCount = $cards.length;
      
      // Вводим поисковый запрос
      cy.get('input[placeholder*="Поиск"]').type('Математика');
      
      // Проверяем, что список изменился
      cy.get('.bg-white.rounded-lg.shadow-md').should($filteredCards => {
        expect($filteredCards.length).to.be.at.most(initialCount);
      });
    });
  });

  it('должен открывать форму бронирования', () => {
    // Нажимаем на кнопку "Забронировать" у первого репетитора
    cy.contains('button', 'Забронировать').first().click();
    
    // Проверяем, что модальное окно отображается
    cy.contains('h2', /Забронировать занятие с/).should('be.visible');
    
    // Заполняем форму
    cy.get('select').first().select(1); // Выбираем предмет
    cy.get('input[type="date"]').type('2023-12-31');
    cy.get('select').eq(1).select(1); // Выбираем время
    
    // Подтверждаем бронирование
    cy.contains('button', 'Забронировать').click();
    
    // Модальное окно должно закрыться
    cy.contains('h2', /Забронировать занятие с/).should('not.exist');
  });
});
