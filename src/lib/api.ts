import { supabase } from './supabase';
import { MedicalRecord } from '../types';

export async function checkCaseNumberExists(caseNumber: string): Promise<boolean> {
  const { data } = await supabase
    .from('medical_records')
    .select('case_number')
    .eq('case_number', caseNumber)
    .single();
  
  return !!data;
}

export async function createRecord(record: Omit<MedicalRecord, 'id' | 'created_at' | 'updated_at'>): Promise<MedicalRecord | null> {
  const { data, error } = await supabase
    .from('medical_records')
    .insert([record])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateRecord(id: string, record: Partial<MedicalRecord>): Promise<MedicalRecord | null> {
  const { data, error } = await supabase
    .from('medical_records')
    .update(record)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function searchRecords(filters: {
  case_number?: string;
  start_date?: string;
  end_date?: string;
}): Promise<MedicalRecord[]> {
  let query = supabase
    .from('medical_records')
    .select('*')
    .order('date', { ascending: false });

  if (filters.case_number) {
    query = query.ilike('case_number', `%${filters.case_number}%`);
  }

  if (filters.start_date) {
    query = query.gte('date', filters.start_date);
  }

  if (filters.end_date) {
    query = query.lte('date', filters.end_date);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function uploadImage(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('medical-images')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from('medical-images')
    .getPublicUrl(filePath);

  return data.publicUrl;
}