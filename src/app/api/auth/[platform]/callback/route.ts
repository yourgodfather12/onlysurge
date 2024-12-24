import { NextRequest } from 'next/server';
import { connectPlatform, type Platform } from '@/lib/platform-auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { platform: string } }
) {
  try {
    const platform = params.platform as Platform;
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    if (error || !code) {
      console.error('OAuth error:', error, errorDescription);
      return Response.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?error=${
          errorDescription || 'Failed to connect platform'
        }`
      );
    }

    const success = await connectPlatform(platform, code);

    if (!success) {
      return Response.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?error=Failed to connect platform`
      );
    }

    return Response.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?success=Platform connected successfully`
    );
  } catch (error) {
    console.error('Error in platform callback:', error);
    return Response.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?error=An unexpected error occurred`
    );
  }
} 