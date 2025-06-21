
import React, { useState, useEffect, useCallback } from 'react';
import { ConceptDisplay } from './components/ConceptDisplay';
import { CodeInput } from './components/CodeInput';
import { FeedbackDisplay } from './components/FeedbackDisplay';
import { LevelNavigator } from './components/LevelNavigator';
import { Header } from './components/Header';
import { WelcomeModal } from './components/WelcomeModal';
import { CourseOutlineModal } from './components/CourseOutlineModal';
import { LEARNING_PATH, BADGES_CONFIG } from './constants';
import type { LearningStep, UserPersona, Theme, GameProgress, Badge } from './types';
import { explainConcept, evaluateCode } from './services/geminiService';
import * as Icons from './components/icons'; // Import all icons

const LOCAL_STORAGE_KEY = 'codingCoachProgress';

interface AppNotification {
  id: string;
  type: 'block' | 'points' | 'badge';
  message: string;
  iconName?: keyof typeof Icons;
}

const App: React.FC = () => {
  const [currentLevelIndex, setCurrentLevelIndex] = useState<number>(0);
  const [userCode, setUserCode] = useState<string>('');
  const [coachFeedback, setCoachFeedback] = useState<string>('');
  const [conceptExplanation, setConceptExplanation] = useState<string>('');
  const [isExplanationLoading, setIsExplanationLoading] = useState<boolean>(false);
  const [isFeedbackLoading, setIsFeedbackLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [userPersona, setUserPersona] = useState<UserPersona | null>(null);
  const [userProfession, setUserProfession] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>('playful');
  const [showWelcomeModal, setShowWelcomeModal] = useState<boolean>(true);
  const [isCourseOutlineOpen, setIsCourseOutlineOpen] = useState<boolean>(false);

  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  
  // Gamification state
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [achievedBadgeIds, setAchievedBadgeIds] = useState<string[]>([]);

  const currentStep: LearningStep | undefined = LEARNING_PATH[currentLevelIndex];

  // Load progress from localStorage on initial mount
  useEffect(() => {
    const savedProgressString = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedProgressString) {
      try {
        const savedProgress: GameProgress = JSON.parse(savedProgressString);
        setCurrentLevelIndex(savedProgress.currentLevelIndex || 0);
        setUserPersona(savedProgress.userPersona);
        setUserProfession(savedProgress.userProfession);
        setTotalPoints(savedProgress.totalPoints || 0);
        setAchievedBadgeIds(savedProgress.achievedBadgeIds || []);
        setTheme(savedProgress.theme || (savedProgress.userPersona === 'kid' ? 'playful' : 'graceful'));
        if(savedProgress.userPersona) setShowWelcomeModal(false); // If persona exists, skip welcome
      } catch (e) {
        console.error("Failed to parse saved progress:", e);
        localStorage.removeItem(LOCAL_STORAGE_KEY); // Clear corrupted data
      }
    }
  }, []);

  // Save progress to localStorage whenever relevant state changes
  useEffect(() => {
    if (!showWelcomeModal && userPersona) { // Only save if welcome is done and persona exists
      const progressToSave: GameProgress = {
        currentLevelIndex,
        userPersona,
        userProfession,
        totalPoints,
        achievedBadgeIds,
        theme,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progressToSave));
    }
  }, [currentLevelIndex, userPersona, userProfession, totalPoints, achievedBadgeIds, theme, showWelcomeModal]);


  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const addNotification = (type: AppNotification['type'], message: string, iconName?: keyof typeof Icons) => {
    const newNotification = { id: Date.now().toString(), type, message, iconName };
    setNotifications(prev => [...prev, newNotification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 4000); // Notification display duration
  };
  
  const fetchConcept = useCallback(async () => {
    if (!currentStep || !userPersona) return;
    setIsExplanationLoading(true);
    setError(null);
    try {
      let introPrompt = currentStep.introductionPrompt;
      // Persona-specific prompts can be used here if defined in LearningStep
      const explanation = await explainConcept(introPrompt, userPersona, currentStep.blockType, userProfession ?? undefined);
      setConceptExplanation(explanation);
    } catch (err) {
      console.error("Failed to fetch concept explanation:", err);
      setError("Oops! I couldn't fetch the learning material. Please check your API key or try again later.");
      setConceptExplanation("Sorry, I couldn't load this concept right now. Please try navigating or refreshing.");
    } finally {
      setIsExplanationLoading(false);
    }
  }, [currentStep, userPersona, userProfession]);

  useEffect(() => {
    if (!showWelcomeModal && userPersona && currentStep) {
      fetchConcept();
      // "Block unlocked" notification is now part of handleLevelChange effects
    }
  }, [currentLevelIndex, showWelcomeModal, userPersona, fetchConcept, currentStep]);


  const checkAndAwardBadges = useCallback((completedStep: LearningStep) => {
    const newlyAchievedBadges: Badge[] = [];
    BADGES_CONFIG.forEach(badge => {
      if (!achievedBadgeIds.includes(badge.id) && badge.condition(LEARNING_PATH, currentLevelIndex, completedStep, totalPoints, achievedBadgeIds)) {
        newlyAchievedBadges.push(badge);
      }
    });

    if (newlyAchievedBadges.length > 0) {
      setAchievedBadgeIds(prev => [...prev, ...newlyAchievedBadges.map(b => b.id)]);
      newlyAchievedBadges.forEach(badge => {
        addNotification('badge', `Badge Unlocked: ${badge.name}!`, badge.iconName);
      });
    }
  }, [achievedBadgeIds, currentLevelIndex, totalPoints, addNotification]);


  const handleCodeSubmit = async () => {
    if (!currentStep || !userPersona) return;
    setIsFeedbackLoading(true);
    setError(null);
    try {
      const feedback = await evaluateCode(currentStep.codeEvaluationPromptPreamble, currentStep.challengeDescription, userCode, userPersona, currentStep.blockType, userProfession ?? undefined);
      setCoachFeedback(feedback);
      // For the welcome step, submitting code (even if it's just clicking a button processed as 'code')
      // implies completion of that introductory phase.
      if (currentStep.id === 'welcome' && !achievedBadgeIds.includes('welcome_aboard')) {
         checkAndAwardBadges(currentStep); // Check for welcome badge
      }
    } catch (err) {
      console.error("Failed to get code feedback:", err);
      setError("Oh no! I had trouble understanding that. Could you try rephrasing or check your API setup?");
      setCoachFeedback("I'm having a bit of trouble connecting. Please try submitting again!");
    } finally {
      setIsFeedbackLoading(false);
    }
  };

  const handleLevelChange = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < LEARNING_PATH.length && currentStep) {
      const oldStep = LEARNING_PATH[currentLevelIndex]; // Step being completed

      // Award points for completing the *previous* step (oldStep), only if moving forward
      if (newIndex > currentLevelIndex) {
        const pointsEarned = oldStep.points || 0;
        if (pointsEarned > 0) {
          setTotalPoints(prevPoints => prevPoints + pointsEarned);
          addNotification('points', `+${pointsEarned} Points!`, 'AwardIcon');
        }
         // Check for badges based on the step just completed
        checkAndAwardBadges(oldStep);
      }
      
      setCurrentLevelIndex(newIndex);
      setUserCode(''); 
      setConceptExplanation(''); 
      setCoachFeedback(''); // Clear feedback for new level
      setIsCourseOutlineOpen(false);

      const newStepDetails = LEARNING_PATH[newIndex];
      if (newStepDetails && newIndex > currentLevelIndex) { // Only show block unlocked if moving forward
         addNotification('block', `New Block: ${newStepDetails.blockType || newStepDetails.title}!`, newStepDetails.emoji ? undefined : 'LogoIcon'); // Emoji could be icon too
      }
    }
  };

  const handleNextLevel = () => {
    if (currentLevelIndex < LEARNING_PATH.length - 1) {
      handleLevelChange(currentLevelIndex + 1);
    }
  };

  const handlePreviousLevel = () => {
    if (currentLevelIndex > 0) {
      handleLevelChange(currentLevelIndex - 1);
    }
  };
  
  const handleWelcomeComplete = (selectedPersona: UserPersona, selectedProfession?: string) => {
    setUserPersona(selectedPersona);
    setTheme(selectedPersona === 'kid' ? 'playful' : 'graceful');
    if (selectedProfession) {
      setUserProfession(selectedProfession);
    }
    setShowWelcomeModal(false);
    // Initial fetch of first concept will be triggered by useEffect watching showWelcomeModal
  };

  if (showWelcomeModal || !userPersona) { // Ensure persona is set before rendering main app
    return <WelcomeModal onComplete={handleWelcomeComplete} />;
  }
  
  if (!currentStep) { // Handle case where currentStep might be undefined briefly
    return <div className="min-h-screen flex items-center justify-center bg-[rgb(var(--color-bg-secondary-rgb))] text-[rgb(var(--color-text-primary-rgb))]">Loading...</div>;
  }

  const totalLevels = LEARNING_PATH.length;
  const progressPercentage = totalLevels > 0 ? ((currentLevelIndex + 1) / totalLevels) * 100 : 0;
  
  const getNotificationStyles = (type: AppNotification['type']) => {
    switch(type) {
      case 'points': return "bg-[rgb(var(--color-accent-tertiary-rgb))] text-[rgb(var(--color-bg-secondary-rgb))]";
      case 'badge': return "bg-[rgb(var(--color-accent-secondary-rgb))] text-[rgb(var(--color-text-on-accent-rgb))]";
      case 'block':
      default: return "bg-[rgb(var(--color-accent-success-rgb))] text-[rgb(var(--color-text-on-accent-rgb))]";
    }
  }

  return (
    <div className={`min-h-screen flex flex-col items-center p-4 md:p-8 bg-gradient-to-br from-[rgb(var(--color-bg-gradient-from-rgb))] to-[rgb(var(--color-bg-gradient-to-rgb))] text-[rgb(var(--color-text-primary-rgb))] selection:bg-[rgb(var(--color-accent-primary-rgb))] selection:text-[rgb(var(--color-text-on-accent-rgb))]`}>
      <Header 
        onOpenCourseOutline={() => setIsCourseOutlineOpen(true)} 
        persona={userPersona} 
        totalPoints={totalPoints}
      />
      
      {/* Notification Area */}
      <div className="fixed top-5 right-5 z-50 space-y-2">
        {notifications.map((notif, index) => {
          const IconComponent = notif.iconName ? Icons[notif.iconName] as React.FC<React.SVGProps<SVGSVGElement>> : Icons.CheckCircleIcon;
          return (
            <div 
              key={notif.id} 
              className={`p-3 sm:p-4 rounded-lg shadow-lg flex items-center animate-pulse ${getNotificationStyles(notif.type)}`}
              style={{ animationDelay: `${index * 100}ms`}} // Slight stagger if multiple appear
            >
              <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 mr-2" 
                // Specific fill for CheckCircleIcon if it's the default for 'block'
                {...(notif.iconName === 'CheckCircleIcon' || (!notif.iconName && notif.type === 'block') ? {isFilled: true, fillOverride: 'rgb(var(--color-text-on-accent-rgb))'} : {})} 
              />
              <span className="text-sm sm:text-base">{notif.message}</span>
            </div>
          );
        })}
      </div>

      <main className="w-full max-w-4xl space-y-8">
        <div className="bg-[rgb(var(--color-bg-primary-rgb))] shadow-2xl rounded-xl p-0 overflow-hidden">
          <div className="bg-[rgba(var(--color-accent-primary-rgb),0.3)] p-4 sm:p-6 border-b-2 border-[rgb(var(--color-border-accent-rgb))]">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-[rgb(var(--color-text-accent-rgb))] flex items-center">
                <span className="text-3xl sm:text-4xl mr-3">{currentStep.emoji}</span>
                {currentStep.blockType || currentStep.title}
              </h2>
              <span className="text-xs sm:text-sm text-[rgb(var(--color-text-accent-rgb))] bg-[rgba(var(--color-bg-accent-rgb),0.5)] px-2 py-1 rounded-md">Level {currentLevelIndex + 1} of {totalLevels}</span>
            </div>
            <div className="w-full bg-[rgb(var(--color-bg-tertiary-rgb))] rounded-full h-2.5">
              <div className="bg-[rgb(var(--color-accent-primary-rgb))] h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }} title={`Progress: ${progressPercentage.toFixed(0)}%`}></div>
            </div>
          </div>
          
          <div className="p-4 sm:p-6">
            {error && <div className="bg-[rgba(var(--color-accent-warning-bg-rgb),0.2)] text-[rgb(var(--color-accent-warning-rgb))] p-3 rounded-md mb-4">{error}</div>}
            <ConceptDisplay 
              explanation={conceptExplanation} 
              isLoading={isExplanationLoading} 
              icon={<Icons.LightBulbIcon className="w-6 h-6 text-[rgb(var(--color-icon-lightbulb-rgb))] mr-2" />}
              isWelcomeStep={currentStep.id === 'welcome'}
              blockTypeWelcomeOverride={currentStep.id === 'welcome' ? (userPersona === 'kid' ? "Your First Coding Block!" : "Your First Conceptual Block!") : undefined}
              persona={userPersona}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[rgb(var(--color-bg-primary-rgb))] shadow-2xl rounded-xl p-6">
            <h3 className="text-xl font-semibold text-[rgb(var(--color-accent-secondary-rgb))] mb-3 flex items-center">
              <Icons.SparklesIcon className="w-6 h-6 mr-2 text-[rgb(var(--color-icon-sparkles-rgb))]" /> 
              {userPersona === 'kid' ? "Build with this Block!" : "Apply this Concept!"}
            </h3>
            <p className="text-[rgb(var(--color-text-tertiary-rgb))] mb-4 text-sm">{currentStep.challengeDescription}</p>
            <CodeInput
              code={userCode}
              setCode={setUserCode}
              onSubmit={handleCodeSubmit}
              isLoading={isFeedbackLoading}
              placeholder={currentStep.placeholder || "Type your instructions here..."}
              persona={userPersona}
            />
          </div>

          <div className="bg-[rgb(var(--color-bg-primary-rgb))] shadow-2xl rounded-xl p-6">
             <h3 className="text-xl font-semibold text-[rgb(var(--color-icon-thumbsup-rgb))] mb-3 flex items-center">
              <Icons.ThumbsUpIcon className="w-6 h-6 mr-2" /> Coach's Feedback
            </h3>
            <FeedbackDisplay feedback={coachFeedback} isLoading={isFeedbackLoading} persona={userPersona} />
          </div>
        </div>
        
        <LevelNavigator
          onPrevious={handlePreviousLevel}
          onNext={handleNextLevel}
          canGoPrevious={currentLevelIndex > 0}
          canGoNext={currentLevelIndex < LEARNING_PATH.length - 1 && (currentStep.id === 'welcome' ? true : !!coachFeedback && !isFeedbackLoading)} 
          isNextDisabled={
            (currentStep.id !== 'welcome' && (!coachFeedback || isFeedbackLoading)) ||
            currentLevelIndex === LEARNING_PATH.length - 1
          }
          persona={userPersona}
        />
      </main>
      <footer className="mt-12 text-center text-[rgb(var(--color-text-secondary-rgb))] text-xs space-y-3">
        <p>
          {userPersona === 'kid' 
            ? "Keep building your code masterpiece, one block at a time!"
            : "Continue exploring the world of code, one concept at a time!"}
        </p>
        <p>
          Beyond our learning journey, AI is performing <strong className="text-[rgb(var(--color-text-tertiary-rgb))]">today's wonders</strong> in many fields: 
          revolutionizing education with personalized learning, 
          advancing healthcare with new diagnostics and treatments, 
          and contributing to global good by tackling challenges like climate change and resource management. 
          Understanding its foundations can help you be part of this exciting future!
        </p>
        <p>
          In today's AI world, generative AI and no-code tools offer wonderful assistance. 
          However, to best use them and become truly efficient, smart, and super, 
          understanding the fundamentals of coding and programming is key.
        </p>
        <p>
          Made with <Icons.BrainIcon className="w-4 h-4 inline-block align-middle mx-0.5 text-[rgb(var(--color-text-accent-rgb))]" /> by <strong className="text-[rgb(var(--color-text-tertiary-rgb))]">grybrain.ai</strong>. 
          Powered by Gemini. &copy; {new Date().getFullYear()}
        </p>
      </footer>

      {userPersona && (
        <CourseOutlineModal
          isOpen={isCourseOutlineOpen}
          onClose={() => setIsCourseOutlineOpen(false)}
          learningPath={LEARNING_PATH}
          currentLevelIndex={currentLevelIndex}
          onNavigateToLevel={handleLevelChange}
          persona={userPersona}
          theme={theme}
          achievedBadgeIds={achievedBadgeIds}
          totalPoints={totalPoints}
        />
      )}
    </div>
  );
};

export default App;
