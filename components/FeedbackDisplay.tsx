import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import type { UserPersona } from '../types';

interface FeedbackDisplayProps {
  feedback: string;
  isLoading: boolean;
  persona: UserPersona | null;
}

export const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ feedback, isLoading, persona }) => {
  const waitingText = persona === 'kid' 
    ? "Waiting for your awesome block construction! Type in the 'Build' box and click the button."
    : "Waiting for your brilliant attempt! Type in the 'Apply' box and click the button.";

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-48 bg-[rgba(var(--color-bg-tertiary-alpha-rgb),0.5)] rounded-lg p-4">
        <LoadingSpinner />
        <p className="mt-2 text-[rgb(var(--color-text-secondary-rgb))]">Thinking...</p>
      </div>
    );
  }

  if (!feedback && !isLoading) {
    return <p className="text-[rgb(var(--color-text-secondary-rgb))] text-sm italic text-center py-10">{waitingText}</p>;
  }

  return (
     <div className="bg-[rgba(var(--color-bg-tertiary-alpha-rgb),0.3)] p-5 rounded-lg min-h-[12rem]">
      <div className="prose prose-sm prose-invert max-w-none text-[rgb(var(--color-text-tertiary-rgb))]">
        {feedback.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};
