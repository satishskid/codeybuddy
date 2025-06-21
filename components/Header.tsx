import React from 'react';
import { LogoIcon, MapIcon, AwardIcon } from './icons'; // Added AwardIcon
import type { UserPersona } from '../types';

interface HeaderProps {
  onOpenCourseOutline: () => void;
  persona: UserPersona | null;
  totalPoints: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCourseOutline, persona, totalPoints }) => {
  const pathButtonText = persona === 'kid' ? "My Blocks Map" : "Learning Path";
  return (
    <header className="w-full max-w-4xl py-6 mb-6 text-center relative">
      <div className="flex items-center justify-center space-x-3">
        <LogoIcon className="w-10 h-10 sm:w-12 sm:h-12 text-[rgb(var(--color-icon-logo-rgb))]" />
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-[rgb(var(--color-header-gradient-from-rgb))] via-[rgb(var(--color-header-gradient-via-rgb))] to-[rgb(var(--color-header-gradient-to-rgb))] text-transparent bg-clip-text">
          Coding Coach AI
        </h1>
      </div>
      <p className="mt-2 text-md sm:text-lg text-[rgb(var(--color-text-secondary-rgb))]">Your personal guide to the world of programming!</p>
      
      <div className="absolute top-1/2 -translate-y-1/2 right-0 mt-1 flex items-center space-x-2">
        <button
          onClick={onOpenCourseOutline}
          className="flex items-center bg-[rgb(var(--color-bg-tertiary-rgb))] hover:bg-[rgba(var(--color-bg-tertiary-alpha-rgb),0.8)] text-[rgb(var(--color-text-primary-rgb))] font-medium py-2 px-3 sm:px-4 rounded-md transition-colors duration-150 text-xs sm:text-sm shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-accent-primary-rgb))] focus:ring-opacity-50"
          aria-label="Open Learning Path"
        >
          <MapIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" />
          {pathButtonText}
        </button>
      </div>
       <div className="absolute top-1/2 -translate-y-1/2 left-0 mt-1 flex items-center bg-[rgb(var(--color-bg-tertiary-rgb))] text-[rgb(var(--color-text-primary-rgb))] font-medium py-2 px-3 sm:px-4 rounded-md text-xs sm:text-sm shadow-sm">
          <AwardIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 text-[rgb(var(--color-accent-tertiary-rgb))]" />
          Points: {totalPoints}
        </div>
    </header>
  );
};
