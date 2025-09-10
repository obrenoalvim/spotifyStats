'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Users } from 'lucide-react';
import { SpotifyArtist } from '@/types/spotify';

interface ArtistCardProps {
  artist: SpotifyArtist;
  rank?: number;
}

export default function ArtistCard({ artist, rank }: ArtistCardProps) {
  const formatFollowers = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
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
              src={artist.images[0]?.url || '/placeholder.png'}
              alt={`${artist.name} photo`}
              width={80}
              height={80}
              className="rounded-full shadow-md object-cover"
            />
            <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <ExternalLink className="w-5 h-5 text-white" />
            </div>
          </div>

          <div className="flex-grow min-w-0">
            <h3 className="font-semibold text-lg truncate hover:text-green-500 transition-colors cursor-pointer">
              {artist.name}
            </h3>
            
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <Users className="w-3 h-3 mr-1" />
              {formatFollowers(artist.followers.total)} followers
            </div>
            
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <Badge variant="secondary" className="text-xs">
                {artist.popularity}% popular
              </Badge>
            </div>

            <div className="flex flex-wrap gap-1 mt-2">
              {artist.genres.slice(0, 3).map((genre, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(artist.external_urls.spotify, '_blank')}
              className="hover:bg-green-500/10 hover:text-green-500"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}