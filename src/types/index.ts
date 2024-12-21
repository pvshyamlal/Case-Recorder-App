export interface MedicalRecord {
  id: string;
  case_number: string;
  date: string;
  description?: string;
  images: string[];
  created_at: string;
  updated_at: string;
}

export interface SearchFilters {
  case_number?: string;
  start_date?: string;
  end_date?: string;
}