/*
  # Improve authentication and security

  1. Updates
    - Add session validation function
    - Update storage policies
    - Enhance medical records security
*/

-- Create auth schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS auth;

-- Create session validation function
CREATE OR REPLACE FUNCTION auth.is_valid_session()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (auth.role() = 'authenticated' AND auth.uid() IS NOT NULL);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Authenticated upload policy" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated create policy" ON medical_records;

-- Create new storage policy
CREATE POLICY "Authenticated upload policy"
ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'medical-images'
  AND auth.is_valid_session()
);

-- Create new medical records policy
CREATE POLICY "Authenticated create policy"
ON medical_records
FOR INSERT TO authenticated
WITH CHECK (
  auth.is_valid_session()
);

-- Ensure bucket configuration
DO $$
BEGIN
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('medical-images', 'medical-images', true)
  ON CONFLICT (id) DO UPDATE
  SET public = true;
END $$;