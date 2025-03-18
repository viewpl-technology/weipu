-- supabase/migrations/20250313134033_initial_schema.sql

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Profiles table (extends the auth.users table provided by Supabase)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Set up Row Level Security (RLS) for the profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profile access
CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles 
  FOR SELECT 
  USING (true);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- Post categories
CREATE TABLE IF NOT EXISTS public.post_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key INTEGER UNIQUE NOT NULL,
  value TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS for post categories
ALTER TABLE public.post_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Post categories are viewable by everyone" 
  ON public.post_categories 
  FOR SELECT 
  USING (true);

CREATE POLICY "Only admins can insert post categories" 
  ON public.post_categories 
  FOR INSERT 
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role')::text = 'admin');

CREATE POLICY "Only admins can update post categories" 
  ON public.post_categories 
  FOR UPDATE 
  USING ((auth.jwt() -> 'app_metadata' ->> 'role')::text = 'admin');

-- Blog posts
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT,
  category_id UUID REFERENCES public.post_categories(id) NOT NULL,
  published BOOLEAN NOT NULL DEFAULT false,
  author_id UUID REFERENCES auth.users(id) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS for posts
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published posts are viewable by everyone" 
  ON public.posts 
  FOR SELECT 
  USING (published = true AND active = true);

CREATE POLICY "Users can view all their own posts" 
  ON public.posts 
  FOR SELECT 
  USING (auth.uid() = author_id);

CREATE POLICY "Users can insert their own posts" 
  ON public.posts 
  FOR INSERT 
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own posts" 
  ON public.posts 
  FOR UPDATE 
  USING (auth.uid() = author_id);

CREATE POLICY "Only admins can insert posts" 
  ON public.posts 
  FOR INSERT 
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role')::text = 'admin');

CREATE POLICY "Only admins can update posts" 
  ON public.posts 
  FOR UPDATE 
  USING ((auth.jwt() -> 'app_metadata' ->> 'role')::text = 'admin');

-- Functions and triggers

-- Function to automatically set the updated_at timestamp
CREATE OR REPLACE FUNCTION update_modified_column() 
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW; 
END;
$$ LANGUAGE plpgsql;

-- Apply the updated_at trigger to all tables
CREATE TRIGGER update_profiles_modtime
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_post_categories_modtime
    BEFORE UPDATE ON public.post_categories
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_posts_modtime
    BEFORE UPDATE ON public.posts
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create a profile when a new user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert default post category
INSERT INTO public.post_categories (key, value)
VALUES (0, 'Blog')
ON CONFLICT (key) DO NOTHING;