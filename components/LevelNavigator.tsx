import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from './icons';
import type { UserPersona } from '../types';

interface LevelNavigatorProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  isNextDisabled?: boolean;
  persona: UserPersona | null;
}

export const LevelNavigator: React.FC<LevelNavigatorProps> = ({ onPrevious, onNext, canGoPrevious, canGoNext, isNextDisabled, persona }) => {
  const keepGoingText = persona === 'kid' ? "Awesome Job! Keep Going!" : "Excellent Progress! Continue";
  const nextLevelText = persona === 'kid' ? "Next Block!" : "Next Concept";
  const previousLevelText = persona === 'kid' ? "Prev Block" : "Prev Concept";
  
  return (
    <div className="flex justify-between items-center mt-8 p-4 bg-[rgb(var(--color-bg-primary-rgb))] shadow-xl rounded-lg">
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className="flex items-center bg-[rgb(var(--color-bg-tertiary-rgb))] hover:bg-[rgba(var(--color-bg-tertiary-alpha-rgb),0.8)] text-[rgb(var(--color-text-primary-rgb))] font-medium py-2 px-4 rounded-md transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        {previousLevelText}
      </button>
      <span className="text-[rgb(var(--color-text-secondary-rgb))] text-sm hidden sm:inline">{keepGoingText}</span>
      <button
        onClick={onNext}
        disabled={isNextDisabled || !canGoNext}
        className="flex items-center bg-[rgb(var(--color-accent-primary-rgb))] hover:bg-[rgb(var(--color-accent-primary-hover-rgb))] text-[rgb(var(--color-text-on-accent-rgb))] font-semibold py-2 px-4 rounded-md transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-sky-500/30"
      >
        {nextLevelText}
        <ArrowRightIcon className="w-5 h-5 ml-2" />
      </button>
    </div>
  );
};
