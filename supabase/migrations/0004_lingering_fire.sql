/*
  # Fix storage policies and authentication checks

  1. Updates
    - Add session validation
    - Improve RLS policies
    - Fix authentication checks
*/

-- Ensure authenticated users have proper access
CREATE OR REPLACE FUNCTION auth.is_valid_session()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (auth.role() = 'authenticated' AND auth.uid() IS NOT NULL);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update storage policies
CREATE OR REPLACE POLICY "Authenticated upload policy"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'medical-images'
  AND auth.is_valid_session()
);

-- Update medical records policies
CREATE OR REPLACE POLICY "Authenticated create policy"
ON medical_records
FOR INSERT
TO authenticated
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