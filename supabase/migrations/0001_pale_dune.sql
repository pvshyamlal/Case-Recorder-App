/*
  # Medical Records Management Schema

  1. New Tables
    - `medical_records`
      - `id` (uuid, primary key)
      - `case_number` (text, unique)
      - `date` (date)
      - `description` (text)
      - `images` (text array)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `medical_records` table
    - Add policies for authenticated users to manage records
*/

CREATE TABLE IF NOT EXISTS medical_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_number text UNIQUE NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  description text,
  images text[] DEFAULT ARRAY[]::text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE medical_records ENABLE ROW LEVEL SECURITY;

-- Policy to allow authenticated users to read all records
CREATE POLICY "Users can read all records"
  ON medical_records
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy to allow authenticated users to insert records
CREATE POLICY "Users can insert records"
  ON medical_records
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy to allow authenticated users to update records
CREATE POLICY "Users can update records"
  ON medical_records
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update the updated_at column
CREATE TRIGGER update_medical_records_updated_at
  BEFORE UPDATE ON medical_records
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();