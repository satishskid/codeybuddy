import React from 'react';

// For icons that should generally match the text color or a specific theme color passed via className
// use `currentColor` for stroke/fill if they are meant to inherit color.
// For icons that have fixed colors (like the logo's specific gradient or multi-color parts),
// those should be explicitly set or use CSS variables if they need to theme.

export const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  // This icon's color is set by className text-[rgb(var(--color-icon-logo-rgb))] in Header.tsx
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

export const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

export const ArrowRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

export const ThumbsUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  // Color set by className text-[rgb(var(--color-icon-thumbsup-rgb))] in App.tsx
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00-.422-4.57C11.58 0 9.507 0 7.5 2.25c-2.007 2.25-2.007 5.25 0 7.5c.002.002.002.002.002.002zM6.75 12a.75.75 0 00-.75.75v6c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-6a.75.75 0 00-.75-.75H6.75z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 6.75L11.25 12h9.75L19.5 6.75M12.75 6.75A2.25 2.25 0 0115 4.5h.085a2.25 2.25 0 012.25 2.25v7.5" />
 </svg>
);

export const LightBulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  // Color set by className text-[rgb(var(--color-icon-lightbulb-rgb))] in ConceptDisplay.tsx
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3 .378A6.011 6.011 0 0112 12.75c-1.628 0-3.14.651-4.242 1.758M12 12.75c1.628 0 3.14-.651 4.242-1.758m0 0a6.002 6.002 0 00-4.242-4.242m4.242 4.242a6.002 6.002 0 014.242 4.242M4.5 15.75A6.011 6.011 0 017.758 12c1.628 0 3.14.651 4.242 1.758m0 0V6.105a3.375 3.375 0 00-3.375-3.375H9.375a3.375 3.375 0 00-3.375 3.375v6.645" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a.75.75 0 01-.75-.75V18a.75.75 0 011.5 0v2.25A.75.75 0 0112 21z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 21a.75.75 0 01-.75-.75V18a.75.75 0 011.5 0v2.25A.75.75 0 019 21z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 21a.75.75 0 01-.75-.75V18a.75.75 0 011.5 0v2.25A.75.75 0 0115 21z" />
  </svg>
);

export const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  // Color set by className text-[rgb(var(--color-icon-sparkles-rgb))] in App.tsx
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 7.5l.813 2.846a4.5 4.5 0 012.094 2.094L24 12l-2.846.813a4.5 4.5 0 01-2.094 2.094L18.25 18.75l-.813-2.846a4.5 4.5 0 01-2.094-2.094L12.5 12l2.846-.813a4.5 4.5 0 012.094-2.094L18.25 7.5z" />
  </svg>
);

export const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement> & {isFilled?: boolean; fillOverride?: string}> = ({isFilled, fillOverride, ...props}) => (
  <svg 
    fill={isFilled ? (fillOverride || "currentColor") : "none"} 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke={isFilled && !fillOverride ? "rgb(var(--color-bg-primary-rgb))" : "currentColor" } 
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);


export const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  // Color set by className in WelcomeModal
  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A18.733 18.733 0 0112 22.5c-2.786 0-5.433-.608-7.499-1.682z" />
  </svg>
);

export const BriefcaseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  // Color set by className in WelcomeModal
  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.073a2.25 2.25 0 01-2.25 2.25h-10.5a2.25 2.25 0 01-2.25-2.25V14.15M16.5 18.75h.008v.008h-.008v-.008zm-3 0h.008v.008h-.008v-.008zm-3 0h.008v.008h-.008v-.008zm-3 0h.008v.008h-.008v-.008zM12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
  </svg>
);

export const MapIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m0 0v2.25m0-2.25h1.5m-1.5 0H7.5M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

export const PlayCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.625 3.125A1.125 1.125 0 019 15.125V8.875c0-.87.988-1.406 1.65-.898l5.625 3.124z" clipRule="evenodd" />
  </svg>
);

export const LockClosedIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

export const XMarkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const StarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354l-4.594 2.87c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
  </svg>
);

export const MedalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path fillRule="evenodd" d="M12.75 2.25A.75.75 0 0012 3v1.655A3.004 3.004 0 009.284 3.65L7.94 4.516a.75.75 0 10.72 1.33L9.82 5.22A3 3 0 0012 6.75a3 3 0 002.18-.53l1.16-.626a.75.75 0 00-.72-1.33L13.47 4.88c-.62.332-1.31.503-2.032.503a2.982 2.982 0 00-2.032-.502V3a.75.75 0 00.75-.75zm0 0A.75.75 0 0012 1.5h-.017a.75.75 0 00-.733.75V3a.75.75 0 00.75.75h.017A.75.75 0 0012.75 3V2.25z" clipRule="evenodd" />
    <path fillRule="evenodd" d="M12 21a8.25 8.25 0 100-16.5 8.25 8.25 0 000 16.5zm0-2.25a6 6 0 100-12 6 6 0 000 12zM10.06 15.94a.75.75 0 10-1.06-1.06L7.5 16.38V12a.75.75 0 00-1.5 0v4.5a.75.75 0 001.125.67L10.06 15.94zm4.94-1.06a.75.75 0 00-1.06 1.06L16.5 16.38V12a.75.75 0 00-1.5 0v4.5a.75.75 0 001.125.67L14.94 15.94z" clipRule="evenodd" />
  </svg>
);

export const BrainIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.39m3.421 1.756a15.975 15.975 0 001.739-4.83m0 0a15.975 15.975 0 00-4.83-1.739m4.83 1.739a15.965 15.965 0 00-3.388-1.619m0 0a15.97 15.97 0 00-1.622-3.39m3.746 1.765a15.96 15.96 0 00-3.389-1.618m0 0A15.998 15.998 0 005.83 6.37m0 0a15.96 15.96 0 00-1.74 4.83m0 0a15.998 15.998 0 001.622 3.389m0 0a15.998 15.998 0 003.388 1.621m0 0a15.97 15.97 0 001.739 4.83m0 0a15.965 15.965 0 004.83 1.739m0 0a15.998 15.998 0 003.388-1.621m0 0a15.96 15.96 0 001.74-4.83m0 0a15.998 15.998 0 00-1.622-3.389m-3.421 1.756a15.975 15.975 0 00-1.739-4.83m0 0a15.975 15.975 0 00-4.83-1.739M9.17 11.122a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" />
  </svg>
);

export const TargetIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6c.01.01.02.019.03.029a1.73 1.73 0 012.94-.908c-.097-.182-.222-.35-.371-.517C10.744 7.243 10.377 7 10 7c-.377 0-.744.243-.98.608M15.362 5.214A8.252 8.252 0 0112 21M12 21a8.25 8.25 0 01-5.962-13.952M15.362 5.214C14.062 6.46 12.522 7.5 10.75 7.5c-1.602 0-3.051-.694-4.138-1.74M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const TrophyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path fillRule="evenodd" d="M5.166 2.452a.75.75 0 01.017 1.06l-1.628 1.83A3.003 3.003 0 005.101 8.056a.75.75 0 01-1.006 1.118 4.502 4.502 0 01-1.12-4.048.75.75 0 01.328-.392L4.105 2.47a.75.75 0 011.06.017zM18.834 2.452a.75.75 0 00-.017 1.06l1.628 1.83A3.003 3.003 0 0118.899 8.056a.75.75 0 101.006 1.118 4.502 4.502 0 001.12-4.048.75.75 0 00-.328-.392L19.895 2.47a.75.75 0 00-1.06.017z" clipRule="evenodd" />
    <path fillRule="evenodd" d="M9.75 12.75a.75.75 0 00-1.5 0v5.25H6a.75.75 0 000 1.5h12a.75.75 0 000-1.5h-2.25v-5.25a.75.75 0 00-1.5 0v4.5h-3V12.75zM12 1.5a4.5 4.5 0 00-4.5 4.5v1.5a.75.75 0 00.75.75h7.5a.75.75 0 00.75-.75V6a4.5 4.5 0 00-4.5-4.5zM10.5 6a1.5 1.5 0 113 0V7.5h-3V6z" clipRule="evenodd" />
  </svg>
);

export const AwardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( // Generic "Award/Points" Icon
  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-4.5A3.375 3.375 0 0012.375 7.5H11.625A3.375 3.375 0 008.25 10.875v4.5m0 3.75V21m6-3.75V21m0-3.75H15m-6 3.75H9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 11.25a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" />
  </svg>
);
