import React, { useState, useContext } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  Send,
  ExternalLink,
  MessageSquare,
  Ambulance,
  Building2,
  MessageCircle,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Mail,
  ShieldCheck,
  BadgeCheck,
  Copy
} from 'lucide-react';
import { hospitalInfo, diagnosticsInfo, faqList, translations } from '../mockData';
import { AppContext } from '../App';

const ContactPage = () => {
  const { darkMode, language } = useContext(AppContext);
  const t = translations[language];
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [submitFeedback, setSubmitFeedback] = useState({ type: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const formFieldClassName = `allow-copy mt-2 h-12 rounded-xl border ${darkMode ? 'border-slate-700 bg-slate-900 text-white placeholder:text-slate-500' : 'border-slate-200 bg-white'}`;
  const formTextAreaClassName = `allow-copy mt-2 resize-none rounded-xl border ${darkMode ? 'border-slate-700 bg-slate-900 text-white placeholder:text-slate-500' : 'border-slate-200 bg-white'}`;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const validateForm = () => {
    const nextErrors = {};
    const phoneValue = formData.phone.trim();
    const emailValue = formData.email.trim();

    if (!formData.name.trim()) {
      nextErrors.name = language === 'hi' ? 'कृपया अपना नाम लिखें।' : 'Please enter your name.';
    }

    if (!phoneValue) {
      nextErrors.phone = language === 'hi' ? 'कृपया फोन नंबर लिखें।' : 'Please enter your phone number.';
    } else if (!/^[6-9]\d{9}$/.test(phoneValue)) {
      nextErrors.phone = language === 'hi' ? 'कृपया सही 10 अंकों का भारतीय मोबाइल नंबर लिखें।' : 'Enter a valid 10-digit Indian mobile number.';
    }

    if (emailValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      nextErrors.email = language === 'hi' ? 'कृपया सही ईमेल लिखें।' : 'Enter a valid email address.';
    }

    if (!formData.message.trim()) {
      nextErrors.message = language === 'hi' ? 'कृपया अपना मैसेज लिखें।' : 'Please write your message.';
    }

    setFormErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const getContactTransport = () => {
    const customEndpoint = process.env.REACT_APP_CONTACT_ENDPOINT?.trim();

    if (customEndpoint) {
      return { type: 'function', url: customEndpoint };
    }

    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      const isLocalHost = hostname === 'localhost' || hostname === '127.0.0.1';

      if (isLocalHost) {
        return { type: 'formsubmit', url: `https://formsubmit.co/ajax/${hospitalInfo.email}` };
      }
    }

    return { type: 'function', url: '/api/contact' };
  };

  const postJson = async (url, payload) =>
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(payload)
    });

  const postFormSubmit = async (url, payload) =>
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: new URLSearchParams(payload)
    });

  const isSuccessfulResponse = async (response) => {
    if (!response.ok) {
      return false;
    }

    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const data = await response.clone().json().catch(() => null);
      return Boolean(data && !data.error);
    }

    const rawText = await response.clone().text().catch(() => '');
    return !/<html|<!doctype/i.test(rawText);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      toast.error(language === 'hi' ? 'कृपया फॉर्म की जानकारी ठीक करें।' : 'Please correct the highlighted fields.');
      return;
    }

    setIsSubmitting(true);
    setSubmitFeedback({ type: '', message: '' });

    try {
      const trimmedEmail = formData.email.trim();
      const transport = getContactTransport();
      const functionPayload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: trimmedEmail,
        subject: formData.subject.trim() || 'Website Contact',
        message: formData.message.trim()
      };
      const fallbackPayload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: trimmedEmail || 'Not provided',
        message: formData.message.trim(),
        _subject: formData.subject.trim() || 'Website Contact',
        _template: 'table',
        _captcha: 'false',
        ...(trimmedEmail ? { _replyto: trimmedEmail } : {})
      };

      let response;

      if (transport.type === 'function') {
        try {
          response = await postJson(transport.url, functionPayload);
        } catch (error) {
          response = await postFormSubmit(`https://formsubmit.co/ajax/${hospitalInfo.email}`, fallbackPayload);
        }

        if (!(await isSuccessfulResponse(response))) {
          response = await postFormSubmit(`https://formsubmit.co/ajax/${hospitalInfo.email}`, fallbackPayload);
        }
      } else {
        response = await postFormSubmit(transport.url, fallbackPayload);
      }

      if (!(await isSuccessfulResponse(response))) {
        throw new Error('Form submission failed');
      }

      setSubmitFeedback({
        type: 'success',
        message:
          language === 'hi'
            ? 'मैसेज सफलतापूर्वक भेज दिया गया है। हम जल्दी संपर्क करेंगे।'
            : 'Message sent successfully. We will contact you soon.'
      });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      setSubmitFeedback({
        type: 'error',
        message:
          language === 'hi'
            ? 'अभी मैसेज भेजने में समस्या है। कृपया WhatsApp या कॉल का उपयोग करें।'
            : 'Unable to send the message right now. Please use WhatsApp or call.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const message = language === 'hi'
      ? 'नमस्ते! मैं राजरानी हॉस्पिटल से संपर्क करना चाहता/चाहती हूं।'
      : 'Hello! I want to contact Rajrani Hospital.';
    window.open(`https://wa.me/${hospitalInfo.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCopy = async (value, label) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(language === 'hi' ? `${label} कॉपी हो गया` : `${label} copied`);
    } catch (error) {
      toast.error(language === 'hi' ? 'कॉपी नहीं हो सका' : 'Unable to copy');
    }
  };

  const responseSteps = [
    {
      icon: MessageSquare,
      title: language === 'hi' ? 'अपनी जरूरत लिखें' : 'Tell us your need',
      text: language === 'hi' ? 'सिंपल भाषा में बताएं कि आपको OPD, टेस्ट या इमरजेंसी में क्या चाहिए।' : 'Briefly mention whether you need OPD, tests, emergency help, or a callback.'
    },
    {
      icon: ShieldCheck,
      title: language === 'hi' ? 'टीम समीक्षा करती है' : 'Team reviews it',
      text: language === 'hi' ? 'आपकी enquiry सही टीम तक पहुंचती है ताकि जवाब तेज और relevant हो।' : 'Your enquiry is routed to the right team for a faster, more relevant response.'
    },
    {
      icon: BadgeCheck,
      title: language === 'hi' ? 'अगला कदम तय होता है' : 'Next step gets clear',
      text: language === 'hi' ? 'कॉल, विजिट, टेस्ट या डायरेक्शन के लिए आपको साफ guidance मिलती है।' : 'You get clear guidance on calls, visits, tests, or directions.'
    }
  ];

  const quickCards = [
    {
      icon: Phone,
      title: language === 'hi' ? 'कॉल करें' : 'Call us',
      subtitle: hospitalInfo.phone,
      className: darkMode ? 'bg-slate-900/80 border-slate-700 hover:border-blue-500/40' : 'bg-white border-slate-200 hover:border-blue-300',
      iconClass: darkMode ? 'bg-blue-500/15 text-blue-300' : 'bg-blue-100 text-blue-600',
      action: () => window.location.href = `tel:${hospitalInfo.phone}`
    },
    {
      icon: Ambulance,
      title: language === 'hi' ? 'इमरजेंसी' : 'Emergency',
      subtitle: language === 'hi' ? '24/7 • 9350009600 / 9773626003' : '24/7 • 9350009600 / 9773626003',
      className: darkMode ? 'bg-red-950/40 border-red-900/60 hover:border-red-500/60' : 'bg-red-50 border-red-200 hover:border-red-300',
      iconClass: darkMode ? 'bg-red-500/15 text-red-300' : 'bg-red-100 text-red-600',
      action: () => window.location.href = `tel:${hospitalInfo.emergency}`
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      subtitle: language === 'hi' ? 'Fast chat support' : 'Fast chat support',
      className: darkMode ? 'bg-green-950/40 border-green-900/60 hover:border-green-500/60' : 'bg-green-50 border-green-200 hover:border-green-300',
      iconClass: darkMode ? 'bg-green-500/15 text-green-300' : 'bg-green-100 text-green-600',
      action: handleWhatsApp
    },
    {
      icon: MapPin,
      title: language === 'hi' ? 'लोकेशन' : 'Location',
      subtitle: language === 'hi' ? 'Open in Google Maps' : 'Open in Google Maps',
      className: darkMode ? 'bg-slate-900/80 border-slate-700 hover:border-teal-500/40' : 'bg-white border-slate-200 hover:border-teal-300',
      iconClass: darkMode ? 'bg-teal-500/15 text-teal-300' : 'bg-teal-100 text-teal-600',
      action: () => window.open(hospitalInfo.googleMapsLink, '_blank')
    }
  ];

  const diagnosticsDetails = [
    {
      icon: MapPin,
      label: language === 'hi' ? diagnosticsInfo.addressHindi : diagnosticsInfo.address,
      copyValue: diagnosticsInfo.address,
      copyLabel: language === 'hi' ? 'डायग्नोस्टिक्स पता' : 'Diagnostics address'
    },
    {
      icon: Phone,
      label: `${diagnosticsInfo.phone} | ${diagnosticsInfo.alternatePhone}`,
      copyValue: `${diagnosticsInfo.phone}, ${diagnosticsInfo.alternatePhone}`,
      copyLabel: language === 'hi' ? 'डायग्नोस्टिक्स फोन' : 'Diagnostics phone'
    },
    {
      icon: BadgeCheck,
      label: language === 'hi' ? diagnosticsInfo.accreditationHindi : diagnosticsInfo.accreditation,
      copyValue: diagnosticsInfo.accreditation,
      copyLabel: language === 'hi' ? 'अक्रेडिटेशन' : 'Accreditation'
    }
  ];

  const hospitalDetails = [
    {
      icon: Building2,
      label: language === 'hi' ? hospitalInfo.addressHindi : hospitalInfo.address,
      copyValue: hospitalInfo.address,
      copyLabel: language === 'hi' ? 'हॉस्पिटल पता' : 'Hospital address'
    },
    {
      icon: Phone,
      label: hospitalInfo.phone,
      copyValue: hospitalInfo.phone,
      copyLabel: language === 'hi' ? 'फोन नंबर' : 'Phone number'
    },
    {
      icon: Mail,
      label: hospitalInfo.email,
      copyValue: hospitalInfo.email,
      copyLabel: 'Email'
    },
    {
      icon: Clock,
      label: language === 'hi' ? 'OPD 9AM-9PM | इमरजेंसी 24/7' : 'OPD 9AM-9PM | Emergency 24/7',
      copyValue: language === 'hi' ? 'OPD 9AM-9PM | इमरजेंसी 24/7' : 'OPD 9AM-9PM | Emergency 24/7',
      copyLabel: language === 'hi' ? 'समय' : 'Hours'
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
      <section
        className={`page-hero-offset relative overflow-hidden px-3 pb-10 sm:px-4 sm:pb-10 md:px-5 md:pb-12 lg:pb-14 ${
          darkMode ? 'bg-gradient-to-br from-slate-950 via-emerald-950/25 to-slate-950' : 'bg-gradient-to-br from-emerald-50 via-white to-blue-50'
        }`}
      >
        <div className={`pointer-events-none absolute left-0 top-10 h-44 w-44 rounded-full blur-3xl ${darkMode ? 'bg-emerald-500/20' : 'bg-emerald-300/40'}`}></div>
        <div className={`pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full blur-3xl ${darkMode ? 'bg-blue-500/20' : 'bg-blue-300/40'}`}></div>

        <div className="hero-surface-inner container mx-auto relative z-10 max-w-5xl">
          <Badge className={`glass-pill mb-4 border ${darkMode ? 'border-emerald-800 bg-emerald-900/40 text-emerald-200' : 'border-emerald-200 bg-white/75 text-emerald-700'}`}>
            <Sparkles className="mr-2 h-3.5 w-3.5" />
            {language === 'hi' ? 'स्पष्ट संपर्क, मजबूत भरोसा' : 'Clear contact, stronger trust'}
          </Badge>
          <h1 className={`max-w-3xl text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {language === 'hi' ? 'हमसे जुड़ना अब ज्यादा आसान और भरोसेमंद' : 'Connecting with us is now faster and more reassuring'}
          </h1>
          <p className={`mt-4 sm:mt-5 md:mt-6 max-w-2xl text-xs sm:text-sm md:text-base lg:text-lg leading-6 md:leading-7 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            {language === 'hi'
              ? 'कॉल, WhatsApp, enquiry form, diagnostics support और location guidance को अब ज्यादा साफ, तेज और patient-friendly flow में रखा गया है।'
              : 'Calls, WhatsApp, enquiry form, diagnostics support, and location guidance are now arranged in a cleaner, more patient-friendly flow.'}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 md:gap-3.5">
            {quickCards.map((card) => {
              const Icon = card.icon;
              return (
                <button
                  key={card.title}
                  onClick={card.action}
                  className={`premium-card rounded-2xl border p-2 sm:p-3 md:p-4 text-left ${card.className}`}
                >
                  <div className={`mb-2 sm:mb-3 inline-flex rounded-2xl p-2 sm:p-2.5 md:p-3 ${card.iconClass}`}>
                    <Icon className="h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                  </div>
                  <div className={`text-xs sm:text-sm md:text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{card.title}</div>
                  <div className={`mt-1 text-[10px] sm:text-xs md:text-xs leading-5 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{card.subtitle}</div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className={`px-3 py-8 sm:px-4 sm:py-10 md:px-5 md:py-14 ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="container mx-auto max-w-6xl grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <div className="premium-card rounded-xl sm:rounded-2xl lg:rounded-[2rem] p-3 sm:p-4 md:p-5">
              <div className={`rounded-lg sm:rounded-xl md:rounded-[1.6rem] border px-3 sm:px-4 md:px-5 lg:px-6 py-4 sm:py-5 md:py-6 ${darkMode ? 'border-slate-700 bg-slate-900/70' : 'border-slate-200 bg-white'}`}>
                <div className="mb-3 sm:mb-4 md:mb-5">
                  <Badge className={`text-xs sm:text-sm ${darkMode ? 'bg-blue-900/40 text-blue-200' : 'bg-blue-100 text-blue-700'}`}>
                    {language === 'hi' ? 'मैसेज भेजें' : 'Send a message'}
                  </Badge>
                  <h2 className={`mt-2 sm:mt-3 text-base sm:text-lg md:text-2xl lg:text-3xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {language === 'hi' ? 'स्मार्ट और भरोसेमंद enquiry form' : 'A clear and reliable enquiry form'}
                  </h2>
                  <p className={`mt-1.5 sm:mt-2 text-xs sm:text-sm md:text-sm leading-6 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {language === 'hi'
                      ? 'फॉर्म को बेहतर hierarchy, स्पष्ट status feedback और आसान usability के साथ तैयार किया गया है।'
                      : 'The form now has stronger hierarchy, clearer status feedback, and better usability.'}
                  </p>
                  <div className="mt-3 flex flex-col sm:flex-row flex-wrap gap-2">
                    <div className={`inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold ${darkMode ? 'bg-emerald-500/12 text-emerald-200' : 'bg-emerald-50 text-emerald-700'}`}>
                      <ShieldCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      <span>{language === 'hi' ? 'Secure enquiry' : 'Secure enquiry'}</span>
                    </div>
                    <div className={`inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold ${darkMode ? 'bg-blue-500/12 text-blue-200' : 'bg-blue-50 text-blue-700'}`}>
                      <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      <span>{language === 'hi' ? '24 घंटे के भीतर जवाब' : 'Usually replies within 24 hrs'}</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4" autoComplete="on">
              {submitFeedback.message && (
                  <div className={`rounded-2xl border px-3 py-2.5 sm:px-4 sm:py-3 md:px-4 md:py-3 ${
                    submitFeedback.type === 'success'
                      ? darkMode
                        ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-100'
                        : 'border-emerald-200 bg-emerald-50 text-emerald-900'
                      : darkMode
                        ? 'border-amber-400/30 bg-amber-500/10 text-amber-100'
                        : 'border-amber-200 bg-amber-50 text-amber-900'
                  }`}>
                
                  <div className="flex items-start gap-2 sm:gap-2">
                    {submitFeedback.type === 'success' ? (
                      <CheckCircle2 className="h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0 mt-0.5" />
                    )}
                    <p className="text-xs sm:text-sm md:text-sm font-semibold">{submitFeedback.message}</p>
                  </div>
                </div>
              )}

              <div className="grid gap-2 sm:gap-3 md:gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="name" className={`text-xs sm:text-sm ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{language === 'hi' ? 'नाम' : 'Name'} *</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder={language === 'hi' ? 'आपका नाम' : 'Your full name'} className={formFieldClassName} autoComplete="name" aria-invalid={Boolean(formErrors.name)} required />
                  {formErrors.name ? <p className="mt-1.5 text-xs font-medium text-red-500">{formErrors.name}</p> : null}
                </div>
                <div>
                  <Label htmlFor="phone" className={`text-xs sm:text-sm ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{language === 'hi' ? 'फ़ोन' : 'Phone'} *</Label>
                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder={language === 'hi' ? '10 अंकों का नंबर' : '10 digit number'} maxLength={10} inputMode="numeric" autoComplete="tel-national" className={formFieldClassName} aria-invalid={Boolean(formErrors.phone)} required />
                  {formErrors.phone ? <p className="mt-1.5 text-xs font-medium text-red-500">{formErrors.phone}</p> : null}
                </div>
              </div>

              <div className="grid gap-2 sm:gap-3 md:gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="email" className={`text-xs sm:text-sm ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>Email</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="you@example.com" autoComplete="email" className={formFieldClassName} aria-invalid={Boolean(formErrors.email)} />
                  {formErrors.email ? <p className="mt-1.5 text-xs font-medium text-red-500">{formErrors.email}</p> : null}
                </div>
                <div>
                  <Label htmlFor="subject" className={`text-xs sm:text-sm ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{language === 'hi' ? 'विषय' : 'Subject'}</Label>
                  <Input id="subject" name="subject" value={formData.subject} onChange={handleInputChange} placeholder={language === 'hi' ? 'उदाहरण: Appointment / Test / Enquiry' : 'Example: Appointment / Test / Enquiry'} autoComplete="off" className={formFieldClassName} />
                </div>
              </div>

              <div>
                <Label htmlFor="message" className={`text-xs sm:text-sm ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{language === 'hi' ? 'मैसेज' : 'Message'} *</Label>
                <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} rows={4} placeholder={language === 'hi' ? 'अपनी जरूरत या सवाल यहां लिखें...' : 'Describe your need or question here...'} autoComplete="off" className={formTextAreaClassName} aria-invalid={Boolean(formErrors.message)} required />
                {formErrors.message ? <p className="mt-1.5 text-xs font-medium text-red-500">{formErrors.message}</p> : null}
              </div>

              <div className="flex flex-col gap-2 sm:gap-3 sm:flex-row">
                <Button type="submit" className="flex-1 bg-gradient-to-r from-emerald-600 to-blue-600 py-3 sm:py-4 md:py-5 text-white hover:from-emerald-700 hover:to-blue-700 text-xs sm:text-sm md:text-base" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                  ) : (
                    <>
                      <Send className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      {t.sendMessage}
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={handleWhatsApp} className={`text-xs sm:text-sm md:text-base ${darkMode ? 'border-green-600/40 bg-slate-900 text-green-300 hover:bg-slate-800' : 'border-green-300 bg-white text-green-700 hover:bg-green-50'}`}>
                  <MessageCircle className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  WhatsApp
                </Button>
              </div>
                </form>
              </div>
            </div>

            <Card className="premium-card rounded-xl sm:rounded-2xl lg:rounded-[2rem]">
              <CardContent className="p-3 sm:p-4 md:p-5 lg:p-6">
                <div className={`rounded-lg sm:rounded-xl md:rounded-[1.6rem] border px-3 sm:px-4 md:px-5 py-3 sm:py-4 md:py-5 ${darkMode ? 'border-slate-700 bg-slate-900/70 text-white' : 'border-slate-200 bg-white text-slate-900'}`}>
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-4">
                    <div>
                      <p className={`text-xs sm:text-sm font-semibold ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                        {language === 'hi' ? 'Response promise' : 'Response promise'}
                      </p>
                      <h2 className="mt-2 text-sm sm:text-base md:text-xl lg:text-2xl font-black">
                        {language === 'hi' ? 'फॉर्म के बाद अगला कदम भी साफ' : 'A clearer next step after the form'}
                      </h2>
                    </div>
                    <div className={`rounded-lg sm:rounded-xl md:rounded-2xl px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-semibold flex-shrink-0 ${darkMode ? 'bg-blue-500/15 text-blue-200' : 'bg-blue-100 text-blue-700'}`}>
                      24 hrs
                    </div>
                  </div>

                  <div className="mt-5 space-y-2 sm:space-y-3 md:space-y-4">
                    {responseSteps.map((step) => {
                      const Icon = step.icon;
                      return (
                        <div key={step.title} className={`hover-accent-row rounded-lg sm:rounded-xl border px-3 sm:px-4 py-3 sm:py-4 ${darkMode ? 'border-slate-700 bg-slate-950/70' : 'border-slate-200 bg-slate-50'}`}>
                          <div className="flex items-start gap-2 sm:gap-3">
                            <div className={`rounded-lg sm:rounded-xl p-2 sm:p-3 flex-shrink-0 ${darkMode ? 'bg-emerald-500/15 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}`}>
                              <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </div>
                            <div className="min-w-0">
                              <p className={`text-xs sm:text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{step.title}</p>
                              <p className={`mt-1 text-xs sm:text-sm leading-6 sm:leading-7 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{step.text}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card rounded-xl sm:rounded-2xl lg:rounded-[2rem]">
              <CardContent className="p-3 sm:p-4 md:p-5 lg:p-6">
                <Badge className={`text-xs sm:text-sm ${darkMode ? 'bg-teal-900/40 text-teal-200' : 'bg-teal-100 text-teal-700'}`}>
                  {language === 'hi' ? 'डायग्नोस्टिक सपोर्ट' : 'Diagnostic support'}
                </Badge>
                <h3 className={`mt-2 sm:mt-3 text-base sm:text-lg md:text-xl lg:text-2xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {language === 'hi' ? 'रिलैक्स डायग्नोस्टिक्स' : diagnosticsInfo.name}
                </h3>
                <p className={`mt-1 sm:mt-2 text-xs sm:text-sm leading-6 sm:leading-7 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {language === 'hi'
                    ? 'डायग्नोस्टिक enquiry को अब फॉर्म के नीचे रखा गया है ताकि flow ज्यादा natural, compact और premium लगे।'
                    : 'Diagnostics details now sit right below the form so the enquiry flow feels more natural, compact, and premium.'}
                </p>

                <div className="mt-5 space-y-2 sm:space-y-3">
                  {diagnosticsDetails.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className={`hover-accent-row rounded-lg sm:rounded-xl border px-3 sm:px-4 py-3 sm:py-4 ${darkMode ? 'border-slate-700 bg-slate-950/70' : 'border-slate-200 bg-slate-50'}`}>
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className={`rounded-lg sm:rounded-xl p-2 sm:p-3 flex-shrink-0 ${darkMode ? 'bg-teal-500/15 text-teal-300' : 'bg-teal-100 text-teal-600'}`}>
                            <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`allow-copy break-words text-xs sm:text-sm leading-6 sm:leading-7 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{item.label}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopy(item.copyValue, item.copyLabel)}
                            className={`rounded-full p-1.5 sm:p-2 flex-shrink-0 ${darkMode ? 'bg-slate-900 text-slate-200 hover:bg-slate-800' : 'bg-white text-slate-700 hover:bg-slate-100'}`}
                            aria-label={`Copy ${item.copyLabel}`}
                          >
                            <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 sm:mt-5 flex flex-col gap-2 sm:gap-3 sm:flex-row">
                  <Button type="button" onClick={() => window.location.href = `tel:${diagnosticsInfo.phone}`} className="text-xs sm:text-sm bg-gradient-to-r from-teal-600 to-blue-600 text-white hover:from-teal-700 hover:to-blue-700 py-2.5 sm:py-3">
                    <Phone className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    {language === 'hi' ? 'डायग्नोस्टिक्स कॉल' : 'Call diagnostics'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => window.open(diagnosticsInfo.googleMapsLink, '_blank')} className={`text-xs sm:text-sm py-2.5 sm:py-3 ${darkMode ? 'border-teal-600/40 bg-slate-900 text-teal-300 hover:bg-slate-800' : 'border-teal-300 bg-white text-teal-700 hover:bg-teal-50'}`}>
                    <MapPin className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    {language === 'hi' ? 'लोकेशन देखें' : 'View location'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-5">
            <Card className="premium-card rounded-xl sm:rounded-2xl lg:rounded-[2rem]">
              <CardContent className="p-3 sm:p-4 md:p-5 lg:p-6">
                <Badge className={`text-xs sm:text-sm ${darkMode ? 'bg-emerald-900/40 text-emerald-200' : 'bg-emerald-100 text-emerald-700'}`}>
                  {language === 'hi' ? 'मुख्य संपर्क' : 'Primary contact'}
                </Badge>
                <h3 className={`mt-2 sm:mt-3 text-base sm:text-lg md:text-xl lg:text-2xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {language === 'hi' ? 'राजरानी हॉस्पिटल' : hospitalInfo.name}
                </h3>

                <div className="mt-5 space-y-2 sm:space-y-3">
                  {hospitalDetails.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className={`hover-accent-row rounded-lg sm:rounded-xl border px-3 sm:px-4 py-3 sm:py-4 ${darkMode ? 'border-slate-700 bg-slate-950/70' : 'border-slate-200 bg-slate-50'}`}>
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className={`rounded-lg sm:rounded-xl p-2 sm:p-3 flex-shrink-0 ${darkMode ? 'bg-blue-500/15 text-blue-300' : 'bg-blue-100 text-blue-600'}`}>
                            <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`allow-copy break-words text-xs sm:text-sm leading-6 sm:leading-7 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{item.label}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopy(item.copyValue, item.copyLabel)}
                            className={`rounded-full p-1.5 sm:p-2 flex-shrink-0 ${darkMode ? 'bg-slate-900 text-slate-200 hover:bg-slate-800' : 'bg-white text-slate-700 hover:bg-slate-100'}`}
                            aria-label={`Copy ${item.copyLabel}`}
                          >
                            <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <a href={hospitalInfo.googleMapsLink} target="_blank" rel="noopener noreferrer" className={`mt-4 sm:mt-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold ${darkMode ? 'border-blue-500/20 text-blue-300 hover:bg-slate-900' : 'border-blue-200 text-blue-700 hover:bg-blue-50'}`}>
                  <Navigation className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  {t.getDirections}
                  <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </a>
              </CardContent>
            </Card>

            <Card className="premium-card rounded-xl sm:rounded-2xl lg:rounded-[2rem]">
              <CardContent className="p-3 sm:p-4 md:p-5 lg:p-6">
                <Badge className={`text-xs sm:text-sm ${darkMode ? 'bg-blue-900/40 text-blue-200' : 'bg-blue-100 text-blue-700'}`}>
                  FAQ
                </Badge>
                <h2 className={`mt-2 sm:mt-3 text-base sm:text-lg md:text-2xl lg:text-3xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {language === 'hi' ? 'अक्सर पूछे जाने वाले सवाल' : 'Frequently asked questions'}
                </h2>
                <p className={`mt-1 sm:mt-2 text-xs sm:text-sm leading-6 sm:leading-7 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {language === 'hi'
                    ? 'मरीजों और परिवारों के सामान्य सवालों के साफ और भरोसेमंद जवाब यहां मिलते हैं।'
                    : 'Clear answers for common patient and family questions, in an easy-to-scan format.'}
                </p>
                <div className="mt-4 sm:mt-5 space-y-2 sm:space-y-3">
                  {faqList.map((faq, index) => (
                    <div key={faq.q} className={`rounded-lg sm:rounded-xl border ${darkMode ? 'border-slate-700 bg-slate-950/70' : 'border-slate-200 bg-white'}`}>
                      <button
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        className={`flex w-full items-center justify-between gap-2 sm:gap-3 px-3 sm:px-4 py-3 sm:py-4 text-left ${darkMode ? 'text-white' : 'text-slate-900'}`}
                        data-testid={`faq-top-${index}`}
                      >
                        <div className="flex items-start gap-2 sm:gap-3 flex-1">
                          <div className={`rounded-lg sm:rounded-xl p-1.5 sm:p-2 flex-shrink-0 ${darkMode ? 'bg-blue-500/15 text-blue-300' : 'bg-blue-100 text-blue-600'}`}>
                            <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                          </div>
                          <span className="text-xs sm:text-sm font-semibold">{language === 'hi' ? faq.qHindi : faq.q}</span>
                        </div>
                        <ChevronDown className={`h-4 w-4 flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                      </button>
                      {openFaq === index && (
                        <div className="px-3 sm:px-4 pb-3 sm:pb-4 pl-[3rem] sm:pl-[4.25rem]">
                          <p className={`text-xs sm:text-sm leading-6 sm:leading-7 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                            {language === 'hi' ? faq.aHindi : faq.a}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-[2rem]">
              <CardContent className="p-0">
                <div className="relative h-[10rem] w-full sm:h-[11rem] md:h-[12rem]">
                  <iframe
                    src="https://maps.google.com/maps?q=RAJRANI+HOSPITAL+Old+Kondli+Delhi+110096&t=&z=17&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Rajrani Hospital Location"
                  />
                </div>
                <div className={`flex flex-col items-start justify-between gap-2 sm:gap-3 px-3 py-3 sm:flex-row sm:items-center sm:px-4 md:px-5 md:py-4 ${darkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold">{language === 'hi' ? 'लोकेशन प्रीव्यू' : 'Location preview'}</p>
                    <p className={`text-[10px] sm:text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      {language === 'hi' ? 'FAQ और संपर्क के साथ compact मैप व्यू' : 'A compact map view placed with contact and FAQ details'}
                    </p>
                  </div>
                  <a href={hospitalInfo.googleMapsLink} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 text-sm font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                    <MapPin className="h-4 w-4" />
                    Google Maps
                  </a>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      
    </div>
  );
};

export default ContactPage;
