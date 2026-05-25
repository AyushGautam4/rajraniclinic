import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { AppContext } from '../App';
import { translations } from '../mockData';

const NotFoundPage = () => {
  const { darkMode, language } = useContext(AppContext);
  const t = translations[language];

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' 
        : 'bg-gradient-to-br from-blue-50 via-white to-teal-50'
    }`}>
      <div className="text-center max-w-lg">
        {/* 404 Text */} 
        <div className="relative mb-8">
          <h1 className={`text-[180px] font-black leading-none ${
            darkMode 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400' 
              : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600'
          }`}>
            404
          </h1>
          <div className={`absolute inset-0 text-[180px] font-black leading-none blur-2xl opacity-30 ${
            darkMode ? 'text-blue-400' : 'text-blue-600'
          }`}>
            404
          </div>
        </div>

        {/* Message */}
        <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {t.pageNotFound}
        </h2>
        <p className={`text-lg mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {language === 'hi' 
            ? 'जो पेज आप ढूंढ रहे हैं वो मौजूद नहीं है। कृपया होम पेज पर जाएं।'
            : 'The page you are looking for does not exist. Please visit our home page.'}
        </p>

        {/* Available Pages */}
        <div className={`p-6 rounded-2xl mb-8 ${darkMode ? 'bg-slate-800/50' : 'bg-white/80'} backdrop-blur-sm`}>
          <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {language === 'hi' ? 'उपलब्ध पेज:' : 'Available pages:'}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { name: t.home, path: '/' },
              { name: t.services, path: '/services' },
              { name: t.doctors, path: '/doctors' },
              { name: t.about, path: '/about' },
              { name: t.contact, path: '/contact' }
            ].map((page) => (
              <Link 
                key={page.path}
                to={page.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  darkMode 
                    ? 'bg-slate-700 text-gray-300 hover:bg-blue-600 hover:text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white'
                }`}
              >
                {page.name}
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8"
            >
              <Home className="w-5 h-5 mr-2" />
              {t.goHome}
            </Button>
          </Link>
          <Button 
            size="lg"
            variant="outline"
            onClick={() => window.history.back()}
            className={darkMode ? 'border-gray-600 text-gray-300 hover:bg-slate-800' : ''}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {language === 'hi' ? 'वापस जाएं' : 'Go Back'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
