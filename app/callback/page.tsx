'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { spotifyApi } from '@/lib/spotify';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get('access_token');
      
      if (token) {
        spotifyApi.setToken(token);
        router.push('/dashboard');
      } else {
        router.push('/');
      }
    } else {
      router.push('/');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size="lg" text="Authenticating with Spotify..." />
    </div>
  );
}