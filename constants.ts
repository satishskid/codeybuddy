import type { LearningStep, Badge } from './types';
import * as Icons from './components/icons'; // Used for badge iconName type safety

export const LEARNING_PATH: LearningStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Coding!',
    emoji: '🎉', // Changed emoji to something more celebratory for the start
    blockType: 'Your Coding Adventure Begins!', // More engaging title for the first block
    introductionPrompt: `
You are a super friendly and enthusiastic AI, kicking off a coding adventure for an absolute beginner!
Your goal is to make them feel excited, informed, and completely at ease. Your explanation should be around 4-5 short, engaging paragraphs.

First, explain "What is Coding?" in the simplest way possible.
- Use an analogy like "giving a computer a detailed list of instructions to follow, just like a recipe for baking a cake or a set of directions to build a cool toy."
- Emphasize that coding is how we tell computers, phones, and even robots what to do, from playing games to helping us learn new things. It's about solving puzzles and bringing ideas to life!

Next, briefly and gently explain "What is a Programming Language?"
- Describe it as "the special set of words and grammar rules we use to write those instructions so the computer can understand them perfectly."
- You can say it's like learning a secret code that computers speak. Mention that in this course, "we'll use simple, English-like instructions, often called 'pseudo-code'. This lets us focus on the BIG IDEAS of coding without worrying about tiny details of one specific computer language right away. The amazing part is, these big ideas work in almost ALL real programming languages!"

Then, tell them "What You'll Achieve" on this journey, connecting it to the 'Blocks' theme:
- If the user is a 'kid' (persona: kid): "You're going to become a Master 'Coding Block' Builder! With each lesson, you'll collect new, super-powered Coding Blocks. You'll learn to:
    - Understand the secret ingredients (the main ideas) that make all coding work.
    - Think step-by-step, like a super-smart game designer planning out a new level.
    - Create your own sets of instructions to make the computer do what YOU want.
    - Get totally ready to build amazing things with real coding languages like Python or Scratch when you're older!"
- If the user is an 'adult' (persona: adult): "You'll gain a solid understanding of fundamental 'Conceptual Blocks' in programming. By the end of this journey, you will:
    - Grasp the core principles and logic that underpin all programming languages.
    - Develop algorithmic thinking – a valuable skill for breaking down complex problems into clear, manageable steps.
    - Be comfortable writing and interpreting pseudo-code, which is a blueprint for actual code.
    - Build a robust foundation and the confidence needed to dive into specific programming languages like Python, JavaScript, or others relevant to your interests or career."

Finally, reiterate that this journey is all about exploring these 'Coding Blocks' or 'Conceptual Blocks' one by one. Each block is a new skill.
End with a super encouraging message, like: "Don't worry about getting everything perfect right away – learning is an adventure! Are you ready to discover your first powerful Block and see what it can do? Let's get started!"
`,
    challengeDescription: "No coding challenge for this intro! Your first task is just to absorb this information and get excited. When you're ready to see your very first interactive 'Block', click the 'Next Block/Concept' button below. This tells me you're set for the adventure!",
    codeEvaluationPromptPreamble: "The user is at the 'Welcome' step. They've clicked the button indicating they're ready to move to the first real concept after reading the introduction. Respond with a super enthusiastic, short (1-2 sentences) message like: 'Fantastic! You're officially on your way! Let's unwrap your first REAL Block and see what mysteries it holds!' (Adapt 'Block' terminology based on persona).",
    placeholder: "No code needed here, just click 'Next' when you feel ready!",
    estimatedTimeMinutes: 5, // Increased slightly for more reading
    points: 5,
  },
  {
    id: 'variables',
    title: 'Storing Information',
    emoji: '📦',
    blockType: 'Storage Block (Variables)',
    introductionPrompt: "Explain 'variables' as 'Storage Blocks' (for kids) or 'Information Containers'/'Named Values' (for adults). These blocks/containers are like labeled boxes where you can keep a piece of information (like a number or a word) and give it a name so you can find it later. Show a simple pseudo-code example: `messageBlock = \"Hello, builder!\"` or `scoreContainer = 100`. Emphasize that these have names and hold values. Keep it 2-3 paragraphs, very encouraging and simple, adapting detail for persona.",
    challengeDescription: "Let's use your new Storage Block/Information Container! Create one named 'myName' and store your name inside it. For example, if your name is Alex, you'd type: `myName = \"Alex\"`. Just show me how you'd set this up!",
    codeEvaluationPromptPreamble: "The user is learning about 'Storage Blocks' (variables) or 'Information Containers'. Their task was to create one named `myName` and store their name in it. Example: `myName = \"Alex\"`.",
    placeholder: "e.g., myBlockName = \"Your Value\"",
    estimatedTimeMinutes: 10,
    points: 10,
  },
  {
    id: 'output',
    title: 'Showing Information',
    emoji: '🗣️',
    blockType: 'Display Block (Output)',
    introductionPrompt: "Explain 'output' as a 'Display Block' (for kids) or 'Display Mechanism' (for adults). This lets you tell the computer to show information on the screen, like what's inside one of your Storage Blocks/Information Containers. Mention pseudo-code like `display(blockName)` or `show(messageContainer)`. Focus on why this is useful: to see what your code is doing or share results. Keep it simple, 2-3 paragraphs, adapting for persona.",
    challengeDescription: "You've got a Storage Block/Information Container (like `myName`). Now, let's use a Display Block/Mechanism to show what's inside it! Try to write an instruction to display the content of your `myName`. (Hint: maybe `display(myName)`).",
    codeEvaluationPromptPreamble: "The user is learning about 'Display Blocks' (output) or 'Display Mechanisms'. They hypothetically have a 'Storage Block' (variable) `myName` and are trying to display its value.",
    placeholder: "e.g., display(myBlockName)",
    estimatedTimeMinutes: 10,
    points: 10,
  },
  {
    id: 'dataTypes',
    title: 'Types of Information',
    emoji: '📊',
    blockType: 'Data Type Blocks',
    introductionPrompt: "Explain that StorageBlocks/Information Containers can hold different *types* of information – these are like different kinds of 'Data Type Blocks' or 'Information Types.' Introduce text (strings), numbers (integers, decimals), and true/false values (booleans). E.g., `greetingBlock = \"Hi\"`, `itemCount = 5`, `isReady = true`. Briefly explain why knowing the type helps (e.g., you can do math with numbers). Keep it light, 2-3 paragraphs, adapting for persona.",
    challengeDescription: "Let's practice with different 'Data Type Blocks'/'Information Types'! Create two: one called `favoriteNumber` to hold a number, and another called `isLearning` to hold a true/false value. (e.g., `favoriteNumber = 7`, `isLearning = true`)",
    codeEvaluationPromptPreamble: "The user is learning about 'Data Type Blocks'/'Information Types' (text, numbers, booleans). Their task was to create `favoriteNumber` (number) and `isLearning` (true/false).",
    placeholder: "e.g., myNumberBlock = 10\nmyTruthBlock = false",
    estimatedTimeMinutes: 15,
    points: 15,
  },
  {
    id: 'simpleMath',
    title: 'Math Operations',
    emoji: '➕➖', 
    blockType: 'Calculation Blocks (Simple Math)', 
    introductionPrompt: "Explain that computers are great with 'Calculation Blocks' (for kids) or performing 'Arithmetic Operations' (for adults)! Show how to do simple math (like addition, subtraction) using number-type Storage Blocks/Information Containers or numbers directly. Example: `totalBlocks = 5 + 3`, or `currentScore = 100`, `newScore = currentScore - 10`. Keep it simple, 2-3 paragraphs, focusing on how these help calculate things, adapting for persona.",
    challengeDescription: "Time for Calculation Blocks/Arithmetic Operations! If you have 10 points and earn 5 more, create a `finalScore` and use calculation to store the sum of 10 and 5 in it. (e.g. `finalScore = 10 + 5`)",
    codeEvaluationPromptPreamble: "The user is learning about 'Calculation Blocks' (simple arithmetic) or 'Arithmetic Operations'. Their task was to calculate `10 + 5` and store it in `finalScore`.",
    placeholder: "e.g., total = valueA + valueB",
    estimatedTimeMinutes: 15,
    points: 15,
  },
  {
    id: 'conditionals',
    title: 'Making Decisions',
    emoji: '🚦',
    blockType: 'Decision Blocks (If/Else)',
    introductionPrompt: "Introduce 'Decision Blocks' (for kids) or 'Conditional Logic' (for adults) using 'if' and 'else'. Explain it's like teaching the computer to make choices: IF something is true, DO this; ELSE, DO that. Example: `IF weatherBlock == \"sunny\" THEN display(\"Wear sunglasses!\") ELSE display(\"Bring an umbrella!\")`. Keep it relatable and simple, 2-3 paragraphs.",
    challengeDescription: "Let's make a decision! Imagine a 'lightSwitch' Storage Block. If `lightSwitch` is `true` (meaning on), display 'Light is ON'. Otherwise (else), display 'Light is OFF'. Write the Decision Block for this. (Hint: `IF lightSwitch == true THEN ... ELSE ...`)",
    codeEvaluationPromptPreamble: "The user is learning 'Decision Blocks' (if/else). They need to check a `lightSwitch` variable (assume it exists and is boolean) and display 'Light is ON' or 'Light is OFF'.",
    placeholder: "IF condition THEN\n  actionOne\nELSE\n  actionTwo",
    estimatedTimeMinutes: 20,
    points: 20,
  },
  {
    id: 'loops',
    title: 'Repeating Actions',
    emoji: '🔁',
    blockType: 'Repetition Blocks (Loops)',
    introductionPrompt: "Explain 'Repetition Blocks' (for kids) or 'Loops' (for adults). These blocks tell the computer to repeat an action a certain number of times or until a condition is met. Example: `REPEAT 3 times: display(\"Hello!\")` or `FOR each item in myList: display(item)`. Focus on how this saves effort. Simple, 2-3 paragraphs.",
    challengeDescription: "Let's use a Repetition Block! Make the computer display the message 'Practice makes perfect!' exactly 3 times. (Hint: `REPEAT 3 times: display(\"Practice makes perfect!\")`)",
    codeEvaluationPromptPreamble: "The user is learning 'Repetition Blocks' (loops). Their task is to display 'Practice makes perfect!' 3 times.",
    placeholder: "REPEAT X times:\n  actionToRepeat",
    estimatedTimeMinutes: 20,
    points: 20,
  },
  {
    id: 'functions',
    title: 'Reusable Actions',
    emoji: '🧩',
    blockType: 'Reusable Action Blocks (Functions)',
    introductionPrompt: "Introduce 'Reusable Action Blocks' (for kids) or 'Functions' (for adults). These are like creating your own custom block that can perform a set of instructions whenever you call its name. Explain defining a function (e.g., `FUNCTION GreetUser: display(\"Welcome!\")`) and calling it (e.g., `GreetUser`). Emphasize reusability and organization. Simple, 2-3 paragraphs.",
    challengeDescription: "Let's create a Reusable Action Block! Define a function called `SayHello` that, when called, displays the message 'Hello from my function!'. Then, show how you would call this function. (Hint: Two parts - defining it, then using it.)",
    codeEvaluationPromptPreamble: "The user is learning 'Reusable Action Blocks' (functions). They need to define a function `SayHello` that displays 'Hello from my function!' and then call that function.",
    placeholder: "FUNCTION MyAction:\n  instruction\n\nMyAction", // Two parts
    estimatedTimeMinutes: 25,
    points: 25,
  },
  // Add more steps here in the future!
];

export const BADGES_CONFIG: Badge[] = [
  {
    id: 'welcome_aboard',
    name: 'Welcome Aboard!',
    description: 'You\'ve officially started your coding adventure!',
    iconName: 'SparklesIcon',
    condition: (_, _currentIndex, completedStep) => completedStep.id === 'welcome',
  },
  {
    id: 'variables_voyager',
    name: 'Variables Voyager',
    description: 'Mastered the art of storing information!',
    iconName: 'MedalIcon',
    condition: (_, _currentIndex, completedStep) => completedStep.id === 'variables',
  },
  {
    id: 'output_oracle',
    name: 'Output Oracle',
    description: 'Learned how to make your code speak!',
    iconName: 'ThumbsUpIcon',
    condition: (_, _currentIndex, completedStep) => completedStep.id === 'output',
  },
  {
    id: 'three_block_trio',
    name: 'Three Block Trio',
    description: 'Successfully navigated through your first three concepts!',
    iconName: 'StarIcon',
    condition: (_path, currentIndex) => currentIndex >= 2, // 0-indexed, so 2 means 3 steps done
  },
  {
    id: 'logic_pathfinder',
    name: 'Logic Pathfinder',
    description: 'Conquered the world of decisions with if/else!',
    iconName: 'BrainIcon',
    condition: (_, _currentIndex, completedStep) => completedStep.id === 'conditionals',
  },
   {
    id: 'looping_legend',
    name: 'Looping Legend',
    description: 'Mastered the art of repetition!',
    iconName: 'TargetIcon', // Reusing an icon for now
    condition: (_, _currentIndex, completedStep) => completedStep.id === 'loops',
  },
  {
    id: 'function_foundry',
    name: 'Function Foundry',
    description: 'Built your first reusable action block!',
    iconName: 'LogoIcon', // Reusing an icon
    condition: (_, _currentIndex, completedStep) => completedStep.id === 'functions',
  },
  {
    id: 'halfway_hero',
    name: 'Halfway Hero',
    description: 'You are halfway through all the current coding blocks!',
    iconName: 'MedalIcon', // Reusing
    condition: (path, currentIndex) => currentIndex + 1 >= Math.floor(path.length / 2),
  },
  {
    id: 'coding_champion',
    name: 'Coding Champion',
    description: 'Completed all available coding blocks! Amazing job!',
    iconName: 'TrophyIcon',
    condition: (path, currentIndex) => currentIndex === path.length - 1,
  },
];