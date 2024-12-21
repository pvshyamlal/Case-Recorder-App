/*
  # Create storage bucket for medical images

  1. Storage
    - Creates a new storage bucket for medical images
    - Sets appropriate security policies
*/

-- Create the storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('medical-images', 'medical-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload images
CREATE POLICY "Allow authenticated users to upload images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'medical-images'
  AND LENGTH(name) > 1
);

-- Allow public access to images
CREATE POLICY "Allow public access to images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'medical-images');