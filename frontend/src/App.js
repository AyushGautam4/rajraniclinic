import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import AppEffects from "./components/AppEffects";
import Home from "./pages/Home";
import DoctorsPage from "./pages/DoctorsPage";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import RelaxDiagnosticsPage from "./pages/RelaxDiagnosticsPage";
import { Toaster } from "./components/ui/sonner";
import WelcomePopup from "./components/WelcomePopup";
import HospitalChatbot from "./components/HospitalChatbot";
import WhatsAppFloat from "./components/WhatsAppFloat";

// Theme & Language Context
export const AppContext = createContext();

const getRouterBasename = () => {
  const publicUrl = process.env.PUBLIC_URL;

  if (!publicUrl || typeof window === 'undefined') {
    return undefined;
  }

  try {
    const publicPath = new URL(publicUrl, window.location.origin).pathname.replace(/\/$/, '');

    if (!publicPath || publicPath === '/') {
      return undefined;
    }

    return window.location.pathname === publicPath || window.location.pathname.startsWith(`${publicPath}/`)
      ? publicPath
      : undefined;
  } catch (error) {
    return undefined;
  }
};

function App() {
  // Dark mode has been removed site-wide. `darkMode` is kept in the context
  // (always false) purely so existing `darkMode ? ... : ...` styling in
  // every page/component keeps working unmodified — they simply always
  // resolve to their light-theme branch now.
  const darkMode = false;

  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'en';
  });

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('darkMode');
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => setLanguage(language === 'en' ? 'hi' : 'en');

  return (
    <AppContext.Provider value={{ darkMode, language, toggleLanguage }}>
      <div className="App flex min-h-dvh flex-col overflow-x-hidden">
        <BrowserRouter basename={getRouterBasename()}>
          <AppEffects darkMode={darkMode} language={language} />
          <ScrollToTop />
          <Header />
          <main className="flex-1 overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/diagnostics" element={<RelaxDiagnosticsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          </main>
          <Footer />
          <WelcomePopup />
          {/* Floating actions: rendered once here so WhatsApp + Chat show consistently on every page */}
          <HospitalChatbot />
          <WhatsAppFloat />
          <Toaster position="top-right" />
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
}

export default App;