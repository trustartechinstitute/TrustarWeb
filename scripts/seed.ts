import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, setDoc, doc } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json' assert { type: 'json' };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function seed() {
  console.log('Seeding Trustar Master Curriculum...');

  // 1. Create Foundations Track
  const trackRef = await addDoc(collection(db, 'tracks'), {
    title: 'Foundations',
    description: 'The starting point for every young innovator. Ages 4-7.',
    color: '#FFD700'
  });

  // 2. Create Master Course
  const courseRef = await addDoc(collection(db, 'courses'), {
    trackId: trackRef.id,
    title: 'Digital Explorers',
    description: 'Master the basics of computing and block-based programming.',
    durationWeeks: 12
  });

  // 3. Create Sample Lesson (Week 1)
  await addDoc(collection(db, 'lessons'), {
    courseId: courseRef.id,
    title: 'Computer Confidence',
    week: 1,
    session: 1,
    status: 'published',
    contentBlocks: [
      { type: 'text', content: '<h3>Welcome to Trustar!</h3><p>Today we meet our computers.</p>' }
    ],
    practiceInstructions: 'Touch the screen and move the cat!',
    assignmentInstructions: 'Create your first character.',
    assignmentRequired: true
  });

  // 4. Create an Admin User (You)
  // Note: Replace with your actual email if you want to login
  await setDoc(doc(db, 'users', 'admin_1'), {
    name: 'Trustar Admin',
    email: 'trustartechinstitute@gmail.com',
    role: 'admin',
    coinBalance: 9999,
    points: 0,
    createdAt: new Date().toISOString()
  });

  console.log('Seed completed successfully!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
