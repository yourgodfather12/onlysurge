export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
          updated_at: string
          created_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          updated_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          updated_at?: string
          created_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          status: 'trialing' | 'active' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'unpaid'
          price_id: string | null
          quantity: number | null
          cancel_at_period_end: boolean | null
          cancel_at: string | null
          canceled_at: string | null
          current_period_start: string | null
          current_period_end: string | null
          created_at: string
          ended_at: string | null
          trial_start: string | null
          trial_end: string | null
        }
        Insert: {
          id?: string
          user_id: string
          status?: 'trialing' | 'active' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'unpaid'
          price_id?: string | null
          quantity?: number | null
          cancel_at_period_end?: boolean | null
          cancel_at?: string | null
          canceled_at?: string | null
          current_period_start?: string | null
          current_period_end?: string | null
          created_at?: string
          ended_at?: string | null
          trial_start?: string | null
          trial_end?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          status?: 'trialing' | 'active' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'unpaid'
          price_id?: string | null
          quantity?: number | null
          cancel_at_period_end?: boolean | null
          cancel_at?: string | null
          canceled_at?: string | null
          current_period_start?: string | null
          current_period_end?: string | null
          created_at?: string
          ended_at?: string | null
          trial_start?: string | null
          trial_end?: string | null
        }
      }
      onboarding: {
        Row: {
          id: string
          user_id: string
          steps_completed: string[]
          is_complete: boolean
          created_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          steps_completed?: string[]
          is_complete?: boolean
          created_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          steps_completed?: string[]
          is_complete?: boolean
          created_at?: string
          completed_at?: string | null
        }
      }
    }
  }
} 