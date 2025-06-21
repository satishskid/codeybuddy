import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };
  // Uses border-t-2 border-b-2 and the color is applied to these borders.
  // The color comes from --color-accent-primary-rgb defined in index.html themes.
  return (
    <div className={`animate-spin rounded-full ${sizeClasses[size]} border-t-2 border-b-2 border-[rgb(var(--color-accent-primary-rgb))]`}></div>
  );
};
