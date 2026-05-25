import React from 'react';

const HospitalLogo = ({ size = 'md', className = '' }) => {
  const uniqueId = React.useId().replace(/:/g, '');
  const topArcId = `rajrani-top-${uniqueId}`;
  const bottomArcId = `rajrani-bottom-${uniqueId}`;
  const sizes = {
    sm: 'h-9 w-9',
    md: 'h-11 w-11',
    lg: 'h-14 w-14',
    xl: 'h-16 w-16'
  };

  return (
    <div className={`${sizes[size]} ${className} shrink-0`}>
      <svg viewBox="0 0 120 120" fill="none" className="h-full w-full drop-shadow-[0_12px_24px_rgba(15,23,42,0.14)]">
        <defs>
          <path id={topArcId} d="M16 60a44 44 0 1 1 88 0" />
          <path id={bottomArcId} d="M104 60a44 44 0 1 1-88 0" />
          <radialGradient id={`outerGlow-${uniqueId}`} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(60 28) rotate(90) scale(72)">
            <stop stopColor="#4f6f9d" stopOpacity="0.14" />
            <stop offset="1" stopColor="#4f6f9d" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="60" cy="60" r="57" fill={`url(#outerGlow-${uniqueId})`} />
        <circle cx="60" cy="60" r="52" fill="#30486d" />
        <circle cx="60" cy="60" r="49.2" stroke="#d7d4c8" strokeWidth="2.2" />
        <circle cx="60" cy="60" r="36.6" fill="#fbf8f1" stroke="#dfe6eb" strokeWidth="1.6" />
        <circle cx="60" cy="60" r="29.8" fill="#eef7f5" stroke="#c6d4da" strokeWidth="1.6" />

        <text fill="#ffffff" fontFamily="'Times New Roman', Georgia, serif" fontSize="8.35" fontWeight="700" letterSpacing="1.95">
          <textPath href={`#${topArcId}`} startOffset="50%" textAnchor="middle">
            RAJ RANI HOSPITAL
          </textPath>
        </text>
        <text fill="#ffffff" fontFamily="'Times New Roman', Georgia, serif" fontSize="7.85" fontStyle="italic" letterSpacing="1.15">
          <textPath href={`#${bottomArcId}`} startOffset="50%" textAnchor="middle">
            Cure with Care
          </textPath>
        </text>

        <path
          d="M53.5 42.4h13a4.8 4.8 0 0 1 4.8 4.8v5.4h5.4a4.8 4.8 0 0 1 4.8 4.8v5.2a4.8 4.8 0 0 1-4.8 4.8h-5.4v5.4a4.8 4.8 0 0 1-4.8 4.8h-13a4.8 4.8 0 0 1-4.8-4.8v-5.4h-5.4a4.8 4.8 0 0 1-4.8-4.8v-5.2a4.8 4.8 0 0 1 4.8-4.8h5.4v-5.4a4.8 4.8 0 0 1 4.8-4.8Z"
          fill="#fdfaf3"
          stroke="#9d7369"
          strokeWidth="2.1"
          strokeLinejoin="round"
        />
        <path d="M56.8 47.2h6.4v9.9h9.9v5.8h-9.9v9.9h-6.4v-9.9h-9.9v-5.8h9.9v-9.9Z" fill="#ffffff" />
        <circle cx="60" cy="54.1" r="2.35" fill="#2f7a9f" />
        <path d="M56.9 58.2c0-1.7 1.4-3 3.1-3s3.1 1.3 3.1 3v7.6c0 1.7-1.4 3-3.1 3s-3.1-1.3-3.1-3v-7.6Z" fill="#2f7a9f" />
        <path d="M58.1 60.3h3.8" stroke="#2f7a9f" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="54.3" cy="59.4" r="1.95" fill="#56774b" />
        <path d="M52.3 62.2c0-1 .9-1.9 2-1.9s2 .9 2 1.9v4.7c0 1.1-.9 2-2 2s-2-.9-2-2v-4.7Z" fill="#56774b" />
        <path d="M52.8 63.8h2.9" stroke="#56774b" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="65.7" cy="59.4" r="1.95" fill="#b55e4f" />
        <path d="M63.7 62.2c0-1 .9-1.9 2-1.9s2 .9 2 1.9v4.7c0 1.1-.9 2-2 2s-2-.9-2-2v-4.7Z" fill="#b55e4f" />
        <path d="M64.2 63.8h2.9" stroke="#b55e4f" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M54.4 68.2c1.5 1.1 3.4 1.7 5.6 1.7 2.3 0 4.2-.6 5.6-1.7" stroke="#5a6d6f" strokeWidth="1.25" strokeLinecap="round" />
        <circle cx="60" cy="60" r="17.9" stroke="#d4dfdf" strokeWidth="0.85" opacity="0.82" />
      </svg>
    </div>
  );
};

export default HospitalLogo;
