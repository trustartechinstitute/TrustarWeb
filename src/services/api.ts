import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp 
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

interface FirestoreErrorInfo {
  error: string;
  operationType: 'create' | 'update' | 'delete' | 'list' | 'get' | 'write';
  path: string | null;
  authInfo: {
    userId: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    providerInfo: { providerId: string; displayName: string; email: string; }[];
  }
}

function handleFirestoreError(error: any, operationType: FirestoreErrorInfo['operationType'], path: string | null = null) {
  const authUser = auth.currentUser;
  const errorInfo: FirestoreErrorInfo = {
    error: error.message || String(error),
    operationType,
    path,
    authInfo: {
      userId: authUser?.uid || 'anonymous',
      email: authUser?.email || 'none',
      emailVerified: authUser?.emailVerified || false,
      isAnonymous: authUser?.isAnonymous || true,
      providerInfo: authUser?.providerData.map(p => ({
        providerId: p.providerId,
        displayName: p.displayName || '',
        email: p.email || ''
      })) || []
    }
  };
  console.error("Firestore Error:", errorInfo);
  throw new Error(JSON.stringify(errorInfo));
}

export const api = {
  // Users
  getUsers: async () => {
    try {
      const snap = await getDocs(collection(db, 'users'));
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (e) { handleFirestoreError(e, 'list', 'users'); }
  },

  checkProfileExists: async (email: string) => {
    try {
      const q = query(collection(db, 'users'), where('email', '==', email.toLowerCase()));
      const snap = await getDocs(q);
      if (snap.empty) return null;
      return { id: snap.docs[0].id, ...snap.docs[0].data() };
    } catch (e) { handleFirestoreError(e, 'get', 'users'); }
  },

  getUserById: async (id: string) => {
    try {
      const snap = await getDoc(doc(db, 'users', id));
      if (!snap.exists()) throw new Error('User not found');
      return { id: snap.id, ...snap.data() };
    } catch (e) { handleFirestoreError(e, 'get', `users/${id}`); }
  },

  getChildrenByParentId: async (parentId: string) => {
    try {
      const q = query(collection(db, 'users'), where('parentId', '==', parentId));
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (e) { handleFirestoreError(e, 'list', 'users'); }
  },

  createUser: async (userData: any) => {
    try {
      // In a real production app, you might use a Firebase Cloud Function for this 
      // to avoid signing out the admin. For AI Studio, we'll assume the admin is adding manually.
      // Note: If adding a real student account, we'd need to handle auth carefully.
      const res = await addDoc(collection(db, 'users'), {
        ...userData,
        points: userData.points || 0,
        coinBalance: userData.coinBalance || 0,
        createdAt: Timestamp.now()
      });
      return { id: res.id, ...userData };
    } catch (e) { handleFirestoreError(e, 'create', 'users'); }
  },

  // Tracks
  getTracks: async () => {
    try {
      const snap = await getDocs(collection(db, 'tracks'));
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (e) { handleFirestoreError(e, 'list', 'tracks'); }
  },

  getTrackById: async (id: string) => {
    try {
      const snap = await getDoc(doc(db, 'tracks', id));
      return snap.exists() ? { id: snap.id, ...snap.data() } : null;
    } catch (e) { handleFirestoreError(e, 'get', `tracks/${id}`); }
  },

  // Courses
  getCourses: async () => {
    try {
      const snap = await getDocs(collection(db, 'courses'));
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (e) { handleFirestoreError(e, 'list', 'courses'); }
  },

  getCourseById: async (id: string) => {
    try {
      const snap = await getDoc(doc(db, 'courses', id));
      return snap.exists() ? { id: snap.id, ...snap.data() } : null;
    } catch (e) { handleFirestoreError(e, 'get', `courses/${id}`); }
  },

  getCoursesByTrackId: async (trackId: string) => {
    try {
      const q = query(collection(db, 'courses'), where('trackId', '==', trackId));
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (e) { handleFirestoreError(e, 'list', 'courses'); }
  },

  // Cohorts
  getCohorts: async () => {
    try {
      const snap = await getDocs(collection(db, 'cohorts'));
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (e) { handleFirestoreError(e, 'list', 'cohorts'); }
  },

  getCohortById: async (id: string) => {
    try {
      const snap = await getDoc(doc(db, 'cohorts', id));
      return snap.exists() ? { id: snap.id, ...snap.data() } : null;
    } catch (e) { handleFirestoreError(e, 'get', `cohorts/${id}`); }
  },

  // Enrollments
  getEnrollmentsByStudentId: async (studentId: string) => {
    try {
      const q = query(collection(db, 'enrollments'), where('studentId', '==', studentId));
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (e) { handleFirestoreError(e, 'list', 'enrollments'); }
  },

  // Lessons - Master Course model
  getLessonsByCourseId: async (courseId: string) => {
    try {
      const q = query(collection(db, 'lessons'), where('courseId', '==', courseId), orderBy('week'), orderBy('session'));
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (e) { handleFirestoreError(e, 'list', 'lessons'); }
  },

  getLessonById: async (id: string) => {
    try {
      const snap = await getDoc(doc(db, 'lessons', id));
      return snap.exists() ? { id: snap.id, ...snap.data() } : null;
    } catch (e) { handleFirestoreError(e, 'get', `lessons/${id}`); }
  },

  // Leads
  getLeads: async () => {
    try {
      const q = query(collection(db, 'leads'), orderBy('status', 'desc'));
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (e) { handleFirestoreError(e, 'list', 'leads'); }
  },

  createLead: async (leadData: any) => {
    try {
      const res = await addDoc(collection(db, 'leads'), {
        ...leadData,
        status: leadData.status || 'new',
        createdAt: Timestamp.now()
      });
      return { id: res.id, ...leadData };
    } catch (e) { handleFirestoreError(e, 'create', 'leads'); }
  },

  updateLeadStatus: async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'leads', id), { status });
    } catch (e) { handleFirestoreError(e, 'update', `leads/${id}`); }
  },

  convertLeadToUser: async (leadId: string, cohortId: string) => {
    try {
      const leadSnap = await getDoc(doc(db, 'leads', leadId));
      if (!leadSnap.exists()) throw new Error('Lead not found');
      const lead = leadSnap.data();

      const cohortSnap = await getDoc(doc(db, 'cohorts', cohortId));
      if (!cohortSnap.exists()) throw new Error('Cohort not found');
      const cohort = cohortSnap.data();

      // Create profile in Firestore
      const newUserRef = doc(collection(db, 'users'));
      await setDoc(newUserRef, {
        name: lead.name,
        email: lead.email || `${lead.name.toLowerCase().replace(/\s+/g, '.')}@trustar.com`,
        role: 'student',
        studentType: lead.childAge ? 'child' : 'independent',
        country: lead.country || null,
        coinBalance: 0,
        points: 0,
        createdAt: Timestamp.now()
      });

      // Create enrollment
      await addDoc(collection(db, 'enrollments'), {
        studentId: newUserRef.id,
        cohortId: cohortId,
        courseId: cohort.courseId,
        status: 'active',
        enrolledAt: Timestamp.now()
      });

      // Update lead
      await updateDoc(doc(db, 'leads', leadId), { status: 'enrolled' });

      return { id: newUserRef.id, name: lead.name, role: 'student' };
    } catch (e) { handleFirestoreError(e, 'write', 'conversion'); }
  },

  // Resources
  getResources: async () => {
    try {
      const snap = await getDocs(collection(db, 'resources'));
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (e) { handleFirestoreError(e, 'list', 'resources'); }
  },

  // Quizzes
  getQuizByLessonId: async (lessonId: string) => {
    try {
      const q = query(collection(db, 'quizzes'), where('lessonId', '==', lessonId));
      const snap = await getDocs(q);
      return snap.empty ? null : { id: snap.docs[0].id, ...snap.docs[0].data() };
    } catch (e) { handleFirestoreError(e, 'get', 'quizzes'); }
  },

  // Discussion
  getPostsByBoard: async (boardType: string, boardId: string) => {
    try {
      const q = query(
        collection(db, 'discussionPosts'), 
        where('boardType', '==', boardType), 
        where('boardId', '==', boardId),
        orderBy('isPinned', 'desc'),
        orderBy('createdAt', 'desc')
      );
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (e) { handleFirestoreError(e, 'list', 'discussionPosts'); }
  },

  createPost: async (postData: any) => {
    try {
      const res = await addDoc(collection(db, 'discussionPosts'), {
        ...postData,
        createdAt: Timestamp.now(),
        replyCount: 0,
        isPinned: false,
        isResolved: false
      });
      return { id: res.id, ...postData };
    } catch (e) { handleFirestoreError(e, 'create', 'discussionPosts'); }
  },

  // Leaderboard
  getLeaderboardByCohortId: async (cohortId: string) => {
    try {
      // Basic implementation: get all enrollments and join with user points
      const q = query(collection(db, 'enrollments'), where('cohortId', '==', cohortId));
      const enrollSnap = await getDocs(q);
      const leaderboard = [];
      for (const edoc of enrollSnap.docs) {
        const studentId = edoc.data().studentId;
        const userSnap = await getDoc(doc(db, 'users', studentId));
        if (userSnap.exists()) {
          leaderboard.push({
            studentId,
            displayName: userSnap.data().name.split(' ')[0], // Simpler display
            totalPoints: userSnap.data().points || 0
          });
        }
      }
      return leaderboard.sort((a, b) => b.totalPoints - a.totalPoints);
    } catch (e) { handleFirestoreError(e, 'list', 'leaderboard'); }
  },

  // Wallet
  getTransactionsByUserId: async (userId: string) => {
    try {
      const q = query(collection(db, 'coinTransactions'), where('userId', '==', userId), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (e) { handleFirestoreError(e, 'list', 'coinTransactions'); }
  },

  // Submissions
  submitAssignment: async (submissionData: any) => {
    try {
      const res = await addDoc(collection(db, 'submissions'), {
        ...submissionData,
        status: 'pending',
        pointsAwarded: 0,
        createdAt: Timestamp.now()
      });
      
      // Update student points (basic reward)
      if (submissionData.studentId) {
        const userRef = doc(db, 'users', submissionData.studentId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const currentPoints = userSnap.data().points || 0;
          await updateDoc(userRef, { points: currentPoints + 15 });
        }
      }

      return { id: res.id, ...submissionData };
    } catch (e) { handleFirestoreError(e, 'create', 'submissions'); }
  },

  getSubmissionsByStudentId: async (studentId: string) => {
    try {
      const q = query(collection(db, 'submissions'), where('studentId', '==', studentId), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (e) { handleFirestoreError(e, 'list', 'submissions'); }
  },

  getSubmissionsByCohortId: async (cohortId: string) => {
    try {
      const q = query(collection(db, 'submissions'), where('cohortId', '==', cohortId), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (e) { handleFirestoreError(e, 'list', 'submissions'); }
  },

  getAllSubmissions: async () => {
    try {
      const q = query(collection(db, 'submissions'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (e) { handleFirestoreError(e, 'list', 'submissions'); }
  },

  gradeSubmission: async (submissionId: string, status: 'approved' | 'rejected', points: number, feedback: string) => {
    try {
      await updateDoc(doc(db, 'submissions', submissionId), {
        status,
        pointsAwarded: points,
        instructorFeedback: feedback,
        gradedAt: Timestamp.now()
      });
    } catch (e) { handleFirestoreError(e, 'update', `submissions/${submissionId}`); }
  },

  // Organizations
  getOrganizations: async () => {
    try {
      const snap = await getDocs(collection(db, 'organizations'));
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (e) { handleFirestoreError(e, 'list', 'organizations'); }
  },

  // Dashboard stats
  getDashboardStats: async () => {
    try {
      const uSnap = await getDocs(query(collection(db, 'users'), where('role', '==', 'student')));
      const cSnap = await getDocs(collection(db, 'cohorts'));
      const lSnap = await getDocs(collection(db, 'leads'));
      const tSnap = await getDocs(collection(db, 'tracks'));

      return {
        totalStudents: uSnap.size,
        totalCohorts: cSnap.size,
        activeCohorts: cSnap.docs.filter(d => d.data().status === 'active').length,
        totalLeads: lSnap.size,
        newLeads: lSnap.docs.filter(d => d.data().status === 'new').length,
        totalTracks: tSnap.size,
      };
    } catch (e) { handleFirestoreError(e, 'get', 'stats'); }
  }
};
