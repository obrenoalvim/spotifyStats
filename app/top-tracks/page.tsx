'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import TrackCard from '@/components/TrackCard';
import TimeRangeSelector from '@/components/TimeRangeSelector';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useSpotifyAuth, useTopTracks } from '@/hooks/useSpotify';

export default function TopTracksPage() {
  const { isAuthenticated, loading: authLoading } = useSpotifyAuth();
  const [timeRange, setTimeRange] = useState<'short_term' | 'medium_term' | 'long_term'>('medium_term');
  const { tracks, loading: tracksLoading } = useTopTracks(timeRange);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-green-500/5">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Top Tracks 🎵</h1>
          <p className="text-muted-foreground text-lg">
            Discover your most played songs and generate custom wallpapers
          </p>
        </div>

        <div className="mb-8">
          <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {timeRange === 'short_term' && 'Last 4 Weeks'}
            {timeRange === 'medium_term' && 'Last 6 Months'}
            {timeRange === 'long_term' && 'All Time'}
          </h2>
          <Badge variant="outline">
            {tracks?.items.length || 0} tracks
          </Badge>
        </div>

        <div className="space-y-4">
          {tracksLoading ? (
            <LoadingSpinner text="Loading your top tracks..." />
          ) : tracks?.items.length ? (
            tracks.items.map((track, index) => (
              <TrackCard key={track.id} track={track} rank={index + 1} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No tracks found for this time period. Try listening to more music!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}