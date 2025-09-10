'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, TrendingUp, Users, ImageIcon } from 'lucide-react';
import { useSpotifyAuth } from '@/hooks/useSpotify';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Home() {
  const { isAuthenticated, loading, login } = useSpotifyAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Redirecting to dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-green-500/5">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-400 rounded-full flex items-center justify-center shadow-xl">
              <Music className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-500 via-green-400 to-emerald-400 bg-clip-text text-transparent mb-6">
            SpotifyStats
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Discover your music taste with detailed analytics, top tracks, artists, and generate stunning wallpapers from your favorite albums.
          </p>
          
          <Button
            onClick={login}
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Music className="w-5 h-5 mr-2" />
            Connect with Spotify
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader>
              <TrendingUp className="w-12 h-12 mx-auto text-green-500 mb-2" />
              <CardTitle>Top Tracks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Discover your most played songs across different time periods
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader>
              <Users className="w-12 h-12 mx-auto text-blue-500 mb-2" />
              <CardTitle>Top Artists</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Explore your favorite artists and their popularity metrics
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader>
              <Music className="w-12 h-12 mx-auto text-purple-500 mb-2" />
              <CardTitle>Detailed Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Get insights into your listening habits and music preferences
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader>
              <ImageIcon className="w-12 h-12 mx-auto text-orange-500 mb-2" />
              <CardTitle>Custom Wallpapers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Generate beautiful wallpapers from your favorite album covers
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Powered by Spotify Web API • Generate wallpapers with SpotiPaper
          </p>
          <div className="flex justify-center gap-4 text-xs text-muted-foreground">
            <span>✨ Real-time data</span>
            <span>🎨 Beautiful design</span>
            <span>📱 Mobile optimized</span>
            <span>🌙 Dark mode</span>
          </div>
        </div>
      </div>
    </div>
  );
}