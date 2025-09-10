'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Music, Users, TrendingUp, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import TrackCard from '@/components/TrackCard';
import ArtistCard from '@/components/ArtistCard';
import TimeRangeSelector from '@/components/TimeRangeSelector';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useSpotifyAuth, useTopTracks, useTopArtists } from '@/hooks/useSpotify';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { isAuthenticated, user, loading: authLoading } = useSpotifyAuth();
  const [timeRange, setTimeRange] = useState<'short_term' | 'medium_term' | 'long_term'>('medium_term');
  const { tracks, loading: tracksLoading } = useTopTracks(timeRange);
  const { artists, loading: artistsLoading } = useTopArtists(timeRange);
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

  if (!isAuthenticated) {
    return null;
  }

  const topTracks = tracks?.items.slice(0, 5) || [];
  const topArtists = artists?.items.slice(0, 5) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-green-500/5">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome back, {user?.display_name}! 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            Here's your music overview for the selected period
          </p>
        </div>

        <div className="mb-8">
          <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500/10 to-green-400/5 border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tracks</CardTitle>
              <Music className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tracks?.items.length || 0}</div>
              <p className="text-xs text-muted-foreground">
                in your top list
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-400/5 border-blue-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Artists</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{artists?.items.length || 0}</div>
              <p className="text-xs text-muted-foreground">
                in your top list
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-400/5 border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Popularity</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {tracks?.items.length
                  ? Math.round(tracks.items.reduce((sum, track) => sum + track.popularity, 0) / tracks.items.length)
                  : 0}%
              </div>
              <p className="text-xs text-muted-foreground">
                of your tracks
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/10 to-orange-400/5 border-orange-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Duration</CardTitle>
              <Clock className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {tracks?.items.length
                  ? Math.round(tracks.items.reduce((sum, track) => sum + track.duration_ms, 0) / 60000)
                  : 0}m
              </div>
              <p className="text-xs text-muted-foreground">
                of top tracks
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Your Top Tracks</h2>
              <Badge variant="outline">Top 5</Badge>
            </div>
            
            <div className="space-y-4">
              {tracksLoading ? (
                <LoadingSpinner text="Loading your top tracks..." />
              ) : (
                topTracks.map((track, index) => (
                  <TrackCard key={track.id} track={track} rank={index + 1} />
                ))
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Your Top Artists</h2>
              <Badge variant="outline">Top 5</Badge>
            </div>
            
            <div className="space-y-4">
              {artistsLoading ? (
                <LoadingSpinner text="Loading your top artists..." />
              ) : (
                topArtists.map((artist, index) => (
                  <ArtistCard key={artist.id} artist={artist} rank={index + 1} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}