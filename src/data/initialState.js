export const INITIAL_USER = {
  name: 'Divya N',
  alias: 'Aanya Sharma',
  email: 'divya@futureminds.demo',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'Student',
  level: 'Level 12 Apprentice',
  levelNumber: 12,
  xp: 2450,
  streak: 12,
  grade: 'Grade 6',
  school: 'FutureMinds AI Labs, Delhi',
  learningGoal: 'Master Neural Networks & Python',
  darkThemeUnlocked: false,
  aiHoursUnlocked: 0,
  redeemedItems: [],
};

export const INITIAL_CHAPTERS = [
  {
    id: 1,
    number: '01',
    title: 'Intro to AI',
    status: 'completed',
    lessonsCount: 3,
    completedLessons: 3,
    tags: ['History', 'Turing Test', 'Modern AI'],
    lessons: [
      { id: 101, title: 'History of AI', desc: 'Explore the origins from Alan Turing to the first neural networks.', type: 'VIDEO', duration: '12 mins', completed: true },
      { id: 102, title: 'Turing Test', desc: 'Understand the benchmark for machine intelligence and its modern critiques.', type: 'LAB', duration: '25 mins', completed: true },
      { id: 103, title: 'Modern AI', desc: 'A look at LLMs, Generative AI, and the current state of the field.', type: 'QUIZ', duration: '10 mins', completed: true },
    ],
  },
  {
    id: 2,
    number: '02',
    title: 'Tokens & Data',
    status: 'active',
    lessonsCount: 3,
    completedLessons: 1,
    tags: ['Text Tokenization', 'Word Embeddings', 'Data Cleaning'],
    lessons: [
      { id: 201, title: 'Text Tokenization Basics', desc: 'How words, subwords, and characters are converted into numerical tokens.', type: 'VIDEO', duration: '14 mins', completed: true },
      { id: 202, title: 'Word Embeddings & Vectors', desc: 'Mapping high-dimensional semantic relationships into vector spaces.', type: 'LAB', duration: '20 mins', completed: false },
      { id: 203, title: 'Data Preprocessing & Ethics', desc: 'Handling noise, deduplication, and ethical considerations in datasets.', type: 'QUIZ', duration: '15 mins', completed: false },
    ],
  },
  {
    id: 3,
    number: '03',
    title: 'Weights & Biases',
    status: 'locked',
    lessonsCount: 4,
    completedLessons: 0,
    tags: ['Matrix Math', 'Loss Functions', 'Optimization'],
    lessons: [
      { id: 301, title: 'Neural Weights & Linearity', desc: 'Connecting mathematical weights to biological synapses.', type: 'VIDEO', duration: '16 mins', completed: false },
      { id: 302, title: 'Biases and Activation Offsets', desc: 'Why biases prevent zero-input collapse.', type: 'LAB', duration: '18 mins', completed: false },
    ],
  },
  {
    id: 4,
    number: '04',
    title: 'Neural Architectures',
    status: 'locked',
    lessonsCount: 4,
    completedLessons: 0,
    tags: ['FeedForward', 'CNNs', 'Transformers'],
    lessons: [
      { id: 401, title: 'Feedforward Deep Networks', desc: 'Multi-layer perceptron topology and depth benefits.', type: 'VIDEO', duration: '20 mins', completed: false },
    ],
  },
  {
    id: 5,
    number: '05',
    title: 'Optimization',
    status: 'locked',
    lessonsCount: 3,
    completedLessons: 0,
    tags: ['Gradient Descent', 'Adam', 'Learning Rates'],
    lessons: [
      { id: 501, title: 'Gradient Descent in Action', desc: 'Traversing loss landscapes and finding global minima.', type: 'VIDEO', duration: '22 mins', completed: false },
    ],
  },
  {
    id: 6,
    number: '06',
    title: 'Ethics & Safety',
    status: 'locked',
    lessonsCount: 3,
    completedLessons: 0,
    tags: ['Alignment', 'Fairness', 'Governance'],
    lessons: [
      { id: 601, title: 'AI Alignment Foundations', desc: 'Ensuring models behave safely and predictably.', type: 'VIDEO', duration: '15 mins', completed: false },
    ],
  },
];

export const INITIAL_AI_TUTOR = {
  currentSessionId: 1,
  isTyping: false,
  sessions: [
    {
      id: 1,
      title: 'How Does AI Actually...',
      messages: [
        { sender: 'owl', name: 'Professor Owl', avatar: 'owl', text: 'When you look at a dog, do you identify the whole image instantly, or do you notice features like ears, eyes, fur, and shape first?' },
        { sender: 'user', name: 'Madhura', text: 'How does AI recognize images?' },
        { sender: 'owl', name: 'Professor Owl', avatar: 'owl', text: 'Interesting. If humans recognize features before identifying an object, how might an AI model approach the same problem?' },
      ],
    },
    {
      id: 2,
      title: 'Difference Between AI...',
      messages: [
        { sender: 'owl', name: 'Professor Owl', avatar: 'owl', text: 'Welcome back! What would you like to explore today? We can dive into the difference between Artificial Intelligence, Machine Learning, and Deep Learning!' },
      ],
    },
    {
      id: 3,
      title: 'Prompt Writing Practice',
      messages: [
        { sender: 'owl', name: 'Professor Owl', avatar: 'owl', text: "Let's practice crafting high-precision prompts for Large Language Models. Try giving me a prompt with a persona, clear task, and constraints!" },
      ],
    },
    {
      id: 4,
      title: 'Understanding Neural...',
      messages: [
        { sender: 'owl', name: 'Professor Owl', avatar: 'owl', text: 'In artificial neurons, inputs are weighted, summed, and passed through an activation function like ReLU or Sigmoid. Ready for a quick challenge?' },
      ],
    },
    {
      id: 5,
      title: 'Can AI Think Like Hum...',
      messages: [
        { sender: 'owl', name: 'Professor Owl', avatar: 'owl', text: "That touches on the classic Turing Test and Searle's Chinese Room argument! What are your thoughts on computational consciousness?" },
      ],
    },
  ],
};

export const INITIAL_VIDEO = {
  isPlaying: false,
  currentTime: 1222,
  duration: 2700,
  activeTab: 'overview',
  notes: '• Perceptrons compute y = σ(w·x + b)\n• Activation functions introduce non-linearity so the network can fit arbitrary complex curves.\n• ReLU is standard for hidden layers to avoid vanishing gradients.',
  discussion: [
    { author: 'Aris Thorne', time: '2h ago', text: "Remember to review the difference between step functions and continuous sigmoid curves before attempting tomorrow's lab!" },
    { author: 'Priya V.', time: '1h ago', text: 'The visual analogy with the light switch made activation functions finally click for me!' },
  ],
};

export const OWL_REPLY_DEFAULT =
  'Great question! When neural networks learn representations, they extract low-level features (edges, textures) in early layers, and compose them into high-level concepts (eyes, faces, whole objects) in deeper layers.';

export function generateOwlReply(text) {
  const lower = text.toLowerCase();
  if (lower.includes('hint')) {
    return '💡 Hint: Think about how convolutional filters slide across pixels to calculate feature maps. Each filter specializes in detecting a specific pattern!';
  }
  if (lower.includes('simpler') || lower.includes('explain')) {
    return 'Imagine looking through a microscope: first you see tiny dots, then lines connecting dots, then shapes, and finally the whole puzzle comes together. Neural networks work layer by layer just like that!';
  }
  if (lower.includes('example')) {
    return 'For instance, if an AI is identifying a cat: Layer 1 detects diagonal whiskers; Layer 2 recognizes triangular ears; Layer 3 combines them into a feline face score!';
  }
  if (lower.includes('token')) {
    return "Tokens are the fundamental building blocks of LLMs! A token can be a single letter, a subword (like 'un' + 'breakable'), or an entire common word.";
  }
  return OWL_REPLY_DEFAULT;
}
