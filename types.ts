export type UserPersona = 'kid' | 'adult';
export type Theme = 'playful' | 'graceful';

export interface LearningStep {
  id: string;
  title: string;
  emoji: string;
  blockType?: string; // The "Coding Block" analogy name for this concept
  introductionPrompt: string; // Base prompt
  challengeDescription: string;
  codeEvaluationPromptPreamble: string;
  placeholder?: string;
  estimatedTimeMinutes: number; // Estimated time in minutes to complete this step
  points: number; // Points awarded for completing this step
  // Optional persona-specific overrides if general prompt + system instruction isn't enough
  introductionPromptKid?: string;
  introductionPromptAdult?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconName: keyof typeof import('./components/icons'); // References icon component names
  condition: (learningPath: LearningStep[], currentLevelIndex: number, completedStep: LearningStep, totalPoints: number, achievedBadgeIds: string[]) => boolean;
}

// Represents the structure of what's stored in localStorage
export interface GameProgress {
  currentLevelIndex: number;
  userPersona: UserPersona | null;
  userProfession: string | null;
  totalPoints: number;
  achievedBadgeIds: string[];
  theme: Theme;
}
