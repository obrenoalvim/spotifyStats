'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, MapPin, ExternalLink, Crown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useSpotifyAuth } from '@/hooks/useSpotify';

export default function ProfilePage() {
  const { isAuthenticated, user, loading: authLoading } = useSpotifyAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const formatFollowers = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-green-500/5">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8 overflow-hidden bg-gradient-to-br from-background to-muted/30">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="relative">
                  <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden shadow-2xl">
                    {user.images?.[0]?.url ? (
                      <Image
                        src={user.images[0].url}
                        alt={user.display_name}
                        width={192}
                        height={192}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-green-500 to-green-400 flex items-center justify-center text-white text-4xl md:text-6xl font-bold">
                        {user.display_name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 shadow-lg">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="flex-grow text-center md:text-left">
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">
                    {user.display_name}
                  </h1>
                  <p className="text-muted-foreground text-lg mb-4">
                    {user.email}
                  </p>

                  <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-green-500" />
                      <span className="font-semibold">
                        {formatFollowers(user.followers?.total || 0)} followers
                      </span>
                    </div>
                    
                    {user.country && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-5 h-5 text-blue-500" />
                        <span className="font-semibold">{user.country}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center md:justify-start">
                    <Button
                      onClick={() => window.open(`https://open.spotify.com/user/${user.id}`, '_blank')}
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open in Spotify
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-lg">Account Type</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary" className="text-lg py-2 px-4">
                  Premium User
                </Badge>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-lg">Total Followers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500">
                  {formatFollowers(user.followers?.total || 0)}
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-lg">Country</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">
                  {user.country || 'Not specified'}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold mb-4">About Your Spotify Account</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your Spotify account is connected and ready! You can now explore your personalized music statistics, 
              discover your top tracks and artists, and generate beautiful wallpapers from your favorite album covers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}