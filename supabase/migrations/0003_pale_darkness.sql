/*
  # Fix storage policies for medical images

  1. Security Updates
    - Adds proper RLS policies for storage
    - Fixes unauthorized access issues
    - Ensures proper bucket configuration
*/

-- Ensure bucket exists with proper configuration
INSERT INTO storage.buckets (id, name, public)
VALUES ('medical-images', 'medical-images', true)
ON CONFLICT (id) DO UPDATE
SET public = true;

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Allow authenticated users to upload images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to images" ON storage.objects;

-- Allow authenticated users to upload images
CREATE POLICY "Allow authenticated users to upload images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'medical-images'
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to update their own uploads
CREATE POLICY "Allow users to update their uploads"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'medical-images'
  AND owner = auth.uid()
)
WITH CHECK (
  bucket_id = 'medical-images'
  AND owner = auth.uid()
);

-- Allow public read access to all images
CREATE POLICY "Allow public read access to images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'medical-images');

-- Set default owner on upload
CREATE OR REPLACE FUNCTION storage.set_storage_object_owner()
RETURNS TRIGGER AS $$
BEGIN
  NEW.owner = auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for setting owner
DROP TRIGGER IF EXISTS set_storage_object_owner_trigger ON storage.objects;
CREATE TRIGGER set_storage_object_owner_trigger
  BEFORE INSERT ON storage.objects
  FOR EACH ROW
  EXECUTE FUNCTION storage.set_storage_object_owner();