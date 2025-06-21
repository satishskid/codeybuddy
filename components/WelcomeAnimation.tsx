import React, { useEffect, useState } from 'react';

export const WelcomeAnimation: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timeouts: number[] = [];
    timeouts.push(setTimeout(() => setStep(1), 200)); // Robot appears
    timeouts.push(setTimeout(() => setStep(2), 1200)); // Command 1 appears
    timeouts.push(setTimeout(() => setStep(3), 1700)); // Robot waves
    timeouts.push(setTimeout(() => setStep(4), 3000)); // Command 2 appears
    timeouts.push(setTimeout(() => setStep(5), 3500)); // Robot jumps
    timeouts.push(setTimeout(() => setStep(6), 4800)); // Command 3 appears
    timeouts.push(setTimeout(() => setStep(7), 5300)); // Robot speaks

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const animationStyles = `
    .robot-group { transition: opacity 0.5s ease-in-out, transform 0.3s ease-out; opacity: 0; }
    .robot-group.visible { opacity: 1; }
    
    .robot-arm-right.wave {
      animation: robot-wave 0.7s ease-in-out 1;
      transform-origin: 8px 5px; /* Adjust based on arm position in SVG */
    }
    @keyframes robot-wave {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(45deg); }
    }

    .robot-main.jump {
      animation: robot-jump 0.4s ease-out 1;
    }
    @keyframes robot-jump {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-15px); }
    }

    .instruction-text, .speech-bubble-group {
      opacity: 0;
      transition: opacity 0.5s ease-in-out;
      font-family: 'monospace', 'ui-monospace', 'SFMono-Regular', Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    }
    .instruction-text.visible, .speech-bubble-group.visible {
      opacity: 1;
    }
    .speech-bubble-text {
      font-family: var(--font-family-body); /* Use theme font */
    }
  `;

  return (
    <div className="mb-6 p-4 bg-[rgba(var(--color-bg-tertiary-alpha-rgb),0.5)] rounded-lg flex flex-col items-center overflow-hidden">
      <style>{animationStyles}</style>
      <svg viewBox="0 0 250 160" className="w-full max-w-xs h-auto">
        {/* Robot - using some fixed colors for robot parts for consistency, accents can be themed */}
        <g id="robot" className={`robot-group ${step >= 1 ? 'visible' : ''}`}>
          <g className={`robot-main ${step === 5 ? 'jump' : ''}`}>
            {/* Legs */}
            <rect x="78" y="110" width="12" height="20" fill="#64748B" rx="3" /> {/* Slate 500 */}
            <rect x="100" y="110" width="12" height="20" fill="#64748B" rx="3" />
            {/* Body */}
            <rect x="70" y="60" width="50" height="55" fill="rgb(var(--color-accent-primary-rgb))" rx="5" /> {/* Themed accent color */}
            {/* Head */}
            <rect x="75" y="30" width="40" height="35" fill="rgba(var(--color-accent-primary-rgb), 0.7)" rx="5"/> {/* Lighter Themed accent */}
            {/* Eyes */}
            <circle cx="87" cy="47" r="4" fill="#0F172A" /> {/* Slate 900 - dark */}
            <circle cx="103" cy="47" r="4" fill="#0F172A" />
             {/* Antenna */}
            <line x1="95" y1="30" x2="95" y2="20" stroke="#94A3B8" strokeWidth="2" /> {/* Slate 400 */}
            <circle cx="95" cy="18" r="3" fill="rgb(var(--color-accent-warning-rgb))" /> {/* Themed warning/signal color */}
          </g>
          {/* Arms */}
          <rect x="55" y="70" width="12" height="35" fill="rgba(var(--color-accent-primary-rgb), 0.7)" rx="3" /> {/* Lighter Themed accent */}
          <rect 
            id="robot-arm-right" 
            className={step === 3 ? 'robot-arm-right wave' : 'robot-arm-right'}
            x="123" y="70" width="12" height="35" fill="rgba(var(--color-accent-primary-rgb), 0.7)" rx="3" 
            style={{ transformOrigin: '6px 6px' }} 
          />
        </g>

        {/* Instructions - using a greenish color for contrast, could be themed too */}
        <text x="15" y="30" fill="rgb(var(--color-accent-success-rgb))" opacity="0.8" fontSize="10" className={`instruction-text ${step >= 2 ? 'visible' : ''}`}>
          command: WAVE_HELLO
        </text>
        <text x="15" y="75" fill="rgb(var(--color-accent-success-rgb))" opacity="0.8" fontSize="10" className={`instruction-text ${step >= 4 ? 'visible' : ''}`}>
          command: JUMP_FOR_JOY
        </text>
        <text x="15" y="120" fill="rgb(var(--color-accent-success-rgb))" opacity="0.8" fontSize="10" className={`instruction-text ${step >= 6 ? 'visible' : ''}`}>
          command: SAY "Coding is fun!"
        </text>

        {/* Speech Bubble from Robot */}
        <g 
          id="robot-speech-bubble" 
          className={`speech-bubble-group ${step >= 7 ? 'visible' : ''}`}
          transform="translate(140, 35)"
        >
          <path 
            d="M0 15C0 6.71573 6.71573 0 15 0H75C83.2843 0 90 6.71573 90 15V30C90 38.2843 83.2843 45 75 45H60L50 55V45H15C6.71573 45 0 38.2843 0 30V15Z" 
            fill="rgb(var(--color-bg-primary-rgb))" /* Themed background for bubble */
            stroke="rgb(var(--color-text-accent-rgb))" /* Themed border for bubble */
            strokeWidth="0.5"
          />
          <text x="45" y="22" textAnchor="middle" fontSize="9" fill="rgb(var(--color-text-accent-rgb))" className="speech-bubble-text">Coding</text>
          <text x="45" y="34" textAnchor="middle" fontSize="9" fill="rgb(var(--color-text-accent-rgb))" className="speech-bubble-text">is fun!</text>
        </g>
      </svg>
      <p className="text-sm text-[rgb(var(--color-text-secondary-rgb))] mt-2">Coding is like giving instructions to a friendly robot!</p>
    </div>
  );
};