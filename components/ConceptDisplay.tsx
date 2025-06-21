import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { WelcomeAnimation } from './WelcomeAnimation';
import type { UserPersona } from '../types';

interface ConceptDisplayProps {
  explanation: string;
  isLoading: boolean;
  icon: React.ReactNode;
  isWelcomeStep?: boolean;
  blockTypeWelcomeOverride?: string;
  persona: UserPersona | null;
}

export const ConceptDisplay: React.FC<ConceptDisplayProps> = ({ explanation, isLoading, icon, isWelcomeStep, blockTypeWelcomeOverride, persona }) => {
  const loadingText = persona === 'kid' ? "Loading your next Coding Block..." : "Loading the next Concept...";
  const refreshText = persona === 'kid' ? "Refreshing block details..." : "Refreshing concept details...";
  const exploreText = persona === 'kid' ? "Let's Explore This Block!" : "Let's Explore This Concept!";


  if (isLoading && !explanation) { 
    return (
      <div className="flex flex-col items-center justify-center h-48 bg-[rgba(var(--color-bg-tertiary-alpha-rgb),0.5)] rounded-lg p-4">
        <LoadingSpinner />
        <p className="mt-2 text-[rgb(var(--color-text-secondary-rgb))]">{loadingText}</p>
      </div>
    );
  }

  return (
    <div className="bg-[rgba(var(--color-bg-tertiary-alpha-rgb),0.3)] p-5 rounded-lg min-h-[12rem]">
      {isWelcomeStep && <WelcomeAnimation />}
      
      <div className={`flex items-start text-lg font-semibold text-[rgb(var(--color-icon-lightbulb-rgb))] mb-3 ${isWelcomeStep ? 'mt-4' : ''}`}>
        <span className="flex-shrink-0 mr-2">{icon}</span>
        <h3>{isWelcomeStep && blockTypeWelcomeOverride ? blockTypeWelcomeOverride : exploreText}</h3>
      </div>
      {isLoading && explanation && ( 
         <div className="flex items-center text-sm text-[rgb(var(--color-text-secondary-rgb))] mb-2">
           <LoadingSpinner size="sm" />
           <p className="ml-2">{refreshText}</p>
         </div>
      )}
      <div className="prose prose-sm prose-invert max-w-none text-[rgb(var(--color-text-tertiary-rgb))]">
        {explanation.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};
