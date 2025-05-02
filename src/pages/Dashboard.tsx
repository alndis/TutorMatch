import React, { useState, useRef, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Calendar, BookOpen, MessageSquare, Heart, Edit, Settings, LogOut } from 'lucide-react';
import { getTutorById } from '../data/tutors';

interface TutorSubject {
  name: string;
  description: string;
  level: string;
  price: number;
}

const Dashboard: React.FC = () => {
  const { user, isAuthenticated, logout, getFavoriteTutors, updateTutorSubjects } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [editAvatar, setEditAvatar] = useState(user?.avatar || '');
  const [editError, setEditError] = useState('');
  
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeactivateAccount, setShowDeactivateAccount] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const favoriteTutors = getFavoriteTutors();

  const editProfileRef = useRef<HTMLDivElement>(null);
  const changePasswordRef = useRef<HTMLDivElement>(null);
  const deactivateAccountRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (
    e: MouseEvent,
    ref: React.RefObject<HTMLDivElement | null>,
    setShowModal: (show: boolean) => void
  ) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    const handleEditProfileClickOutside = (e: MouseEvent) => 
      handleClickOutside(e, editProfileRef, setShowEditProfile);
    
    const handleChangePasswordClickOutside = (e: MouseEvent) => 
      handleClickOutside(e, changePasswordRef, setShowChangePassword);
    
    const handleDeactivateAccountClickOutside = (e: MouseEvent) => 
      handleClickOutside(e, deactivateAccountRef, setShowDeactivateAccount);
    
    if (showEditProfile) {
      document.addEventListener('mousedown', handleEditProfileClickOutside);
    }
    if (showChangePassword) {
      document.addEventListener('mousedown', handleChangePasswordClickOutside);
    }
    if (showDeactivateAccount) {
      document.addEventListener('mousedown', handleDeactivateAccountClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleEditProfileClickOutside);
      document.removeEventListener('mousedown', handleChangePasswordClickOutside);
      document.removeEventListener('mousedown', handleDeactivateAccountClickOutside);
    };
  }, [showEditProfile, showChangePassword, showDeactivateAccount]);

  const [showEditSubject, setShowEditSubject] = useState(false);
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [editSubjectIndex, setEditSubjectIndex] = useState<number | null>(null);
  const [currentSubject, setCurrentSubject] = useState<any>(null);

  const editSubjectRef = useRef<HTMLDivElement>(null);
  const addSubjectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEditSubjectClickOutside = (e: MouseEvent) => 
      handleClickOutside(e, editSubjectRef, setShowEditSubject);
    
    const handleAddSubjectClickOutside = (e: MouseEvent) => 
      handleClickOutside(e, addSubjectRef, setShowAddSubject);
    
    if (showEditSubject) {
      document.addEventListener('mousedown', handleEditSubjectClickOutside);
    }
    if (showAddSubject) {
      document.addEventListener('mousedown', handleAddSubjectClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleEditSubjectClickOutside);
      document.removeEventListener('mousedown', handleAddSubjectClickOutside);
    };
  }, [showEditSubject, showAddSubject]);

  const subjects: TutorSubject[] =
    user?.role === 'tutor' && Array.isArray(user.subjects)
      ? user.subjects as TutorSubject[]
      : [];

  const [subjectName, setSubjectName] = useState('');
  const [subjectDescription, setSubjectDescription] = useState('');
  const [subjectLevel, setSubjectLevel] = useState('');
  const [subjectPrice, setSubjectPrice] = useState<number>(0);

  const handleAddNewSubject = () => {
    setSubjectName('');
    setSubjectDescription('');
    setSubjectLevel('');
    setSubjectPrice(0);
    setShowAddSubject(true);
  };

  const handleEditSubject = (idx: number) => {
    const subj = subjects[idx];
    setEditSubjectIndex(idx);
    setSubjectName(subj.name);
    setSubjectDescription(subj.description);
    setSubjectLevel(subj.level);
    setSubjectPrice(subj.price);
    setShowEditSubject(true);
  };

  const handleSaveSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectName.trim() || !subjectDescription.trim() || !subjectLevel.trim() || !subjectPrice) return;
    const newSubject: TutorSubject = {
      name: subjectName.trim(),
      description: subjectDescription.trim(),
      level: subjectLevel.trim(),
      price: subjectPrice
    };
    let updatedSubjects;
    if (showEditSubject && editSubjectIndex !== null) {
      updatedSubjects = subjects.map((subj, idx) => idx === editSubjectIndex ? newSubject : subj);
    } else {
      updatedSubjects = [...subjects, newSubject];
    }
    await updateTutorSubjects(updatedSubjects);
    setShowAddSubject(false);
    setShowEditSubject(false);
    setEditSubjectIndex(null);
    setSubjectName('');
    setSubjectDescription('');
    setSubjectLevel('');
    setSubjectPrice(0);
  };

  const handleDeleteSubject = async (subjectName: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот предмет?')) {
      const updatedSubjects = subjects.filter((subj: TutorSubject) => subj.name !== subjectName);
      await updateTutorSubjects(updatedSubjects);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setEditError('');
    
    if (!editName.trim() || !editEmail.trim()) {
      setEditError('Имя и email обязательны');
      return;
    }
    const updatedUser = { ...user, name: editName, email: editEmail, avatar: editAvatar };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    window.location.reload();
  };
  
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    
    if (!currentPassword) {
      setPasswordError('Введите текущий пароль');
      return;
    }
    
    if (newPassword.length < 6) {
      setPasswordError('Новый пароль должен содержать не менее 6 символов');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordError('Пароли не совпадают');
      return;
    }
    
    alert('Пароль успешно изменен!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowChangePassword(false);
  };
  
  const handleDeactivateAccount = () => {
    alert('Ваш аккаунт будет деактивирован. До свидания!');
    logout();
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Личный кабинет</h1>
        <p className="mt-2 text-gray-600">
          {user?.role === 'tutor' 
            ? 'Управляйте своим профилем репетитора и смотрите предстоящие занятия' 
            : 'Управляйте своим аккаунтом и смотрите ваши предстоящие занятия'}
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col items-center text-center">
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-24 h-24 rounded-full mb-4 object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <span className="text-blue-600 text-xl font-medium">
                    {user?.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              )}
              <h2 className="text-xl font-semibold">{user?.name}</h2>
              <p className="text-gray-600 capitalize">{user?.role}</p>
              
              <button
                className="mt-4 flex items-center text-sm text-blue-600 hover:text-blue-800"
                onClick={() => setShowEditProfile(true)}
              >
                <Edit className="h-4 w-4 mr-1" />
                Редактировать профиль
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="space-y-1 p-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center px-4 py-2 rounded-md text-left ${
                  activeTab === 'profile' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <User className="h-5 w-5 mr-3" />
                Профиль
              </button>
              
              {user?.role === 'tutor' ? (
                <>
                  <button
                    onClick={() => setActiveTab('sessions')}
                    className={`w-full flex items-center px-4 py-2 rounded-md text-left ${
                      activeTab === 'sessions' 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Calendar className="h-5 w-5 mr-3" />
                    Предстоящие занятия
                  </button>
                  <button
                    onClick={() => setActiveTab('subjects')}
                    className={`w-full flex items-center px-4 py-2 rounded-md text-left ${
                      activeTab === 'subjects' 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <BookOpen className="h-5 w-5 mr-3" />
                    Мои предметы
                  </button>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className={`w-full flex items-center px-4 py-2 rounded-md text-left ${
                      activeTab === 'bookings' 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Calendar className="h-5 w-5 mr-3" />
                    Мои бронирования
                  </button>
                  <button
                    onClick={() => setActiveTab('messages')}
                    className={`w-full flex items-center px-4 py-2 rounded-md text-left ${
                      activeTab === 'messages' 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <MessageSquare className="h-5 w-5 mr-3" />
                    Сообщения
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className={`w-full flex items-center px-4 py-2 rounded-md text-left ${
                      activeTab === 'bookings' 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Calendar className="h-5 w-5 mr-3" />
                    Мои бронирования
                  </button>
                  <button
                    onClick={() => setActiveTab('favorites')}
                    className={`w-full flex items-center px-4 py-2 rounded-md text-left ${
                      activeTab === 'favorites' 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Heart className="h-5 w-5 mr-3" />
                    Избранные репетиторы
                  </button>
                  <button
                    onClick={() => setActiveTab('messages')}
                    className={`w-full flex items-center px-4 py-2 rounded-md text-left ${
                      activeTab === 'messages' 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <MessageSquare className="h-5 w-5 mr-3" />
                    Сообщения
                  </button>
                </>
              )}
              
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center px-4 py-2 rounded-md text-left ${
                  activeTab === 'settings' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Settings className="h-5 w-5 mr-3" />
                Настройки
              </button>
              
              <button
                onClick={logout}
                className="w-full flex items-center px-4 py-2 rounded-md text-left text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Выйти
              </button>
            </div>
          </div>
        </div>
        
        <div className="lg:w-3/4">
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Информация о профиле</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
                  <input 
                    type="text" 
                    value={user?.name || ''} 
                    readOnly
                    className="w-full rounded-md border-gray-300 bg-gray-50 py-2 px-4"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="text" 
                    value={user?.email || ''} 
                    readOnly
                    className="w-full rounded-md border-gray-300 bg-gray-50 py-2 px-4"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Роль</label>
                  <input 
                    type="text" 
                    value={user?.role || ''} 
                    readOnly
                    className="w-full rounded-md border-gray-300 bg-gray-50 py-2 px-4 capitalize"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">С нами с</label>
                  <input 
                    type="text" 
                    value="Январь 2025" 
                    readOnly
                    className="w-full rounded-md border-gray-300 bg-gray-50 py-2 px-4"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <button 
                  onClick={() => setShowEditProfile(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                  Редактировать профиль
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'sessions' && user?.role === 'tutor' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Предстоящие занятия</h2>
              <div className="text-center py-8 border border-dashed border-gray-300 rounded-md">
                <p className="text-gray-500">У вас пока нет запланированных занятий.</p>
              </div>
            </div>
          )}
          
          {activeTab === 'bookings' && user?.bookings && user.bookings.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Мои бронирования</h2>
              <div className="space-y-4">
                {user.bookings.map((booking) => {
                  const tutor = getTutorById(booking.tutorId);
                  if (!tutor) return null;
                  return (
                    <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{tutor.name}</h3>
                          <p className="text-sm text-gray-600">
                            {booking.subject || (Array.isArray(tutor.subjects) && tutor.subjects[0]?.name) || tutor.subjects[0]}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {booking.date}
                          </p>
                          <p className="text-sm text-gray-600">{booking.time}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {booking.status === 'confirmed' ? 'Подтверждено' :
                            booking.status === 'pending' ? 'Ожидание' : 'Отменено'}
                        </span>
                        <Link 
                          to={`/tutors/${tutor.id}`}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Перейти к профилю
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {activeTab === 'favorites' && user?.role === 'student' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Избранные репетиторы</h2>
              {favoriteTutors.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {favoriteTutors.map((tutor) => (
                    <div key={tutor.id} className="border border-gray-200 rounded-lg p-4 flex items-center">
                      <img 
                        src={tutor.avatar} 
                        alt={tutor.name} 
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{tutor.name}</h3>
                        <p className="text-sm text-gray-600">{tutor.subjects[0]}</p>
                      </div>
                      <Link 
                        to={`/tutors/${tutor.id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Профиль
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border border-dashed border-gray-300 rounded-md">
                  <p className="text-gray-500">У вас нет избранных репетиторов.</p>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'messages' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Сообщения</h2>
              <div className="text-center py-8 border border-dashed border-gray-300 rounded-md">
                <p className="text-gray-500">У вас пока нет сообщений.</p>
              </div>
            </div>
          )}
          
          {activeTab === 'subjects' && user?.role === 'tutor' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Мои предметы</h2>
              <p className="text-gray-600 mb-6">
                Управляйте предметами, которые вы преподаете. Добавьте подробную информацию, чтобы привлечь больше студентов.
              </p>
              
              <div className="space-y-4">
                {subjects.length > 0 ? (
                  subjects.map((subject, idx) => (
                    <div key={idx} className="p-4 border border-gray-200 rounded-md flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <div className="font-medium text-gray-900 text-lg">{subject.name}</div>
                        <div className="text-gray-700 text-sm mb-1">{subject.description}</div>
                        <div className="text-gray-500 text-xs mb-1">Уровень: {subject.level}</div>
                        <div className="text-gray-800 text-sm">Стоимость: <span className="font-semibold">${subject.price}</span> / час</div>
                      </div>
                      <div className="flex gap-2 mt-2 md:mt-0">
                        <button
                          onClick={() => handleEditSubject(idx)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Редактировать
                        </button>
                        <button
                          onClick={() => handleDeleteSubject(subject.name)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">У вас пока нет добавленных предметов.</div>
                )}
                <button 
                  onClick={handleAddNewSubject}
                  className="mt-4 px-4 py-2 w-full border border-dashed border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors duration-300 flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Добавить новый предмет
                </button>
              </div>
              {(showAddSubject || showEditSubject) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
                    <button
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                      onClick={() => { setShowAddSubject(false); setShowEditSubject(false); setEditSubjectIndex(null); }}
                    >✕</button>
                    <h3 className="text-xl font-semibold mb-4">{showEditSubject ? 'Редактировать предмет' : 'Добавить новый предмет'}</h3>
                    <form className="space-y-4" onSubmit={handleSaveSubject}>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Название предмета</label>
                        <input
                          type="text"
                          value={subjectName}
                          onChange={e => setSubjectName(e.target.value)}
                          className="w-full rounded-md border-gray-300 shadow-sm"
                          required
                          placeholder="Например: Математика"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
                        <textarea
                          value={subjectDescription}
                          onChange={e => setSubjectDescription(e.target.value)}
                          className="w-full rounded-md border-gray-300 shadow-sm"
                          required
                          placeholder="Кратко опишите, чему вы обучаете по этому предмету"
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Уровень</label>
                        <input
                          type="text"
                          value={subjectLevel}
                          onChange={e => setSubjectLevel(e.target.value)}
                          className="w-full rounded-md border-gray-300 shadow-sm"
                          required
                          placeholder="Например: школьный, вуз, олимпиадный"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Стоимость (USD/час)</label>
                        <input
                          type="number"
                          value={subjectPrice}
                          onChange={e => setSubjectPrice(Number(e.target.value))}
                          className="w-full rounded-md border-gray-300 shadow-sm"
                          required
                          min={0}
                          placeholder="Стоимость за час"
                        />
                      </div>
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => { setShowAddSubject(false); setShowEditSubject(false); setEditSubjectIndex(null); }}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                          Отмена
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                          {showEditSubject ? 'Сохранить' : 'Добавить'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Настройки аккаунта</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Настройки уведомлений</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="email-notifications"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="email-notifications" className="ml-2 block text-sm text-gray-700">
                        Email-уведомления о новых сообщениях
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="session-reminders"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="session-reminders" className="ml-2 block text-sm text-gray-700">
                        Напоминания о занятиях
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="marketing"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="marketing" className="ml-2 block text-sm text-gray-700">
                        Маркетинговые рассылки
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Пароль</h3>
                  <button 
                    onClick={() => setShowChangePassword(true)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                  >
                    Изменить пароль
                  </button>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Приватность</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="profile-visible"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="profile-visible" className="ml-2 block text-sm text-gray-700">
                        Сделать профиль видимым для других
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="show-availability"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="show-availability" className="ml-2 block text-sm text-gray-700">
                        Показывать календарь доступности
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-red-600 mb-3">Не нажимай!!</h3>
                  <button 
                    onClick={() => setShowDeactivateAccount(true)}
                    className="px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors duration-300"
                  >
                    Деактивировать аккаунт
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {showEditProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={editProfileRef} className="bg-white rounded-lg p-6 max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowEditProfile(false)}
            >✕</button>
            <h3 className="text-xl font-semibold mb-4">Редактировать профиль</h3>
            {editError && <div className="mb-2 text-red-600">{editError}</div>}
            <form className="space-y-4" onSubmit={handleSaveProfile}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={e => setEditEmail(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Аватар (URL)</label>
                <input
                  type="text"
                  value={editAvatar}
                  onChange={e => setEditAvatar(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowEditProfile(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {showChangePassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={changePasswordRef} className="bg-white rounded-lg p-6 max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowChangePassword(false)}
            >✕</button>
            <h3 className="text-xl font-semibold mb-4">Изменить пароль</h3>
            {passwordError && <div className="mb-2 text-red-600">{passwordError}</div>}
            <form className="space-y-4" onSubmit={handleChangePassword}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Текущий пароль</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Новый пароль</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Подтвердите пароль</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowChangePassword(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {showDeactivateAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={deactivateAccountRef} className="bg-white rounded-lg p-6 max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowDeactivateAccount(false)}
            >✕</button>
            <h3 className="text-xl font-semibold mb-4 text-red-600">Деактивировать аккаунт</h3>
            <p className="mb-6 text-gray-600">
              Вы уверены, что хотите деактивировать свой аккаунт? Это действие не может быть отменено.
              Все ваши данные будут удалены из системы.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeactivateAccount(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Отмена
              </button>
              <button
                onClick={handleDeactivateAccount}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Подтвердить деактивацию
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;