import React, { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { getSubjectsAsync } from '../data/tutors';

interface TutorFilterProps {
  onFilterChange: (filters: {
    searchTerm: string;
    subject: string;
    minPrice: number;
    maxPrice: number;
    onlineOnly: boolean;
    inPersonOnly: boolean;
  }) => void;
}

const TutorFilter: React.FC<TutorFilterProps> = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [subject, setSubject] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [inPersonOnly, setInPersonOnly] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [subjects, setSubjects] = useState<string[]>([]);

  useEffect(() => {
    getSubjectsAsync().then(setSubjects);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    applyFilters(e.target.value, subject, priceRange, onlineOnly, inPersonOnly);
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubject(e.target.value);
    applyFilters(searchTerm, e.target.value, priceRange, onlineOnly, inPersonOnly);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const index = e.target.name === 'minPrice' ? 0 : 1;
    const newPriceRange = [...priceRange];
    newPriceRange[index] = value;
    setPriceRange(newPriceRange);
    applyFilters(searchTerm, subject, newPriceRange, onlineOnly, inPersonOnly);
  };

  const handleOnlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOnlineOnly(e.target.checked);
    applyFilters(searchTerm, subject, priceRange, e.target.checked, inPersonOnly);
  };

  const handleInPersonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInPersonOnly(e.target.checked);
    applyFilters(searchTerm, subject, priceRange, onlineOnly, e.target.checked);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSubject('');
    setPriceRange([0, 100]);
    setOnlineOnly(false);
    setInPersonOnly(false);
    applyFilters('', '', [0, 100], false, false);
  };

  const applyFilters = (
    search: string,
    subj: string,
    price: number[],
    online: boolean,
    inPerson: boolean
  ) => {
    onFilterChange({
      searchTerm: search,
      subject: subj,
      minPrice: price[0],
      maxPrice: price[1],
      onlineOnly: online,
      inPersonOnly: inPerson
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Поиск по имени, предмету или ключевому слову..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-4 border"
        />
      </div>

      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium text-gray-800">Фильтры</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            {isFiltersOpen ? <X className="h-4 w-4 mr-1" /> : <Filter className="h-4 w-4 mr-1" />}
            <span>{isFiltersOpen ? 'Скрыть фильтры' : 'Показать фильтры'}</span>
          </button>
          <button
            onClick={resetFilters}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Сбросить
          </button>
        </div>
      </div>

      {isFiltersOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Предмет
            </label>
            <select
              id="subject"
              value={subject}
              onChange={handleSubjectChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Все предметы</option>
              {subjects.map((subj, index) => (
                <option key={index} value={subj}>
                  {subj}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-1">
              Диапазон цен: ${priceRange[0]} - ${priceRange[1]}
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="number"
                  name="minPrice"
                  value={priceRange[0]}
                  onChange={handlePriceChange}
                  min="0"
                  max={priceRange[1]}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <label className="block text-xs text-gray-500 mt-1">Минимальная цена</label>
              </div>
              <div>
                <input
                  type="number"
                  name="maxPrice"
                  value={priceRange[1]}
                  onChange={handlePriceChange}
                  min={priceRange[0]}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <label className="block text-xs text-gray-500 mt-1">Максимальная цена</label>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="block text-sm font-medium text-gray-700">Тип занятий</p>
            <div className="flex items-center">
              <input
                id="online"
                type="checkbox"
                checked={onlineOnly}
                onChange={handleOnlineChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="online" className="ml-2 block text-sm text-gray-700">
                Только онлайн
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="inPerson"
                type="checkbox"
                checked={inPersonOnly}
                onChange={handleInPersonChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="inPerson" className="ml-2 block text-sm text-gray-700">
                Только очно
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorFilter;