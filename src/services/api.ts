/**
 * API SERVICE BOILERPLATE
 * ----------------------
 * This file contains the data fetching logic for the application.
 * Currently, it returns mock data to allow the UI to function.
 * 
 * To implement your own backend:
 * 1. Replace the async returns with actual fetch() or axios calls.
 * 2. Update the data types to match your backend schema.
 */

export const api = {
  // --- USERS & DIRECTORY ---
  getUsers: async () => {
    return [
      { id: '1', name: 'Alex Johnson', email: 'alex@example.com', role: 'student', points: 450, coinBalance: 1200, studentType: 'independent' },
      { id: '2', name: 'Sarah Smith', email: 'sarah@example.com', role: 'student', points: 380, coinBalance: 850, studentType: 'child', parentId: 'p1' },
      { id: 'p1', name: 'James Smith', email: 'james@example.com', role: 'parent', coinBalance: 2500 }
    ];
  },

  checkProfileExists: async (email: string) => {
    return { id: 'mock_user', name: 'Invited User', email, role: 'student' };
  },

  getUserById: async (id: string) => {
    return { id, name: 'Sample User', email: 'user@example.com', role: 'student', points: 100 };
  },

  createUser: async (userData: any) => {
    console.log("Create user API call:", userData);
    return { id: Math.random().toString(), ...userData };
  },

  getChildrenByParentId: async (parentId: string) => {
    return [{ id: 'child1', name: 'Junior User', parentId, role: 'student', points: 50 }];
  },

  // --- TRACKS & COURSES ---
  getTracks: async () => {
    return [
      { id: 't1', title: 'Foundations', description: 'Beginner basics for young innovators.', level: 'Level 1' },
      { id: 't2', title: 'Exploration', description: 'Intermediate web and logic skills.', level: 'Level 2' }
    ];
  },

  getTrackById: async (id: string) => {
    return { id, title: 'Foundations', description: 'Beginner basics' };
  },

  getCourses: async () => {
    return [
      { id: 'c1', title: 'Digital Explorers', description: 'Intro to digital tools', durationWeeks: 12 }
    ];
  },

  getCourseById: async (id: string) => {
    return { id, title: 'Digital Explorers', description: 'Intro to digital tools' };
  },

  getCoursesByTrackId: async (trackId: string) => {
    return [
      { id: 'c1', trackId, title: 'Digital Explorers', description: 'Intro to digital tools', durationWeeks: 12 }
    ];
  },

  // --- COHORTS & ENROLLMENTS ---
  getCohorts: async () => {
    return [
      { id: 'co1', name: 'Digital Explorers - Batch A', courseId: 'c1', status: 'active', startDate: '2024-05-01' }
    ];
  },

  getCohortById: async (id: string) => {
    return { 
      id, 
      name: 'Batch A', 
      courseId: 'c1', 
      status: 'active',
      capacity: 12,
      studentsCount: 8,
      startDate: 'May 01, 2024',
      endDate: 'Aug 15, 2024',
      schedule: 'Saturdays at 10:00 AM (GMT)',
      deliveryMode: 'online'
    };
  },

  getEnrollmentsByStudentId: async (studentId: string) => {
    return [{ id: 'en1', studentId, courseId: 'c1', cohortId: 'co1', status: 'active' }];
  },

  // --- LESSONS & CONTENT ---
  getLessonsByCourseId: async (_courseId: string) => {
    return [
      { id: 'l1', title: 'Computer Confidence', week: 1, session: 1, status: 'published', contentBlocks: [{ type: 'text', content: '<h3>Welcome!</h3>' }] }
    ];
  },

  getLessonById: async (id: string) => {
    return { id, title: 'Computer Confidence', week: 1, session: 1, contentBlocks: [] };
  },

  getQuizByLessonId: async (_lessonId: string) => {
    return { id: 'q1', questions: [] };
  },

  // --- SUBMISSIONS ---
  getAllSubmissions: async () => {
    return [
      { id: 's1', studentId: '1', lessonId: 'l1', lessonTitle: 'Computer Confidence', status: 'pending', content: 'My first project!', pointsAwarded: 0 }
    ];
  },

  getSubmissionsByStudentId: async (studentId: string) => {
    return [{ id: 's1', studentId, lessonId: 'l1', status: 'approved', pointsAwarded: 15 }];
  },

  submitAssignment: async (submission: any) => {
    console.log("Submit assignment API call:", submission);
    return { id: 'new_sub', ...submission };
  },

  gradeSubmission: async (id: string, status: string, points: number, feedback: string) => {
    console.log("Grade submission API call:", id, status, points, feedback);
    return true;
  },

  // --- LEADS & CRM ---
  getLeads: async () => {
    return [
      { id: 'lead1', name: 'Mark Wilson', email: 'mark@test.com', phone: '+123456', status: 'new', createdAt: new Date().toISOString() }
    ];
  },

  createLead: async (leadData: any) => {
    console.log("Create lead API call:", leadData);
    return { id: 'new_lead', ...leadData };
  },

  updateLeadStatus: async (id: string, status: string) => {
    console.log("Update lead status API call:", id, status);
  },

  convertLeadToUser: async (leadId: string, cohortId: string) => {
    console.log("Convert lead API call:", leadId, cohortId);
    return { id: 'new_user' };
  },

  // --- DISCUSSION ---
  getPostsByBoard: async (type: string, id: string) => {
    return [{ id: 'p1', boardType: type, boardId: id, authorName: 'System', content: 'Welcome to the board!', createdAt: new Date().toISOString() }];
  },

  createPost: async (postData: any) => {
    console.log("Create post API call:", postData);
    return { id: 'new_post', ...postData };
  },

  // --- ORGANIZATIONS ---
  getOrganizations: async () => {
    return [{ id: 'org1', name: 'Trustar Academy', location: 'London' }];
  },

  // --- RESOURCES ---
  getResources: async () => {
    return [{ id: 'res1', title: 'Toolbox', type: 'link', url: '#' }];
  },

  // --- WALLET & LEADERBOARD ---
  getTransactionsByUserId: async (userId: string) => {
    return [{ id: 'tx1', userId, amount: 100, type: 'reward', createdAt: new Date().toISOString() }];
  },

  getLeaderboardByCohortId: async (cohortId: string) => {
    return [{ studentId: '1', displayName: 'Alex', totalPoints: 150 }];
  },

  // --- DASHBOARD & STATS ---
  getDashboardStats: async () => {
    return {
      totalStudents: 124,
      totalCohorts: 8,
      activeCohorts: 6,
      totalLeads: 45,
      newLeads: 12,
      totalTracks: 4
    };
  }
};
