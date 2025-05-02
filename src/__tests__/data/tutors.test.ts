import { getSubjects } from '../../data/tutors';

describe('Tutor data utilities', () => {
  beforeEach(() => {
    // Устанавливаем переменную окружения для тестов
    process.env.NODE_ENV = 'test';
  });

  test('getSubjects должен возвращать список предметов', () => {
    const subjects = getSubjects();
    expect(subjects).toBeInstanceOf(Array);
    expect(subjects.length).toBeGreaterThan(0);
    // Проверяем наличие некоторых ожидаемых предметов
    expect(subjects.some(subject => subject === 'Math' || subject === 'Physics' || subject === 'Chemistry')).toBeTruthy();
  });
});
