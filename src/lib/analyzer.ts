import { ResumeAnalysis, Keyword, FeedbackItem } from './types';

const COMMON_KEYWORDS = [
  'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'SQL', 'AWS',
  'Docker', 'Kubernetes', 'REST API', 'GraphQL', 'Git', 'Agile', 'Scrum',
  'CI/CD', 'TDD', 'Machine Learning', 'Data Analysis', 'Leadership',
  'Communication', 'Problem Solving', 'Team Player', 'Java', 'C++',
  'MongoDB', 'PostgreSQL', 'Redis', 'Microservices', 'DevOps',
];

const JOB_MATCHES = [
  'Senior Frontend Developer at Google',
  'Full Stack Engineer at Meta',
  'Software Engineer at Amazon',
  'React Developer at Shopify',
  'UI/UX Developer at Apple',
  'JavaScript Engineer at Netflix',
  'Web Developer at Microsoft',
  'Frontend Lead at Stripe',
  'React Native Developer at Uber',
  'Software Architect at Airbnb',
];

const IMPROVEMENTS = [
  'Add more quantifiable achievements (e.g., "Increased performance by 40%")',
  'Include a professional summary at the top',
  'Use action verbs to start bullet points (e.g., Developed, Led, Implemented)',
  'Add links to your GitHub, LinkedIn, or portfolio',
  'Tailor keywords to match the job description',
  'Include relevant certifications',
  'Ensure consistent formatting throughout',
  'Add more specific technical skills',
  'Include volunteer work or open-source contributions',
  'Proofread for spelling and grammar errors',
];

const STRENGTHS = [
  'Strong technical skill set clearly outlined',
  'Good use of bullet points for readability',
  'Education section is well-structured',
  'Work experience is in reverse chronological order',
  'Contact information is complete',
  'Skills are relevant to modern tech stack',
];

export function analyzeResume(text: string): ResumeAnalysis {
  const textLength = text.length;
  const wordCount = text.split(/\s+/).filter(Boolean).length;

  // Score based on length & content
  let baseScore = 50;
  if (wordCount > 200) baseScore += 10;
  if (wordCount > 400) baseScore += 10;
  if (wordCount > 600) baseScore += 5;

  // Check for common good resume elements
  const hasEmail = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(text);
  const hasPhone = /(\+?[\d\s\-().]{10,})/.test(text);
  const hasLinkedIn = /linkedin/i.test(text);
  const hasGitHub = /github/i.test(text);
  const hasNumbers = /\d+%|\d+ years|\$\d+/.test(text);
  const hasActionVerbs = /\b(led|developed|implemented|designed|managed|created|built|optimized|improved|launched)\b/i.test(text);

  if (hasEmail) baseScore += 3;
  if (hasPhone) baseScore += 2;
  if (hasLinkedIn) baseScore += 2;
  if (hasGitHub) baseScore += 3;
  if (hasNumbers) baseScore += 5;
  if (hasActionVerbs) baseScore += 5;

  const atsScore = Math.min(99, Math.max(42, baseScore + Math.floor(Math.random() * 10)));

  // Determine found keywords
  const keywords: Keyword[] = COMMON_KEYWORDS.map((word) => ({
    word,
    found: text.toLowerCase().includes(word.toLowerCase()),
    importance: ['React', 'TypeScript', 'JavaScript', 'Python', 'AWS'].includes(word)
      ? 'high'
      : ['Node.js', 'SQL', 'Docker', 'Git', 'REST API'].includes(word)
      ? 'medium'
      : 'low',
  }));

  // Feedback items
  const overallFeedback: FeedbackItem[] = [
    {
      type: hasEmail ? 'success' : 'error',
      text: hasEmail ? 'Email address found' : 'Missing email address',
      explanation: hasEmail ? undefined : 'Add your professional email address to the resume.',
    },
    {
      type: hasPhone ? 'success' : 'warning',
      text: hasPhone ? 'Phone number included' : 'Phone number not detected',
      explanation: hasPhone ? undefined : 'Consider adding a phone number for recruiters to reach you.',
    },
    {
      type: hasGitHub ? 'success' : 'warning',
      text: hasGitHub ? 'GitHub profile linked' : 'No GitHub profile found',
      explanation: hasGitHub ? undefined : 'Link your GitHub to showcase your projects.',
    },
    {
      type: hasNumbers ? 'success' : 'warning',
      text: hasNumbers ? 'Quantifiable achievements found' : 'No measurable achievements detected',
      explanation: hasNumbers ? undefined : 'Add numbers to your achievements (e.g., improved performance by 30%).',
    },
    {
      type: hasActionVerbs ? 'success' : 'warning',
      text: hasActionVerbs ? 'Strong action verbs used' : 'Missing action verbs',
      explanation: hasActionVerbs ? undefined : 'Start bullet points with action verbs like "Developed", "Led", "Implemented".',
    },
    {
      type: wordCount > 300 ? 'success' : 'warning',
      text: wordCount > 300 ? 'Resume has good length' : 'Resume seems too short',
      explanation: wordCount > 300 ? undefined : 'Aim for 400-600 words for a one-page resume.',
    },
  ];

  // Pick strengths and improvements
  const shuffledStrengths = [...STRENGTHS].sort(() => Math.random() - 0.5);
  const shuffledImprovements = [...IMPROVEMENTS].sort(() => Math.random() - 0.5);
  const shuffledMatches = [...JOB_MATCHES].sort(() => Math.random() - 0.5);

  const sectionScores = {
    experience: Math.min(99, Math.max(40, atsScore - 5 + Math.floor(Math.random() * 15))),
    skills: Math.min(99, Math.max(40, atsScore + Math.floor(Math.random() * 10))),
    education: Math.min(99, Math.max(50, atsScore - 10 + Math.floor(Math.random() * 20))),
    formatting: Math.min(99, Math.max(55, atsScore - 3 + Math.floor(Math.random() * 10))),
  };

  return {
    atsScore,
    keywords,
    strengths: shuffledStrengths.slice(0, 4),
    improvements: shuffledImprovements.slice(0, 5),
    jobMatches: shuffledMatches.slice(0, 5),
    overallFeedback,
    sectionScores,
  };
}
