'use client';

import { useEffect, useState } from 'react';
import { spotifyApi } from '@/lib/spotify';
import { SpotifyUser, SpotifyTopItems, SpotifyTrack, SpotifyArtist } from '@/types/spotify';

export function useSpotifyAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<SpotifyUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = spotifyApi.getToken();
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async () => {
    try {
      const userData = await spotifyApi.getCurrentUser();
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Failed to load user:', error);
      spotifyApi.clearToken();
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = () => {
    window.location.href = `https://accounts.spotify.com/authorize?${new URLSearchParams({
      response_type: 'token',
      client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
      scope: 'user-read-private user-read-email user-top-read user-read-playback-state user-read-currently-playing',
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI!,
    }).toString()}`;
  };

  const logout = () => {
    spotifyApi.clearToken();
    setIsAuthenticated(false);
    setUser(null);
  };

  return { isAuthenticated, user, loading, login, logout };
}

export function useTopTracks(timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term') {
  const [tracks, setTracks] = useState<SpotifyTopItems<SpotifyTrack> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const data = await spotifyApi.getTopTracks(timeRange);
        setTracks(data);
      } catch (error) {
        console.error('Failed to fetch top tracks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, [timeRange]);

  return { tracks, loading };
}

export function useTopArtists(timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term') {
  const [artists, setArtists] = useState<SpotifyTopItems<SpotifyArtist> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await spotifyApi.getTopArtists(timeRange);
        setArtists(data);
      } catch (error) {
        console.error('Failed to fetch top artists:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, [timeRange]);

  return { artists, loading };
}