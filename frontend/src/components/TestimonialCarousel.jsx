import React, { useContext, useMemo, useState } from 'react';
import { Mail, Star } from 'lucide-react';
import { AppContext } from '../App';
import { hospitalInfo } from '../mockData';
import FlipCardCarousel from './FlipCardCarousel';

const initialsFor = (name) => name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();

const ReviewCard = ({ review, darkMode, language }) => (
  <div className={`review-enter mx-auto max-w-3xl rounded-[1.75rem] border p-6 text-center shadow-xl md:p-8 ${darkMode ? 'border-slate-700 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-900'}`}>
    <div className="mx-auto flex justify-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className={`h-5 w-5 ${index < review.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-slate-200 text-slate-200'}`} />
      ))}
    </div>
    <p className={`mx-auto mt-5 max-w-2xl text-lg font-semibold leading-8 md:text-xl ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>&quot;{review.quote}&quot;</p>
    <div className="mt-6 flex flex-col items-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-teal-500 text-base font-black text-white shadow-lg">
        {initialsFor(review.name)}
      </div>
      <p className="mt-3 font-bold">{review.name}</p>
      <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{review.locality} · {review.service}</p>
      <p className="mt-1 text-xs font-semibold text-teal-500">{language === 'hi' ? 'Google पर सत्यापित' : 'Verified on Google'}</p>
    </div>
  </div>
);

const TestimonialCarousel = ({ reviews = [] }) => {
  const { darkMode, language } = useContext(AppContext);
  const [showOptions, setShowOptions] = useState(false);

  const reviewPool = useMemo(() => {
    return reviews
      .filter((review) => Number(review.rating || 5) >= 4)
      .slice(0, 16)
      .map((review, index) => ({
        id: `review-${review.id || index}`,
        name: review.name,
        locality: review.location,
        quote: review.review,
        service: review.service || 'Patient Care',
        rating: Number(review.rating || 5)
      }));
  }, [reviews]);

  const emailSubject = encodeURIComponent('Feedback for Rajrani Hospital');
  const emailBody = encodeURIComponent('Hello Rajrani Hospital team,\n\nI would like to share my feedback:\n\n');

  if (!reviewPool.length) return null;

  return (
    <div className="mx-auto max-w-3xl">
      <FlipCardCarousel
        items={reviewPool}
        getKey={(item) => item.id}
        darkMode={darkMode}
        autoPlay
        renderItem={(review) => <ReviewCard review={review} darkMode={darkMode} language={language} />}
      />

      <div className="relative mt-6 text-center">
        <button type="button" onClick={() => setShowOptions((value) => !value)} className="text-sm font-bold text-blue-600 hover:text-teal-600">
          {language === 'hi' ? 'रिव्यू दें / फीडबैक भेजें' : 'Leave a review / send feedback'}
        </button>
        {showOptions ? (
          <div className={`popover-pop-in absolute left-1/2 top-[calc(100%+0.65rem)] z-20 w-[min(21rem,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border p-3 text-left shadow-2xl ${darkMode ? 'border-slate-700 bg-slate-950 text-white' : 'border-slate-200 bg-white text-slate-900'}`}>
            <a href={hospitalInfo.googleMapsLink} target="_blank" rel="noreferrer" className={`block rounded-xl px-3 py-3 text-sm font-semibold transition-colors ${darkMode ? 'hover:bg-slate-900' : 'hover:bg-slate-50'}`}>
              {language === 'hi' ? 'Google Maps पर रिव्यू दें' : 'Write a Google Maps review'}
            </a>
            <a href={`mailto:${hospitalInfo.email}?subject=${emailSubject}&body=${emailBody}`} className={`mt-1 flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition-colors ${darkMode ? 'hover:bg-slate-900' : 'hover:bg-slate-50'}`}>
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