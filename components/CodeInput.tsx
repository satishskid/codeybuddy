import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import type { UserPersona } from '../types';

interface CodeInputProps {
  code: string;
  setCode: (code: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  placeholder?: string;
  persona: UserPersona | null;
}

export const CodeInput: React.FC<CodeInputProps> = ({ code, setCode, onSubmit, isLoading, placeholder, persona }) => {
  const buttonText = persona === 'kid' ? "Check My Building!" : "Check My Understanding";

  return (
    <div className="space-y-4">
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder={placeholder || "Type your 'instructions' here..."}
        className="w-full h-40 p-3 bg-[rgb(var(--color-bg-tertiary-rgb))] text-[rgb(var(--color-text-primary-rgb))] border border-[rgb(var(--color-border-primary-rgb))] rounded-md focus:ring-2 focus:ring-[rgb(var(--color-accent-secondary-rgb))] focus:border-[rgb(var(--color-accent-secondary-rgb))] transition-colors duration-150 text-sm resize-none"
        disabled={isLoading}
      />
      <button
        onClick={onSubmit}
        disabled={isLoading}
        className="w-full flex items-center justify-center bg-[rgb(var(--color-accent-secondary-rgb))] hover:bg-[rgb(var(--color-accent-secondary-hover-rgb))] text-[rgb(var(--color-text-on-accent-rgb))] font-semibold py-2.5 px-4 rounded-md transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-teal-500/30 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-accent-secondary-rgb))] focus:ring-opacity-75"
      >
        {isLoading ? (
          <>
            <LoadingSpinner size="sm" />
            <span className="ml-2">Checking...</span>
          </>
        ) : (
          buttonText
        )}
      </button>
    </div>
  );
};
