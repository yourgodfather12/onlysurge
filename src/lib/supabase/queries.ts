import { supabase } from '../supabase'
import { Database } from '../database.types'

type Profile = Database['public']['Tables']['profiles']['Row']
type Subscription = Database['public']['Tables']['subscriptions']['Row']
type Onboarding = Database['public']['Tables']['onboarding']['Row']

export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching profile:', error)
    return null
  }

  return data
}

export async function updateProfile(userId: string, updates: Partial<Profile>) {
  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)

  if (error) {
    console.error('Error updating profile:', error)
    throw error
  }
}

export async function getSubscription(userId: string): Promise<Subscription | null> {
  const { data, error } = await supabase
    .from('subscriptions')
    .select()
    .eq('user_id', userId)
    .single()

  if (error) {
    console.error('Error fetching subscription:', error)
    return null
  }

  return data
}

export async function getOnboardingStatus(userId: string): Promise<Onboarding | null> {
  const { data, error } = await supabase
    .from('onboarding')
    .select()
    .eq('user_id', userId)
    .single()

  if (error) {
    console.error('Error fetching onboarding status:', error)
    return null
  }

  return data
}

export async function updateOnboardingStatus(
  userId: string,
  updates: { steps_completed?: string[]; is_complete?: boolean }
) {
  const { error } = await supabase
    .from('onboarding')
    .update({
      ...updates,
      completed_at: updates.is_complete ? new Date().toISOString() : null,
    })
    .eq('user_id', userId)

  if (error) {
    console.error('Error updating onboarding status:', error)
    throw error
  }
} 