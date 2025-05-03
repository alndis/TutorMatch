import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Импорт компонентов
import Header from './components/Header';
import Footer from './components/Footer';

// Импорт страниц
import Home from './pages/Home';
import About from './pages/About';
import TutorsList from './pages/TutorsList';
import TutorProfile from './pages/TutorProfile';
import SubjectsPage from './pages/SubjectsPage';
import HowItWorks from './pages/HowItWorks';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

// Страницы поддержки
import FAQ from './pages/Support/FAQ';
import Terms from './pages/Support/Terms';
import Privacy from './pages/Support/Privacy';
import Contact from './pages/Support/Contact';

// Компонент для прокрутки вверх при смене маршрута
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow bg-gray-50">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/tutors" element={<TutorsList />} />
              <Route path="/tutors/:id" element={<TutorProfile />} />
              <Route path="/subjects" element={<SubjectsPage />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Страницы поддержки */}
              <Route path="/faq" element={<FAQ />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;