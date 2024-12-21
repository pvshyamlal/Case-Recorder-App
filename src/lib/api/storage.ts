import { supabase } from '../supabase';
import { validateImage } from '../utils/validation';
import { generateFileName } from '../utils/file';
import { handleError } from '../utils/error';

export async function uploadImage(file: File): Promise<string> {
  try {
    validateImage(file);
    const fileName = generateFileName(file);

    const { error: uploadError } = await supabase.auth.getSession();
    if (uploadError) {
      throw new Error('Authentication required for uploading images');
    }

    const { error } = await supabase.storage
      .from('medical-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    const { data } = supabase.storage
      .from('medical-images')
      .getPublicUrl(fileName);

    return data.publicUrl;
  } catch (error) {
    handleError('Image upload failed', error);
    throw error;
  }
}