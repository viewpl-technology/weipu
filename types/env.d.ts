interface Window {
  ENV?: {
    NEXT_PUBLIC_SUPABASE_URL?: string
    NEXT_PUBLIC_SUPABASE_ANON_KEY?: string
    NEXT_PUBLIC_COMMIT_HASH?: string
    [key: string]: string | undefined
  }
}
