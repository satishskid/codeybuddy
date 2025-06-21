import React, { useState, useMemo } from 'react';
import type { LearningStep, UserPersona, Theme, Badge } from '../types';
import { BADGES_CONFIG } from '../constants'; // Import badge definitions
import * as Icons from './icons'; // Import all icons

interface CourseOutlineModalProps {
  isOpen: boolean;
  onClose: () => void;
  learningPath: LearningStep[];
  currentLevelIndex: number;
  onNavigateToLevel: (index: number) => void;
  persona: UserPersona;
  theme: Theme;
  achievedBadgeIds: string[];
  totalPoints: number;
}

const formatTime = (totalMinutes: number): string => {
  if (totalMinutes < 1) return "<1 minute";
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  let result = '';
  if (hours > 0) {
    result += `${hours} hour${hours > 1 ? 's' : ''}`;
  }
  if (minutes > 0) {
    if (hours > 0) result += ' ';
    result += `${minutes} minute${minutes > 1 ? 's' : ''}`;
  }
  return result || "0 minutes";
};

export const CourseOutlineModal: React.FC<CourseOutlineModalProps> = ({
  isOpen,
  onClose,
  learningPath,
  currentLevelIndex,
  onNavigateToLevel,
  persona,
  theme,
  achievedBadgeIds,
  totalPoints,
}) => {
  const [blocksPerDay, setBlocksPerDay] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'path' | 'badges'>('path');

  const totalCourseTimeMinutes = useMemo(() => 
    learningPath.reduce((sum, step) => sum + step.estimatedTimeMinutes, 0)
  , [learningPath]);

  const timeSpentMinutes = useMemo(() =>
    learningPath.slice(0, currentLevelIndex).reduce((sum, step) => sum + step.estimatedTimeMinutes, 0)
  , [learningPath, currentLevelIndex]);
  
  const timeRemainingMinutes = totalCourseTimeMinutes - timeSpentMinutes;
  
  const estimatedDaysRemaining = useMemo(() => {
    if (blocksPerDay <= 0) return Infinity;
    const remainingStepsCount = learningPath.length - currentLevelIndex;
    if (remainingStepsCount <=0) return 0;
    
    // Calculate days based on blocks per day, considering only remaining blocks
    let days = 0;
    let dailyBlocksCompleted = 0;
    let actualRemainingSteps = 0;
    for(let i = currentLevelIndex; i < learningPath.length; i++) {
        actualRemainingSteps++;
    }
    if (actualRemainingSteps === 0) return 0;

    return Math.ceil(actualRemainingSteps / blocksPerDay);

  }, [learningPath, currentLevelIndex, blocksPerDay]);

  const modalTitle = persona === 'kid' ? "Your Awesome Blocks Map!" : "Your Learning Path Overview";
  const conceptNoun = persona === 'kid' ? "Block" : "Concept";
  const conceptNounPlural = persona === 'kid' ? "Blocks" : "Concepts";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(var(--color-bg-secondary-rgb),0.7)] backdrop-blur-md flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-in-out" onClick={onClose}>
      <div 
        className="bg-[rgb(var(--color-bg-primary-rgb))] p-5 sm:p-6 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col border border-[rgb(var(--color-border-primary-rgb))]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[rgb(var(--color-text-accent-rgb))]">{modalTitle}</h2>
          <button onClick={onClose} className="text-[rgb(var(--color-text-secondary-rgb))] hover:text-[rgb(var(--color-text-primary-rgb))] transition-colors">
            <Icons.XMarkIcon className="w-7 h-7" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[rgb(var(--color-border-primary-rgb))] mb-4">
          <button 
            onClick={() => setActiveTab('path')}
            className={`py-2 px-4 font-medium transition-colors ${activeTab === 'path' ? 'text-[rgb(var(--color-text-accent-rgb))] border-b-2 border-[rgb(var(--color-accent-primary-rgb))]' : 'text-[rgb(var(--color-text-secondary-rgb))] hover:text-[rgb(var(--color-text-primary-rgb))]'}`}
          >
            Learning Path
          </button>
          <button 
            onClick={() => setActiveTab('badges')}
            className={`py-2 px-4 font-medium transition-colors ${activeTab === 'badges' ? 'text-[rgb(var(--color-text-accent-rgb))] border-b-2 border-[rgb(var(--color-accent-primary-rgb))]' : 'text-[rgb(var(--color-text-secondary-rgb))] hover:text-[rgb(var(--color-text-primary-rgb))]'}`}
          >
            My Badges ({achievedBadgeIds.length} / {BADGES_CONFIG.length})
          </button>
        </div>

        {activeTab === 'path' && (
          <>
            {/* Estimation Section */}
            <div className={`mb-6 p-4 rounded-lg bg-[rgba(var(--color-bg-tertiary-alpha-rgb),0.5)] border border-[rgba(var(--color-border-primary-rgb),0.5)] text-sm`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <p><strong className="text-[rgb(var(--color-text-accent-rgb))]">Total Course Time:</strong> {formatTime(totalCourseTimeMinutes)}</p>
                <p><strong className="text-[rgb(var(--color-text-accent-rgb))]">Progress:</strong> {currentLevelIndex} of {learningPath.length} {conceptNounPlural} Mastered</p>
                <p><strong className="text-[rgb(var(--color-text-accent-rgb))]">Time Spent:</strong> {formatTime(timeSpentMinutes)}</p>
                <p><strong className="text-[rgb(var(--color-text-accent-rgb))]">Time Remaining:</strong> {formatTime(timeRemainingMinutes)}</p>
                 <p><strong className="text-[rgb(var(--color-text-accent-rgb))]">Total Points:</strong> {totalPoints} ✨</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                <label htmlFor="blocksPerDay" className="text-[rgb(var(--color-text-tertiary-rgb))] whitespace-nowrap">
                  {conceptNounPlural} per day:
                </label>
                <input
                  type="number"
                  id="blocksPerDay"
                  min="1"
                  max="10"
                  value={blocksPerDay}
                  onChange={(e) => setBlocksPerDay(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 p-1.5 bg-[rgb(var(--color-bg-secondary-rgb))] text-[rgb(var(--color-text-primary-rgb))] border border-[rgb(var(--color-border-primary-rgb))] rounded-md focus:ring-1 focus:ring-[rgb(var(--color-accent-primary-rgb))] text-center"
                />
                {timeRemainingMinutes > 0 && estimatedDaysRemaining !== Infinity && (
                    <p className="text-[rgb(var(--color-text-tertiary-rgb))]">
                        Est. <strong className="text-[rgb(var(--color-text-accent-rgb))]">{estimatedDaysRemaining}</strong> day{estimatedDaysRemaining === 1 ? '' : 's'} to complete.
                    </p>
                )}
                {timeRemainingMinutes === 0 && currentLevelIndex === learningPath.length -1 && <p className="text-[rgb(var(--color-accent-success-rgb))] font-semibold">Course Complete! 🎉</p>}
              </div>
            </div>

            {/* Modules List */}
            <div className="overflow-y-auto space-y-2 pr-2 -mr-2 flex-grow max-h-[calc(90vh-320px)] sm:max-h-[calc(90vh-300px)]">
              {learningPath.map((step, index) => {
                const isCompleted = index < currentLevelIndex;
                const isCurrent = index === currentLevelIndex;
                const canNavigate = isCompleted || isCurrent;

                let statusIcon;
                let statusColorClass = "";
                let titleColorClass = "text-[rgb(var(--color-text-primary-rgb))]";
                let borderColorClass = "border-[rgb(var(--color-border-primary-rgb))]";

                if (isCompleted) {
                  statusIcon = <Icons.CheckCircleIcon className="w-5 h-5 sm:w-6 sm:h-6" isFilled fillOverride="rgb(var(--color-accent-success-rgb))" />;
                  statusColorClass = "text-[rgb(var(--color-accent-success-rgb))]";
                  titleColorClass = "text-[rgb(var(--color-text-secondary-rgb))] line-through";
                  borderColorClass = "border-[rgb(var(--color-accent-success-rgb))] opacity-70";
                } else if (isCurrent) {
                  statusIcon = <Icons.PlayCircleIcon className="w-5 h-5 sm:w-6 sm:h-6" />;
                  statusColorClass = "text-[rgb(var(--color-accent-primary-rgb))]";
                  titleColorClass = "text-[rgb(var(--color-text-accent-rgb))] font-semibold";
                  borderColorClass = "border-[rgb(var(--color-accent-primary-rgb))] shadow-lg";
                } else {
                  statusIcon = <Icons.LockClosedIcon className="w-5 h-5 sm:w-6 sm:h-6" />;
                  statusColorClass = "text-[rgb(var(--color-text-secondary-rgb))] opacity-50";
                  titleColorClass = "text-[rgb(var(--color-text-secondary-rgb))] opacity-70";
                  borderColorClass = "border-[rgb(var(--color-border-primary-rgb))] opacity-50";
                }

                return (
                  <button
                    key={step.id}
                    onClick={() => canNavigate && onNavigateToLevel(index)}
                    disabled={!canNavigate}
                    className={`w-full flex items-center p-3 sm:p-4 rounded-lg border ${borderColorClass} bg-[rgba(var(--color-bg-tertiary-alpha-rgb),0.2)] hover:bg-[rgba(var(--color-bg-tertiary-alpha-rgb),0.4)] transition-all duration-150 ${canNavigate ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                    aria-label={`Go to ${step.blockType || step.title}`}
                  >
                    <span className={`mr-3 ${statusColorClass}`}>{statusIcon}</span>
                    <div className="flex-grow text-left">
                      <h4 className={`text-sm sm:text-base font-medium ${titleColorClass}`}>
                        {step.emoji} {step.blockType || step.title}
                      </h4>
                      <p className={`text-xs ${isCompleted ? 'text-[rgb(var(--color-text-secondary-rgb))] opacity-80' : 'text-[rgb(var(--color-text-tertiary-rgb))]'}`}>
                        Est. {formatTime(step.estimatedTimeMinutes)}
                        {step.points > 0 && <span className="ml-2 text-[rgb(var(--color-accent-tertiary-rgb))]">+{step.points} pts</span>}
                      </p>
                    </div>
                    {isCurrent && <Icons.ArrowRightIcon className="w-5 h-5 text-[rgb(var(--color-accent-primary-rgb))] ml-2" />}
                  </button>
                );
              })}
            </div>
          </>
        )}
        {activeTab === 'badges' && (
          <div className="overflow-y-auto space-y-3 pr-2 -mr-2 flex-grow max-h-[calc(90vh-150px)] sm:max-h-[calc(90vh-120px)]">
            {BADGES_CONFIG.map((badge) => {
              const isAchieved = achievedBadgeIds.includes(badge.id);
              const IconComponent = Icons[badge.iconName] as React.FC<React.SVGProps<SVGSVGElement>>;
              
              return (
                <div 
                  key={badge.id}
                  className={`flex items-center p-3 sm:p-4 rounded-lg border bg-[rgba(var(--color-bg-tertiary-alpha-rgb),0.2)] transition-all duration-150 ${isAchieved ? 'border-[rgb(var(--color-accent-tertiary-rgb))] shadow-md' : 'border-[rgb(var(--color-border-primary-rgb))] opacity-60'}`}
                >
                  <IconComponent 
                    className={`w-10 h-10 sm:w-12 sm:h-12 mr-3 sm:mr-4 flex-shrink-0 ${isAchieved ? 'text-[rgb(var(--color-accent-tertiary-rgb))]' : 'text-[rgb(var(--color-text-secondary-rgb))]'}`} 
                  />
                  <div className="flex-grow">
                    <h4 className={`text-base sm:text-lg font-semibold ${isAchieved ? 'text-[rgb(var(--color-text-accent-rgb))]' : 'text-[rgb(var(--color-text-primary-rgb))]'}`}>
                      {badge.name}
                    </h4>
                    <p className={`text-xs sm:text-sm ${isAchieved ? 'text-[rgb(var(--color-text-tertiary-rgb))]' : 'text-[rgb(var(--color-text-secondary-rgb))]'}`}>
                      {badge.description}
                    </p>
                  </div>
                  {isAchieved && <Icons.CheckCircleIcon className="w-6 h-6 sm:w-7 sm:h-7 text-[rgb(var(--color-accent-success-rgb))]" isFilled fillOverride="rgb(var(--color-accent-success-rgb))"/>}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
