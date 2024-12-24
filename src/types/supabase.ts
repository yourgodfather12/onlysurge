export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          avatar_url: string | null
          display_name: string | null
          bio: string | null
          created_at: string
          updated_at: string
        }
      }
      platform_connections: {
        Row: {
          id: string
          user_id: string
          platform: 'onlyfans' | 'fansly'
          username: string
          access_token: string
          refresh_token: string | null
          expires_at: string | null
          created_at: string
          updated_at: string
        }
      }
    }
  }
} 