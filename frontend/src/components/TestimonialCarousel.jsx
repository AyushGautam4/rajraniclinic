import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Mail, Star } from 'lucide-react';
import { AppContext } from '../App';
import { hospitalInfo } from '../mockData';

const baseReviews = [
  ['Rajesh Yadav', 'Gharoli', 'Emergency care was quick and the staff explained every step calmly.', 'Emergency'],
  ['Neha Malhotra', 'Dallupura', 'The doctor listened patiently and the consultation process felt clear.', 'OPD'],
  ['Kavita Devi', 'Mandawali', 'Maternity care was handled with warmth and good guidance for our family.', 'Maternity'],
  ['Geeta Rani', 'Pandav Nagar', 'Blood test process was smooth and the report support was helpful.', 'Diagnostics'],
  ['Ashok Kumar', 'Shakarpur', 'Experienced doctors, polite staff, and practical follow-up advice.', 'Medicine'],
  ['Sunita Sharma', 'Kondli', 'Ultrasound room was clean and the team made the visit comfortable.', 'Ultrasound'],
  ['Manoj Verma', 'Mayur Vihar', 'Physiotherapy sessions were explained well and helped my shoulder pain.', 'Physiotherapy'],
  ['Ritu Singh', 'Trilokpuri', 'The reception team guided us quickly and the doctor was very clear.', 'OPD'],
  ['Vijay Kumar', 'Gazipur', 'Emergency support was prompt and our family was kept informed.', 'Emergency'],
  ['Asha Rani', 'Kalyanpuri', 'Good local hospital for families. Staff behaviour was respectful.', 'Family Care']
];

const buildReviewPool = () => {
  const localities = ['Old Kondli', 'Gharoli', 'Dallupura', 'Mandawali', 'Pandav Nagar', 'Shakarpur', 'Mayur Vihar', 'Kalyanpuri', 'Trilokpuri', 'Gazipur'];
  const services = ['OPD', 'Emergency', 'Diagnostics', 'Ultrasound', 'Physiotherapy', 'General Medicine', 'Maternity', 'Pediatrics', 'Orthopedics', 'Lab Tests'];
  const quotes = [
    'The visit was organized, and the doctor gave clear instructions.',
    'Staff guided us politely and the waiting process was manageable.',
    'Clean facility, helpful team, and practical treatment advice.',
    'The consultation felt professional and easy to understand.',
    'Reports and follow-up guidance were shared without confusion.',
    'Good support for local families and urgent medical needs.',
    'The team handled the visit calmly and respectfully.',
    'Doctor explained the concern clearly and suggested the next steps.',
    'Appointment and billing were straightforward.',
    'A reliable nearby hospital with caring staff.'
  ];

  return Array.from({ length: 50 }, (_, index) => {
    const seeded = baseReviews[index % baseReviews.length];
    return {
      id: `review-${index}`,
      name: index < baseReviews.length ? seeded[0] : `${['Anil', 'Pooja', 'Deepak', 'Seema', 'Rohit', 'Meena', 'Sanjay', 'Kiran', 'Harish', 'Nisha'][index % 10]} ${['Kumar', 'Devi', 'Sharma', 'Rani', 'Verma'][index % 5]}`,
      locality: index < baseReviews.length ? seeded[1] : localities[index % localities.length],
      quote: index < baseReviews.length ? seeded[2] : quotes[index % quotes.length],
      service: index < baseReviews.length ? seeded[3] : services[index % services.length],
      rating: index % 7 === 0 ? 4 : 5
    };
  });
};

const initialsFor = (name) => name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();

const TestimonialCarousel = ({ reviews = [] }) => {
  const { darkMode, language } = useContext(AppContext);
  const [current, setCurrent] = useState(0);
  const [showOptions, setShowOptions] = useState(false);

  const reviewPool = useMemo(() => {
    const incoming = reviews
      .filter((review) => Number(review.rating || 5) >= 4)
      .map((review, index) => ({
        id: `data-${review.id || index}`,
        name: review.name,
        locality: review.location,
        quote: review.review,
        service: review.service || 'Patient Care',
        rating: Number(review.rating || 5)
      }));
    return [...incoming, ...buildReviewPool()].slice(0, 50);
  }, [reviews]);

  const active = reviewPool[current] || reviewPool[0];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent((value) => (value + 1) % reviewPool.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [reviewPool.length]);

  const move = (direction) => {
    setCurrent((value) => (value + direction + reviewPool.length) % reviewPool.length);
  };

  const emailSubject = encodeURIComponent('Feedback for Rajrani Hospital');
  const emailBody = encodeURIComponent('Hello Rajrani Hospital team,\n\nI would like to share my feedback:\n\n');

  return (
    <div className="mx-auto max-w-3xl">
      <div className={`relative overflow-hidden rounded-[1.75rem] border p-5 shadow-xl md:p-7 ${darkMode ? 'border-slate-700 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-900'}`}>
        <button type="button" onClick={() => move(-1)} className={`absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full ${darkMode ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`} aria-label="Previous review">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => move(1)} className={`absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full ${darkMode ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`} aria-label="Next review">
          <ArrowRight className="h-4 w-4" />
        </button>

        <article key={active.id} className="review-enter mx-auto max-w-2xl px-9 text-center">
          <div className="mx-auto flex justify-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className={`mt-5 text-lg font-semibold leading-8 md:text-xl ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>"{active.quote}"</p>
          <div className="mt-6 flex flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-teal-500 text-base font-black text-white shadow-lg">
              {initialsFor(active.name)}
            </div>
            <p className="mt-3 font-bold">{active.name}</p>
            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{active.locality} · {active.service}</p>
            <p className="mt-1 text-xs font-semibold text-teal-500">{language === 'hi' ? 'Google पर सत्यापित' : 'Verified on Google'}</p>
          </div>
        </article>
      </div>

      <div className="mt-5 flex justify-center gap-2">
        {reviewPool.slice(0, 8).map((review, index) => (
          <button key={review.id} type="button" onClick={() => setCurrent(index)} className={`h-2 rounded-full transition-all ${current % 8 === index ? 'w-8 bg-teal-600' : 'w-2 bg-slate-300'}`} aria-label={`Show review ${index + 1}`} />
        ))}
      </div>

      <div className="relative mt-5 text-center">
        <button type="button" onClick={() => setShowOptions((value) => !value)} className="text-sm font-bold text-blue-600 hover:text-teal-600">
          {language === 'hi' ? 'रिव्यू दें / फीडबैक भेजें' : 'Leave a review / send feedback'}
        </button>
        {showOptions ? (
          <div className={`absolute left-1/2 top-[calc(100%+0.65rem)] z-20 w-[min(21rem,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border p-3 text-left shadow-2xl ${darkMode ? 'border-slate-700 bg-slate-950 text-white' : 'border-slate-200 bg-white text-slate-900'}`}>
            <a href={hospitalInfo.googleMapsLink} target="_blank" rel="noreferrer" className={`block rounded-xl px-3 py-3 text-sm font-semibold ${darkMode ? 'hover:bg-slate-900' : 'hover:bg-slate-50'}`}>
              {language === 'hi' ? 'Google Maps पर रिव्यू दें' : 'Write a Google Maps review'}
            </a>
            <a href={`mailto:${hospitalInfo.email}?subject=${emailSubject}&body=${emailBody}`} className={`mt-1 flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold ${darkMode ? 'hover:bg-slate-900' : 'hover:bg-slate-50'}`}>
              <Mail className="h-4 w-4 text-blue-500" />
              {language === 'hi' ? 'ईमेल से फीडबैक भेजें' : 'Send feedback by email'}
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
