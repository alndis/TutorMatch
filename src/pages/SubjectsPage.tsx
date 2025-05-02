import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTutors } from '../data/tutors';
import { Search } from 'lucide-react';

const SubjectsPage: React.FC = () => {
  const [allSubjects, setAllSubjects] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getTutors().then(tutors => {
      const subjectSet = new Set<string>();
      tutors.forEach(tutor => {
        tutor.subjects.forEach(subject => subjectSet.add(subject));
      });
      setAllSubjects(Array.from(subjectSet).sort());
    });
  }, []);

  // Filter subjects based on search term
  const filteredSubjects = searchTerm
    ? allSubjects.filter(subject => 
        subject.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allSubjects;
  
  // Group subjects by first letter
  const groupedSubjects: Record<string, string[]> = {};
  
  filteredSubjects.forEach(subject => {
    const firstLetter = subject.charAt(0).toUpperCase();
    if (!groupedSubjects[firstLetter]) {
      groupedSubjects[firstLetter] = [];
    }
    groupedSubjects[firstLetter].push(subject);
  });
  
  // Get sorted array of first letters
  const letters = Object.keys(groupedSubjects).sort();
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Просмотр предметов</h1>
        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
          Изучите все предметы, которые преподают наши репетиторы, и найдите идеальный вариант для ваших учебных нужд
        </p>
      </div>
      
      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search subjects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-4 border"
          />
        </div>
      </div>
      
      {letters.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Alphabet Jump Menu */}
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
            <div className="flex items-center justify-center flex-wrap gap-2">
              {letters.map(letter => (
                <a 
                  key={letter}
                  href={`#letter-${letter}`}
                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors duration-300 text-sm font-medium"
                >
                  {letter}
                </a>
              ))}
            </div>
          </div>
          
          {/* Subject Groups */}
          <div className="p-6">
            {letters.map(letter => (
              <div key={letter} id={`letter-${letter}`} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">{letter}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {groupedSubjects[letter].map((subject, index) => (
                    <Link
                      key={index}
                      to={`/tutors?subject=${subject}`}
                      className="block p-3 rounded-md border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors duration-300"
                    >
                      <div className="font-medium text-gray-800 hover:text-blue-600">{subject}</div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Предметы не найдены</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Мы не смогли найти предметы, соответствующие вашему запросу. Попробуйте другой термин или просмотрите все предметы.
          </p>
          <button 
            onClick={() => setSearchTerm('')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Сбросить поиск
          </button>
        </div>
      )}
    </div>
  );
};

export default SubjectsPage;