import {
  users, tracks, courses, cohorts, enrollments, lessons,
  quizzes, quizAttempts, submissions, discussionPosts,
  discussionReplies, resources, progress, pointsEvents,
  coinTransactions, leads, organizations
} from './mockData';

const delay = (ms = 80) => new Promise(r => setTimeout(r, ms));
const safe = ({ password, ...u }: any) => u;

export const api = {
  // Auth
  login: async (email: string, password: string) => { 
    await delay(); 
    const u = users.find(u => u.email === email && u.password === password); 
    if (!u) throw new Error('Invalid email or password'); 
    return safe(u); 
  },

  // Users
  getUsers: async () => { await delay(); return users.map(safe); },
  getUserById: async (id: string) => { await delay(); const u = users.find(u => u.id === id); if (!u) throw new Error('Not found'); return safe(u); },
  getChildrenByParentId: async (parentId: string) => { await delay(); return users.filter(u => u.parentId === parentId).map(safe); },
  createUser: async (userData: any) => {
    await delay();
    const newUser = {
      ...userData,
      id: `u${users.length + Date.now()}`,
      coinBalance: userData.coinBalance || 0,
      points: userData.points || 0,
      createdAt: new Date().toISOString().split('T')[0],
      avatarUrl: null
    };
    users.push(newUser);
    return safe(newUser);
  },

  // Tracks
  getTracks: async () => { await delay(); return tracks; },
  getTrackById: async (id: string) => { await delay(); return tracks.find(t => t.id === id); },

  // Courses
  getCourses: async () => { await delay(); return courses; },
  getCourseById: async (id: string) => { await delay(); return courses.find(c => c.id === id); },
  getCoursesByTrackId: async (trackId: string) => { await delay(); return courses.filter(c => c.trackId === trackId); },

  // Cohorts
  getCohorts: async () => { await delay(); return cohorts; },
  getCohortById: async (id: string) => { await delay(); return cohorts.find(c => c.id === id); },

  // Enrollments
  getEnrollmentsByStudentId: async (studentId: string) => { await delay(); return enrollments.filter(e => e.studentId === studentId); },
  getStudentIdsByCohortId: async (cohortId: string) => { await delay(); return enrollments.filter(e => e.cohortId === cohortId).map(e => e.studentId); },

  // Lessons
  getLessonsByCourseId: async (courseId: string) => { 
    await delay(); 
    return lessons.filter(l => l.courseId === courseId).sort((a: any, b: any) => (a.week * 10 + a.session) - (b.week * 10 + b.session)); 
  },
  getLessonById: async (id: string) => { await delay(); return lessons.find(l => l.id === id); },

  // Quizzes
  getQuizByLessonId: async (lessonId: string) => { await delay(); return quizzes.find(q => q.lessonId === lessonId) || null; },
  getQuizAttemptsByStudentId: async (studentId: string) => { await delay(); return quizAttempts.filter(a => a.studentId === studentId); },
  submitQuizAttempt: async (attempt: any) => { await delay(); (quizAttempts as any).push(attempt); return attempt; },

  // Submissions
  getSubmissionsByStudentId: async (studentId: string) => { await delay(); return submissions.filter(s => s.studentId === studentId); },
  getSubmissionsByCohortId: async (cohortId: string) => { 
    await delay();
    const cohort = cohorts.find(c => c.id === cohortId);
    if (!cohort) return [];
    const lessonIds = lessons.filter(l => l.courseId === cohort.courseId).map(l => l.id); 
    return submissions.filter(s => lessonIds.includes(s.lessonId)); 
  },

  // Discussion
  getPostsByBoard: async (boardType: string, boardId: string) => { 
    await delay(); 
    return [...discussionPosts.filter(p => p.boardType === boardType && p.boardId === boardId)].sort((a: any, b: any) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0) || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); 
  },
  getRepliesByPostId: async (postId: string) => { await delay(); return discussionReplies.filter(r => r.postId === postId); },
  createPost: async (post: any) => { 
    await delay(); 
    const newPost = { ...post, id: `dp${Date.now()}`, createdAt: new Date().toISOString(), replyCount: 0, isPinned: false, isResolved: false };
    (discussionPosts as any).push(newPost); 
    return newPost; 
  },
  createReply: async (reply: any) => { 
    await delay(); 
    const newReply = { ...reply, id: `dr${Date.now()}`, createdAt: new Date().toISOString() };
    (discussionReplies as any).push(newReply); 
    return newReply; 
  },
  markResolved: async (postId: string) => { await delay(); const p = discussionPosts.find(p => p.id === postId); if (p) p.isResolved = true; return p; },

  // Progress
  getProgressByStudentId: async (studentId: string) => { await delay(); return progress.filter(p => p.studentId === studentId); },

  // Resources
  getResources: async () => { await delay(); return resources; },
  getResourcesByTrackId: async (trackId: string) => { await delay(); return resources.filter(r => r.trackIds.includes(trackId) && r.isPublished); },

  // Points
  getPointsByStudentId: async (studentId: string) => { await delay(); return pointsEvents.filter(p => p.studentId === studentId); },
  getLeaderboardByCohortId: async (cohortId: string) => {
    await delay();
    const studentIds = enrollments.filter(e => e.cohortId === cohortId).map(e => e.studentId);
    return studentIds.map(sid => {
      const student = users.find(u => u.id === sid);
      const totalPoints = pointsEvents.filter(p => p.studentId === sid).reduce((sum, p) => sum + p.points, 0);
      const parts = student?.name.split(' ') || ['Unknown'];
      return { studentId: sid, displayName: parts[0] + (parts[1] ? ' ' + parts[1][0] + '.' : ''), totalPoints };
    }).sort((a, b) => b.totalPoints - a.totalPoints);
  },

  // Wallet
  getTransactionsByUserId: async (userId: string) => { await delay(); return coinTransactions.filter(t => t.userId === userId).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); },

  // Leads
  getLeads: async () => { await delay(); return leads; },
  createLead: async (lead: any) => { await delay(); (leads as any).push(lead); return lead; },
  updateLeadStatus: async (id: string, status: string) => { await delay(); const l = leads.find(l => l.id === id); if (l) l.status = status; return l; },
  convertLeadToUser: async (leadId: string, cohortId: string) => {
    await delay();
    const lead = leads.find(l => l.id === leadId);
    if (!lead) throw new Error('Lead not found');

    const newUser = await api.createUser({
      name: lead.name,
      email: lead.email || `${lead.name.toLowerCase().replace(/\s+/g, '.')}@trustar.com`,
      password: 'password123',
      role: 'student',
      studentType: lead.childAge ? 'child' : 'independent',
      country: lead.country,
    });

    const cohort = cohorts.find(c => c.id === cohortId);
    if (cohort) {
      (enrollments as any).push({
        id: `e${Date.now()}`,
        studentId: newUser.id,
        cohortId: cohort.id,
        courseId: cohort.courseId,
        status: 'active',
        enrolledAt: new Date().toISOString().split('T')[0],
      });
    }

    lead.status = 'enrolled';
    return newUser;
  },

  // Organizations
  getOrganizations: async () => { await delay(); return organizations; },

  // Dashboard stats
  getDashboardStats: async () => {
    await delay();
    return {
      totalStudents:  users.filter(u => u.role === 'student').length,
      totalCohorts:   cohorts.length,
      activeCohorts:  cohorts.filter(c => c.status === 'active').length,
      totalLeads:     leads.length,
      newLeads:       leads.filter(l => l.status === 'new').length,
      totalTracks:    tracks.length,
    };
  },
};
