import React from 'react';

const CareSealBadge = ({ className = '' }) => {
  const uniqueId = React.useId().replace(/:/g, '');
  const topEdgeId = `care-top-${uniqueId}`;
  const rightEdgeId = `care-right-${uniqueId}`;
  const bottomEdgeId = `care-bottom-${uniqueId}`;
  const gradientId = `care-bg-${uniqueId}`;
  const innerGradientId = `care-inner-${uniqueId}`;

  return (
    <div className={`w-24 sm:w-28 ${className}`}>
      <svg viewBox="0 0 140 150" fill="none" className="h-full w-full drop-shadow-[0_18px_30px_rgba(15,23,42,0.24)]">
        <defs>
          <linearGradient id={gradientId} x1="16" y1="75" x2="126" y2="75" gradientUnits="userSpaceOnUse">
            <stop stopColor="#17202a" />
            <stop offset="1" stopColor="#2e3843" />
          </linearGradient>
          <linearGradient id={innerGradientId} x1="34" y1="75" x2="110" y2="75" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" />
            <stop offset="1" stopColor="#f6f4ee" />
          </linearGradient>
          <path id={topEdgeId} d="M20 75 L118 20" />
          <path id={rightEdgeId} d="M118 24 L118 126" />
          <path id={bottomEdgeId} d="M20 75 L118 130" />
        </defs>

        <path d="M14 75L126 12V138L14 75Z" fill={`url(#${gradientId})`} stroke="#ccb06a" strokeWidth="2.4" />
        <path d="M31 75L109 29V121L31 75Z" fill={`url(#${innerGradientId})`} stroke="#d2bc83" strokeWidth="1.4" />
        <path d="M23 75L116 22" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
        <path d="M23 75L116 128" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />

        <text fill="#ffffff" fontFamily="'Times New Roman', Georgia, serif" fontSize="7.25" fontWeight="700" letterSpacing="1.6">
          <textPath href={`#${topEdgeId}`} startOffset="52%" textAnchor="middle">
            QUALITY OF CARE
          </textPath>
        </text>
        <text fill="#ffffff" fontFamily="'Times New Roman', Georgia, serif" fontSize="7.2" fontWeight="700" letterSpacing="1.4">
          <textPath href={`#${rightEdgeId}`} startOffset="50%" textAnchor="middle">
            CERTIFIED
          </textPath>
        </text>
        <text fill="#ffffff" fontFamily="'Times New Roman', Georgia, serif" fontSize="7.2" fontWeight="700" letterSpacing="1.55">
          <textPath href={`#${bottomEdgeId}`} startOffset="52%" textAnchor="middle">
            PATIENT SAFETY
          </textPath>
        </text>

        <circle cx="77" cy="75" r="21.5" fill="#ffffff" stroke="#29456e" strokeWidth="2.5" />
        <circle cx="77" cy="75" r="17.2" fill="#f8fbff" stroke="#d8e1ed" strokeWidth="1.2" />
        <path
          d="M66.4 63.4c4.9-5.2 12.8-6.9 19.3-3.7-3.7 1.1-6.6 2.8-9.4 6-2.9 3.2-4.9 7.4-6.8 11.2-1.9 4.1-3.7 8.1-6.8 10.6-4.7-5.6-3.5-15.1 3.7-24.1Z"
          fill="#d94b45"
        />
        <path
          d="M84.8 61.5c5.1 5.6 6.2 13.8 2.7 20.3-1.1-3.8-3-6.5-6.4-9.1-3.4-2.5-7.8-4.2-11.8-5.8-4.2-1.6-8-3.1-10.7-5.8 5.8-5.5 16-5.2 26.2.4Z"
          fill="#3b79c5"
        />
        <rect x="74" y="58.8" width="6.8" height="25.8" rx="2.3" fill="#ae8b4b" />
        <rect x="64.2" y="68.4" width="25.8" height="6.8" rx="2.3" fill="#ae8b4b" />
        <circle cx="68.4" cy="71.8" r="2.2" fill="#4c7648" />
        <circle cx="77" cy="63.2" r="2.2" fill="#4c7648" />
        <circle cx="85.6" cy="71.8" r="2.2" fill="#4c7648" />
        <circle cx="77" cy="80.4" r="2.2" fill="#4c7648" />
        <rect x="71.8" y="86.2" width="10.4" height="5.8" rx="1.8" fill="#224878" />
        <text x="77" y="90.5" fill="#ffffff" fontFamily="Arial, sans-serif" fontSize="3.4" fontWeight="700" textAnchor="middle">
          RRH
        </text>
      </svg>
    </div>
  );
};

export default CareSealBadge;
