interface Window {
  ENV?: {
    NEXT_PUBLIC_SUPABASE_URL?: string
    NEXT_PUBLIC_SUPABASE_ANON_KEY?: string
    NEXT_PUBLIC_RELEASE_COMMIT_HASH?: string
    NEXT_PUBLIC_RELEASE_VERSION?: string
    NEXT_PUBLIC_RELEASE_DATETIME?: string
    [key: string]: string | undefined
  }
}
