import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { createProfile } from '../lib/api/profiles';
import { ROUTES } from '../utils/constants';
import { handleAuthError } from '../lib/errors/handlers';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      throw handleAuthError(error);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { data: { user }, error } = await supabase.auth.signUp({ 
        email, 
        password 
      });
      
      if (error) throw error;
      if (!user) throw new Error('User creation failed');

      // Create user profile
      await createProfile(user.id, fullName);
      
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      throw handleAuthError(error);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate(ROUTES.LOGIN);
    } catch (error) {
      throw handleAuthError(error);
    }
  };

  return {
    user,
    isLoading,
    signIn,
    signUp,
    signOut
  };
}