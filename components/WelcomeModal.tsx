import React, { useState } from 'react';
import { SparklesIcon, UserIcon, BriefcaseIcon } from './icons'; // Added UserIcon, BriefcaseIcon
import type { UserPersona } from '../types';

interface WelcomeModalProps {
  onComplete: (persona: UserPersona, profession?: string) => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1); // 1: Persona, 2: Profession (optional for adults)
  const [selectedPersona, setSelectedPersona] = useState<UserPersona | null>(null);
  const [profession, setProfession] = useState('');

  const handlePersonaSelect = (persona: UserPersona) => {
    setSelectedPersona(persona);
    if (persona === 'kid') {
      onComplete(persona); // Kids skip profession step
    } else {
      setStep(2); // Adults go to profession step
    }
  };

  const handleProfessionSubmit = () => {
    if (selectedPersona) { // Should always be 'adult' here
      onComplete(selectedPersona, profession.trim() || undefined);
    }
  };

  const commonButtonClass = "font-semibold py-3 px-6 rounded-lg text-lg transition-colors duration-150 shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-75 w-full sm:w-auto";
  const primaryButtonClass = `bg-[rgb(var(--color-accent-primary-rgb))] hover:bg-[rgb(var(--color-accent-primary-hover-rgb))] text-[rgb(var(--color-text-on-accent-rgb))] focus:ring-[rgb(var(--color-accent-primary-rgb))]`;
  const secondaryButtonClass = `bg-[rgb(var(--color-bg-tertiary-rgb))] hover:bg-[rgba(var(--color-bg-tertiary-rgb),0.8)] text-[rgb(var(--color-text-primary-rgb))] focus:ring-[rgb(var(--color-accent-secondary-rgb))]`;


  return (
    <div className="fixed inset-0 bg-[rgba(var(--color-bg-secondary-rgb),0.8)] backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[rgb(var(--color-bg-primary-rgb))] p-6 sm:p-8 rounded-xl shadow-2xl max-w-lg w-full text-center border border-[rgb(var(--color-border-primary-rgb))]">
        {step === 1 && (
          <>
            <UserIcon className="w-16 h-16 text-[rgb(var(--color-accent-primary-rgb))] mx-auto mb-6" />
            <h2 className="text-2xl sm:text-3xl font-bold text-[rgb(var(--color-text-accent-rgb))] mb-4">Welcome, Future Coder!</h2>
            <p className="text-[rgb(var(--color-text-tertiary-rgb))] mb-6 text-base">
              Who's ready to explore the world of code today?
            </p>
            <div className="space-y-4 sm:space-y-0 sm:flex sm:space-x-4 justify-center">
              <button
                onClick={() => handlePersonaSelect('kid')}
                className={`${commonButtonClass} ${primaryButtonClass} mb-3 sm:mb-0`}
                aria-label="I'm a Young Explorer"
              >
                🚀 I'm a Young Explorer!
              </button>
              <button
                onClick={() => handlePersonaSelect('adult')}
                className={`${commonButtonClass} ${secondaryButtonClass}`}
                aria-label="I'm a Curious Adult"
              >
                🧐 I'm a Curious Adult!
              </button>
            </div>
             <p className="text-[rgb(var(--color-text-secondary-rgb))] text-xs mt-6">
              This will help me tailor the learning journey just for you!
            </p>
          </>
        )}

        {step === 2 && selectedPersona === 'adult' && (
          <>
            <BriefcaseIcon className="w-16 h-16 text-[rgb(var(--color-accent-secondary-rgb))] mx-auto mb-6" />
            <h2 className="text-2xl sm:text-3xl font-bold text-[rgb(var(--color-text-accent-rgb))] mb-4">Tell Me a Bit More (Optional)</h2>
            <p className="text-[rgb(var(--color-text-tertiary-rgb))] mb-2">
              What is your field of work or main area of interest?
            </p>
            <p className="text-[rgb(var(--color-text-secondary-rgb))] text-sm mb-6">
              (e.g., Marketing, Science, Art, Education, Hobbyist). This helps me make coding examples more relatable for you! You can skip this.
            </p>
            <input
              type="text"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              placeholder="Your profession or interest"
              className="w-full p-3 mb-6 bg-[rgb(var(--color-bg-tertiary-rgb))] text-[rgb(var(--color-text-primary-rgb))] border border-[rgb(var(--color-border-primary-rgb))] rounded-md focus:ring-2 focus:ring-[rgb(var(--color-accent-secondary-rgb))] focus:border-[rgb(var(--color-accent-secondary-rgb))] transition-colors duration-150"
            />
            <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-3 sm:space-y-0">
                <button
                onClick={handleProfessionSubmit}
                className={`${commonButtonClass} ${primaryButtonClass}`}
                >
                Let's Start Learning!
                </button>
                <button
                    onClick={handleProfessionSubmit} // Still submits, but profession will be empty
                    className={`${commonButtonClass} ${secondaryButtonClass}`}
                    aria-label="Skip and start learning"
                >
                    Skip & Start
                </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
