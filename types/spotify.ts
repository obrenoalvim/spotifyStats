export interface SpotifyUser {
  id: string;
  display_name: string;
  email: string;
  images: Array<{ url: string; height: number; width: number }>;
  followers: { total: number };
  country: string;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  duration_ms: number;
  popularity: number;
  preview_url: string | null;
  external_urls: { spotify: string };
}

export interface SpotifyArtist {
  id: string;
  name: string;
  genres: string[];
  images: Array<{ url: string; height: number; width: number }>;
  followers: { total: number };
  popularity: number;
  external_urls: { spotify: string };
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  images: Array<{ url: string; height: number; width: number }>;
  release_date: string;
  total_tracks: number;
  external_urls: { spotify: string };
}

export interface SpotifyTopItems<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
}

export interface PlaybackState {
  is_playing: boolean;
  item: SpotifyTrack | null;
  progress_ms: number;
}