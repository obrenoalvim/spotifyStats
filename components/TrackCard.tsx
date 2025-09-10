'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Clock, ImageIcon } from 'lucide-react';
import { SpotifyTrack } from '@/types/spotify';

interface TrackCardProps {
  track: SpotifyTrack;
  rank?: number;
  showWallpaperButton?: boolean;
}

export default function TrackCard({ track, rank, showWallpaperButton = true }: TrackCardProps) {
  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${parseInt(seconds) < 10 ? '0' : ''}${seconds}`;
  };

  const generateWallpaper = () => {
    const spotifyUrl = track.external_urls.spotify;
    const wallpaperUrl = `${process.env.NEXT_PUBLIC_SPOTIPAPER_URL}?url=${encodeURIComponent(spotifyUrl)}`;
    window.open(wallpaperUrl, '_blank');
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-background to-muted/30">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {rank && (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">
              {rank}
            </div>
          )}
          
          <div className="relative flex-shrink-0">
            <Image
              src={track.album.images[0]?.url || '/placeholder.png'}
              alt={`${track.album.name} cover`}
              width={80}
              height={80}
              className="rounded-lg shadow-md"
            />
            <div className="absolute inset-0 bg-black/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <ExternalLink className="w-5 h-5 text-white" />
            </div>
          </div>

          <div className="flex-grow min-w-0">
            <h3 className="font-semibold text-lg truncate hover:text-green-500 transition-colors cursor-pointer">
              {track.name}
            </h3>
            <p className="text-muted-foreground truncate">
              {track.artists.map((artist) => artist.name).join(', ')}
            </p>
            <p className="text-sm text-muted-foreground truncate mt-1">
              {track.album.name}
            </p>
            
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="w-3 h-3 mr-1" />
                {formatDuration(track.duration_ms)}
              </div>
              <Badge variant="secondary" className="text-xs">
                {track.popularity}% popular
              </Badge>
            </div>
          </div>

          <div className="flex flex-col gap-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(track.external_urls.spotify, '_blank')}
              className="hover:bg-green-500/10 hover:text-green-500"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
            
            {showWallpaperButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={generateWallpaper}
                className="hover:bg-purple-500/10 hover:text-purple-500"
                title="Generate Wallpaper"
              >
                <ImageIcon className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}