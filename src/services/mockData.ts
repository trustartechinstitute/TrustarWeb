export const users = [
  { id: 'u1', name: 'Admin User', email: 'admin@trustar.com', password: 'admin123', role: 'admin', studentType: null, parentId: null, coinBalance: 0, points: 0, timezone: 'UTC', country: 'Global', createdAt: '2026-01-01', avatarUrl: null },
  { id: 'u2', name: 'Sarah Mitchell', email: 'parent@trustar.com', password: 'parent123', role: 'parent', studentType: null, parentId: null, coinBalance: 1500, points: 0, timezone: 'Europe/London', country: 'United Kingdom', createdAt: '2026-02-01', avatarUrl: null },
  { id: 'u3', name: 'Chidera Adeyemi', email: 'chidera@trustar.com', password: 'child123', role: 'student', studentType: 'child', parentId: 'u2', coinBalance: 200, points: 340, timezone: 'Africa/Lagos', country: 'Nigeria', createdAt: '2026-02-01', avatarUrl: null },
  { id: 'u4', name: 'Tade Adeyemi', email: 'tade@trustar.com', password: 'child456', role: 'student', studentType: 'child', parentId: 'u2', coinBalance: 150, points: 210, timezone: 'Africa/Lagos', country: 'Nigeria', createdAt: '2026-02-01', avatarUrl: null },
  { id: 'u5', name: 'Emeka Okafor', email: 'emeka@trustar.com', password: 'student123', role: 'student', studentType: 'independent', parentId: null, coinBalance: 800, points: 520, timezone: 'Africa/Lagos', country: 'Nigeria', createdAt: '2026-03-01', avatarUrl: null },
  { id: 'u6', name: 'Priya Sharma', email: 'priya@trustar.com', password: 'student456', role: 'student', studentType: 'independent', parentId: null, coinBalance: 300, points: 180, timezone: 'Asia/Kolkata', country: 'India', createdAt: '2026-03-15', avatarUrl: null },
];

export const tracks = [
  { id: 'tr0', name: 'Foundations', slug: 'foundations', description: 'Digital confidence, creativity, and early logic for our youngest learners.', ageGroup: '4–7', level: 'beginner', thumbnailUrl: null, isPublished: true, courseIds: ['co0'], createdAt: '2026-01-01' },
  { id: 'tr1', name: 'Explorers', slug: 'explorers', description: 'Computational thinking and full Scratch mastery.', ageGroup: '8–12', level: 'beginner', thumbnailUrl: null, isPublished: true, courseIds: ['co1'], createdAt: '2026-01-01' },
  { id: 'tr2', name: 'Builders', slug: 'builders', description: 'Real apps: web, backend, and a deployed portfolio.', ageGroup: '12–17', level: 'intermediate', thumbnailUrl: null, isPublished: true, courseIds: ['co2'], createdAt: '2026-01-01' },
  { id: 'tr3', name: 'Engineers', slug: 'engineers', description: 'Job-ready software engineering and specialisation.', ageGroup: '15+', level: 'advanced', thumbnailUrl: null, isPublished: true, courseIds: ['co3'], createdAt: '2026-01-01' },
];

export const courses = [
  { id: 'co0', trackId: 'tr0', title: 'Curious to Confident', description: 'Month 1: Hello Technology, Month 2: Create & Express, Month 3: Build & Present.', durationWeeks: 12, level: 'beginner', isPublished: true, isFeatured: true, currency: null, createdAt: '2026-01-01' },
  { id: 'co1', trackId: 'tr1', title: 'User to Programmer', description: 'Scratch foundations, logic, loops, variables, and game logic.', durationWeeks: 16, level: 'beginner', isPublished: true, isFeatured: true, currency: null, createdAt: '2026-01-01' },
  { id: 'co2', trackId: 'tr2', title: 'Player to Builder', description: 'HTML, CSS, JavaScript, Firebase, and GitHub deployment.', durationWeeks: 20, level: 'intermediate', isPublished: true, isFeatured: true, currency: null, createdAt: '2026-01-01' },
  { id: 'co3', trackId: 'tr3', title: 'Learner to Problem Solver', description: 'Core Engineering, Product Building, and Systems/Income.', durationWeeks: 30, level: 'advanced', isPublished: true, isFeatured: true, currency: null, createdAt: '2026-01-01' },
];

export const shortCourses = [
  { id: 'sc1', title: 'Digital Foundations', duration: '2 weeks', for: 'Complete beginners', outcome: 'Computer basics, internet safety, productivity tools' },
  { id: 'sc2', title: 'AI & Prompt Engineering', duration: '3 weeks', for: 'Anyone with basic skills', outcome: 'Practical AI tool use, workflow automation' },
  { id: 'sc3', title: 'Excel & Data Basics', duration: '2 weeks', for: 'Professionals, 15+', outcome: 'Spreadsheet confidence, data charts' },
  { id: 'sc4', title: 'Intro to Web Design', duration: '3 weeks', for: 'Creative individuals 13+', outcome: 'Building simple personal webpages' },
];

export const cohorts = [
  { id: 'c1', courseId: 'co1', name: 'Little Explorers — Cohort 1', status: 'active', deliveryMode: 'online', onlineMeetUrl: 'https://meet.google.com/abc-defg-hij', physicalLocation: null, physicalEnabled: false, capacity: 6, studentsCount: 3, startDate: '2026-03-01', endDate: '2026-05-31', gracePeriodDays: 14, schedule: 'Wed & Fri · 4px - 5pm WAT', timezone: 'Africa/Lagos', instructorId: 'u1', currentWeek: 2, createdAt: '2026-02-01' },
  { id: 'c2', courseId: 'co1', name: 'Little Explorers — Cohort 2', status: 'upcoming', deliveryMode: 'online', onlineMeetUrl: null, physicalLocation: null, physicalEnabled: false, capacity: 6, studentsCount: 0, startDate: '2026-05-01', endDate: '2026-07-31', gracePeriodDays: 14, schedule: 'Wed & Fri · 45 mins', timezone: 'UTC', instructorId: 'u1', currentWeek: 1, createdAt: '2026-03-01' },
  { id: 'c3', courseId: 'co3', name: 'Junior Builders — Cohort 1', status: 'upcoming', deliveryMode: 'online', onlineMeetUrl: null, physicalLocation: null, physicalEnabled: false, capacity: 8, studentsCount: 0, startDate: '2026-06-01', endDate: '2026-08-31', gracePeriodDays: 14, schedule: 'Tue & Thu · 1 hour', timezone: 'UTC', instructorId: null, currentWeek: 1, createdAt: '2026-03-01' },
];

export const enrollments = [
  { id: 'e1', studentId: 'u3', cohortId: 'c1', courseId: 'co1', trackId: 'tr1', status: 'active', enrolledAt: '2026-03-01', accessExpiresAt: '2026-06-14', paymentRef: 'mock_pay_001', payerUserId: 'u2' },
  { id: 'e2', studentId: 'u4', cohortId: 'c1', courseId: 'co1', trackId: 'tr1', status: 'active', enrolledAt: '2026-03-01', accessExpiresAt: '2026-06-14', paymentRef: 'mock_pay_002', payerUserId: 'u2' },
  { id: 'e3', studentId: 'u5', cohortId: 'c1', courseId: 'co1', trackId: 'tr1', status: 'active', enrolledAt: '2026-03-02', accessExpiresAt: '2026-06-14', paymentRef: 'mock_pay_003', payerUserId: 'u5' },
];

export const lessons = [
  {
    id: 'l1', courseId: 'co1', title: 'Welcome to Your Digital World', week: 1, session: 1, status: 'published', deliveryMode: 'online',
    contentBlocks: [
      { type: 'text', content: '<h3>What is a computer?</h3><p>Today we explore what computers do and why they matter to us every day.</p>' },
      { type: 'video', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'How computers work — 3 min intro' },
      { type: 'image', url: 'https://placehold.co/800x400', caption: 'Parts of a computer' },
    ],
    practiceInstructions: 'Open ScratchJr and make a character move across the screen.',
    assignmentInstructions: 'Build an animated name card. Share the project link.',
    assignmentRequired: true,
    resources: ['r1'],
  },
  {
    id: 'l2', courseId: 'co1', title: 'Make It Move — Sequences', week: 2, session: 3, status: 'published', deliveryMode: 'online',
    contentBlocks: [
      { type: 'text', content: '<h3>Order matters</h3><p>Instructions must be in the right order to produce the right result.</p>' },
      { type: 'slides', url: 'https://docs.google.com/presentation/d/e/PLACEHOLDER/embed', title: 'Sequences — Session slides' },
      { type: 'audio', url: '#', title: 'Recap audio — listen on the go' },
    ],
    practiceInstructions: 'Give your character 5 instructions in a row.',
    assignmentInstructions: 'Make your character perform a dance with at least 5 moves in sequence.',
    assignmentRequired: true,
    resources: ['r1', 'r2'],
  },
  {
    id: 'l3', courseId: 'co1', title: 'Loops — Making Things Repeat', week: 3, session: 5, status: 'draft', deliveryMode: 'online',
    contentBlocks: [],
    practiceInstructions: '', assignmentInstructions: '', assignmentRequired: false, resources: [],
  },
];

export const quizzes = [
  {
    id: 'q1', lessonId: 'l1', courseId: 'co1', title: 'Check Your Understanding', isRequired: false, passingScore: 70,
    questions: [
      { id: 'qq1', type: 'multiple_choice', question: 'What does a computer need to follow instructions?', options: ['A program', 'A teacher', 'Paper', 'A pencil'], correctIndex: 0, explanation: 'Computers need programs — sets of instructions — to do anything.' },
      { id: 'qq2', type: 'true_false', question: 'A computer can work without electricity.', correctAnswer: false, explanation: 'All computers need a power source to operate.' },
      { id: 'qq3', type: 'multiple_choice', question: 'Which of these is an output device?', options: ['Keyboard', 'Mouse', 'Monitor', 'USB drive'], correctIndex: 2, explanation: 'A monitor displays information — that makes it an output device.' },
    ],
  },
  {
    id: 'q2', lessonId: 'l2', courseId: 'co1', title: 'Sequences Quiz', isRequired: true, passingScore: 60,
    questions: [
      { id: 'qq4', type: 'true_false', question: 'The order of instructions in a sequence does not matter.', correctAnswer: false, explanation: 'Order matters completely — changing the order changes the result.' },
      { id: 'qq5', type: 'multiple_choice', question: 'What is a sequence in coding?', options: ['A random set of actions', 'A set of instructions in a specific order', 'A loop that repeats', 'A variable'], correctIndex: 1, explanation: 'A sequence is a set of instructions executed in a specific order.' },
    ],
  },
];

export const quizAttempts = [
  { id: 'qa1', studentId: 'u3', quizId: 'q1', lessonId: 'l1', answers: { qq1: 0, qq2: false, qq3: 2 }, score: 100, passed: true, attemptedAt: '2026-03-05' },
  { id: 'qa2', studentId: 'u5', quizId: 'q1', lessonId: 'l1', answers: { qq1: 1, qq2: false, qq3: 2 }, score: 67, passed: false, attemptedAt: '2026-03-06' },
];

export const submissions = [
  { id: 'sub1', studentId: 'u3', lessonId: 'l1', courseId: 'co1', content: 'https://scratch.mit.edu/projects/12345', grade: 22, feedback: 'Great work — loved the colours!', submittedAt: '2026-03-06', gradedAt: '2026-03-07' },
  { id: 'sub2', studentId: 'u5', lessonId: 'l1', courseId: 'co1', content: 'https://scratch.mit.edu/projects/67890', grade: null, feedback: null, submittedAt: '2026-03-07', gradedAt: null },
];

export const discussionPosts = [
  { id: 'dp1', boardType: 'cohort', boardId: 'c1', authorId: 'u3', authorName: 'Chidera A.', authorRole: 'student', content: 'I am stuck on the loop section. The repeat block is not connecting properly.', tag: 'stuck', isPinned: false, isResolved: false, replyCount: 1, createdAt: '2026-03-08' },
];

export const discussionReplies = [
  { id: 'dr1', postId: 'dp1', authorId: 'u1', authorName: 'Trustar Team', authorRole: 'admin', content: 'Great question — make sure the repeat block wraps around the movement blocks. The green flag must be at the very start.', isInstructorReply: true, createdAt: '2026-03-08' },
];

export const resources = [
  { id: 'r1', title: 'ScratchJr Quick Reference Card', description: 'One-page visual guide to all ScratchJr blocks.', type: 'pdf', url: '#', tier: 'free', coinCost: 0, trackIds: ['tr1'], courseIds: ['co1', 'co2'], isPublished: true, createdAt: '2026-01-15' },
  { id: 'r2', title: 'Sequencing Worksheet (Printable)', description: 'Offline activity to reinforce sequence thinking.', type: 'pdf', url: '#', tier: 'free', coinCost: 0, trackIds: ['tr1'], courseIds: ['co1'], isPublished: true, createdAt: '2026-01-20' },
  { id: 'r3', title: 'Parent Guide: Supporting Your Young Coder', description: 'How to encourage learning at home between sessions.', type: 'pdf', url: '#', tier: 'premium', coinCost: 150, trackIds: ['tr1', 'tr2'], courseIds: [], isPublished: true, createdAt: '2026-02-01' },
  { id: 'r4', title: 'Scratch Game Templates Pack', description: '5 starter game templates to remix and build from.', type: 'template', url: '#', tier: 'premium', coinCost: 300, trackIds: ['tr2'], courseIds: ['co3'], isPublished: true, createdAt: '2026-02-10' },
];

export const progress = [
  { id: 'pr1', studentId: 'u3', lessonId: 'l1', courseId: 'co1', completed: true, completedAt: '2026-03-05' },
  { id: 'pr2', studentId: 'u3', lessonId: 'l2', courseId: 'co1', completed: true, completedAt: '2026-03-12' },
  { id: 'pr3', studentId: 'u5', lessonId: 'l1', courseId: 'co1', completed: true, completedAt: '2026-03-06' },
];

export const pointsEvents = [
  { id: 'pt1', studentId: 'u3', type: 'lesson_completed', points: 10, referenceId: 'l1', description: 'Completed: Welcome to Your Digital World', createdAt: '2026-03-05' },
  { id: 'pt2', studentId: 'u3', type: 'quiz_attempted', points: 5, referenceId: 'q1', description: 'Quiz attempted: Session 1', createdAt: '2026-03-05' },
  { id: 'pt3', studentId: 'u3', type: 'quiz_passed', points: 10, referenceId: 'q1', description: 'Quiz passed: Session 1', createdAt: '2026-03-05' },
  { id: 'pt4', studentId: 'u3', type: 'assignment_submitted', points: 15, referenceId: 'sub1', description: 'Assignment submitted: Session 1', createdAt: '2026-03-06' },
  { id: 'pt5', studentId: 'u3', type: 'assignment_graded', points: 22, referenceId: 'sub1', description: 'Assignment graded: Session 1', createdAt: '2026-03-07' },
  { id: 'pt6', studentId: 'u3', type: 'session_attended', points: 20, referenceId: 'c1', description: 'Session attended', createdAt: '2026-03-08' },
  { id: 'pt7', studentId: 'u5', type: 'lesson_completed', points: 10, referenceId: 'l1', description: 'Completed: Welcome to Your Digital World', createdAt: '2026-03-06' },
  { id: 'pt8', studentId: 'u5', type: 'session_attended', points: 20, referenceId: 'c1', description: 'Session attended', createdAt: '2026-03-08' },
];

export const coinTransactions = [
  { id: 'tx1', userId: 'u2', type: 'credit', amount: 2000, description: 'Wallet top-up', referenceId: null, createdAt: '2026-03-15' },
  { id: 'tx2', userId: 'u2', type: 'debit', amount: 500, description: 'Mentorship session — 30 mins', referenceId: null, createdAt: '2026-03-20' },
  { id: 'tx3', userId: 'u5', type: 'credit', amount: 1000, description: 'Wallet top-up', referenceId: null, createdAt: '2026-04-01' },
  { id: 'tx4', userId: 'u5', type: 'debit', amount: 200, description: 'Resource: Parent Guide PDF', referenceId: 'r3', createdAt: '2026-04-05' },
];

export const leads = [
  { id: 'lead1', name: 'Sarah Mitchell', phone: '+447700123456', email: 'sarah@example.com', country: 'United Kingdom', interestedTrack: 'Junior Builders', childAge: '8', message: 'My son loves games. Is this right for him?', status: 'new', source: 'Landing Page', assignedTo: null, createdAt: '2026-04-01' },
  { id: 'lead2', name: 'Amara Diallo', phone: '+221777000000', email: 'amara@example.com', country: 'Senegal', interestedTrack: 'Little Explorers', childAge: '5', message: '', status: 'contacted', source: 'Instagram', assignedTo: null, createdAt: '2026-04-03' },
  { id: 'lead3', name: 'James Okafor', phone: '+2348034567890', email: null, country: 'Nigeria', interestedTrack: 'Rising Coders', childAge: '13', message: 'My son wants to learn Python.', status: 'new', source: 'WhatsApp', assignedTo: null, createdAt: '2026-04-10' },
];

export const organizations = [
  { id: 'org1', name: 'Greenfield Academy', contactPerson: 'Mrs. Nwosu', phone: '+2348056789012', email: 'admin@greenfield.edu.ng', country: 'Nigeria', state: 'Enugu', city: 'Enugu', status: 'prospect', enrolledStudentCount: 0, partnerSince: null, notes: '' },
];
