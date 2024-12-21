import { supabase } from '../supabase';
import { handleAuthError } from '../errors/handlers';

export async function createProfile(userId: string, fullName: string) {
  try {
    const { error } = await supabase
      .from('profiles')
      .insert([{ id: userId, full_name: fullName }]);

    if (error) throw error;
  } catch (error) {
    throw handleAuthError(error);
  }
}

export async function getProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    throw handleAuthError(error);
  }
}

export async function updateProfile(userId: string, updates: { full_name?: string }) {
  try {
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);

    if (error) throw error;
  } catch (error) {
    throw handleAuthError(error);
  }
}