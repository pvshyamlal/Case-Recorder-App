import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '../supabase';
import { MedicalRecord } from '../../types';
import { handleError } from '../utils/error';

export async function checkCaseNumberExists(caseNumber: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('medical_records')
      .select('id')
      .eq('case_number', caseNumber)
      .maybeSingle();
    
    if (error) throw error;
    return !!data;
  } catch (error) {
    handleError('Error checking case number', error);
    return false;
  }
}

export async function createRecord(record: Omit<MedicalRecord, 'id' | 'created_at' | 'updated_at'>): Promise<MedicalRecord | null> {
  try {
    const { data, error } = await supabase
      .from('medical_records')
      .insert([record])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    handleError('Error creating record', error);
    throw error;
  }
}