import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export type Platform = 'onlyfans' | 'fansly';

interface PlatformConfig {
  name: Platform;
  authUrl: string;
  tokenUrl: string;
  apiUrl: string;
  scopes: string[];
}

const platformConfigs: Record<Platform, PlatformConfig> = {
  onlyfans: {
    name: 'onlyfans',
    authUrl: 'https://onlyfans.com/api/oauth/authorize',
    tokenUrl: 'https://onlyfans.com/api/oauth/token',
    apiUrl: 'https://onlyfans.com/api/v2',
    scopes: ['basic', 'content', 'messages', 'subscribers'],
  },
  fansly: {
    name: 'fansly',
    authUrl: 'https://fansly.com/oauth/authorize',
    tokenUrl: 'https://fansly.com/oauth/token',
    apiUrl: 'https://api.fansly.com/api/v1',
    scopes: ['basic', 'content', 'messages', 'subscribers'],
  },
};

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export async function connectPlatform(platform: Platform, code: string): Promise<boolean> {
  try {
    const config = platformConfigs[platform];
    const response = await fetch(config.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: platform === 'onlyfans' 
          ? process.env.ONLYFANS_CLIENT_ID 
          : process.env.FANSLY_API_KEY,
        client_secret: platform === 'onlyfans' 
          ? process.env.ONLYFANS_CLIENT_SECRET 
          : undefined,
        grant_type: 'authorization_code',
        code,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to connect ${platform}`);
    }

    const auth: AuthResponse = await response.json();
    const { data: user } = await supabase.auth.getUser();

    if (!user?.user?.id) {
      throw new Error('User not authenticated');
    }

    // Store platform credentials in Supabase
    const { error } = await supabase
      .from('platforms')
      .upsert({
        user_id: user.user.id,
        platform,
        credentials: {
          access_token: auth.access_token,
          refresh_token: auth.refresh_token,
          expires_at: new Date(Date.now() + auth.expires_in * 1000).toISOString(),
        },
        is_active: true,
      });

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error connecting platform:', error);
    return false;
  }
}

export async function disconnectPlatform(platform: Platform): Promise<boolean> {
  try {
    const { data: user } = await supabase.auth.getUser();

    if (!user?.user?.id) {
      throw new Error('User not authenticated');
    }

    const { error } = await supabase
      .from('platforms')
      .update({ is_active: false })
      .match({ user_id: user.user.id, platform });

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error disconnecting platform:', error);
    return false;
  }
}

export async function refreshPlatformToken(platform: Platform): Promise<boolean> {
  try {
    const { data: user } = await supabase.auth.getUser();

    if (!user?.user?.id) {
      throw new Error('User not authenticated');
    }

    // Get current platform credentials
    const { data: platformData, error: fetchError } = await supabase
      .from('platforms')
      .select('credentials')
      .match({ user_id: user.user.id, platform })
      .single();

    if (fetchError || !platformData) {
      throw new Error('Platform credentials not found');
    }

    const config = platformConfigs[platform];
    const response = await fetch(config.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: platform === 'onlyfans' 
          ? process.env.ONLYFANS_CLIENT_ID 
          : process.env.FANSLY_API_KEY,
        client_secret: platform === 'onlyfans' 
          ? process.env.ONLYFANS_CLIENT_SECRET 
          : undefined,
        grant_type: 'refresh_token',
        refresh_token: platformData.credentials.refresh_token,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to refresh ${platform} token`);
    }

    const auth: AuthResponse = await response.json();

    // Update platform credentials in Supabase
    const { error: updateError } = await supabase
      .from('platforms')
      .update({
        credentials: {
          access_token: auth.access_token,
          refresh_token: auth.refresh_token,
          expires_at: new Date(Date.now() + auth.expires_in * 1000).toISOString(),
        },
      })
      .match({ user_id: user.user.id, platform });

    if (updateError) {
      throw updateError;
    }

    return true;
  } catch (error) {
    console.error('Error refreshing platform token:', error);
    return false;
  }
}

export function getPlatformAuthUrl(platform: Platform): string {
  const config = platformConfigs[platform];
  const clientId = platform === 'onlyfans' 
    ? process.env.ONLYFANS_CLIENT_ID 
    : process.env.FANSLY_API_KEY;
  
  const params = new URLSearchParams({
    client_id: clientId!,
    response_type: 'code',
    scope: config.scopes.join(' '),
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/${platform}/callback`,
  });

  return `${config.authUrl}?${params.toString()}`;
}

export async function getPlatformStatus(platform: Platform): Promise<boolean> {
  try {
    const { data: user } = await supabase.auth.getUser();

    if (!user?.user?.id) {
      return false;
    }

    const { data, error } = await supabase
      .from('platforms')
      .select('is_active')
      .match({ user_id: user.user.id, platform })
      .single();

    if (error || !data) {
      return false;
    }

    return data.is_active;
  } catch (error) {
    console.error('Error checking platform status:', error);
    return false;
  }
} 