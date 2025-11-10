import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthContext: Checking session...');
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      console.log('AuthContext: Session check result:', { session: !!session, error });
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('AuthContext: Auth state changed:', { event: _event, session: !!session });
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      // First verify the current password by attempting to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({ 
        email: user.email, 
        password: currentPassword 
      });
      
      if (signInError) {
        throw new Error('Current password is incorrect');
      }

      // If current password is correct, update to new password
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, changePassword, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
