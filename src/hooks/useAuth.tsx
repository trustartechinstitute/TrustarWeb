import * as React from "react";
import { useState, useEffect, createContext, useContext } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, query, where, collection, getDocs } from 'firebase/firestore';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (uid: string, email: string | null) => {
    try {
      const userRef = doc(db, 'users', uid);
      let userSnap = await getDoc(userRef);
      
      // If profile doesn't exist, check if there is an ORPHANED profile (pre-created by Admin)
      if (!userSnap.exists() && email) {
        // Find profile by email
        const q = query(collection(db, 'users'), where('email', '==', email.toLowerCase()));
        const snap = await getDocs(q);
        
        if (!snap.empty) {
          const profileDoc = snap.docs[0];
          const profileData = profileDoc.data();
          
          // Link this UID to the pre-existing profile
          // IMPORTANT: If the profileDoc ID was 'trustar_admin' or a temporary ID, 
          // we migrate it to the real UID
          await setDoc(userRef, {
            ...profileData,
            authId: uid, // Track original auth mapping
            updatedAt: new Date().toISOString()
          });

          // If the profile was at a dummy ID, delete the dummy
          if (profileDoc.id !== uid) {
            // we'll keep it for now or delete it
          }
          
          userSnap = await getDoc(userRef);
        }
      }

      if (userSnap.exists()) {
        return { id: uid, ...userSnap.data() };
      }
      return null;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        const profile = await fetchUserProfile(firebaseUser.uid, firebaseUser.email);
        if (profile) {
          setUser(profile);
        } else {
          setUser({ id: firebaseUser.uid, email: firebaseUser.email, role: 'student' });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const profile = await fetchUserProfile(result.user.uid, result.user.email);
    setUser(profile);
    return profile;
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const register = async (email: string, password: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const profile = await fetchUserProfile(result.user.uid, result.user.email);
    setUser(profile);
    return profile;
  };

  const signup = async (email: string, password: string) => {
    return register(email, password);
  };

  const refreshUser = async () => {
    if (user?.id) {
      const profile = await fetchUserProfile(user.id, user.email || null);
      setUser(profile);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, refreshUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
