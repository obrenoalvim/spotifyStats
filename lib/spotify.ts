const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI!;

export const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?${new URLSearchParams({
  response_type: 'token',
  client_id: CLIENT_ID,
  scope: 'user-read-private user-read-email user-top-read user-read-playback-state user-read-currently-playing',
  redirect_uri: REDIRECT_URI,
}).toString()}`;

class SpotifyAPI {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('spotify_token', token);
    }
  }

  getToken(): string | null {
    if (!this.token && typeof window !== 'undefined') {
      this.token = localStorage.getItem('spotify_token');
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('spotify_token');
    }
  }

  private async request(endpoint: string): Promise<any> {
    const token = this.getToken();
    if (!token) throw new Error('No token available');

    try {
      const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          this.clearToken();
          throw new Error('Token expired');
        }
        throw new Error(`Spotify API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Spotify API request failed:', error);
      throw error;
    }
  }

  async getCurrentUser() {
    return this.request('/me');
  }

  async getTopTracks(timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term', limit: number = 20) {
    return this.request(`/me/top/tracks?time_range=${timeRange}&limit=${limit}`);
  }

  async getTopArtists(timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term', limit: number = 20) {
    return this.request(`/me/top/artists?time_range=${timeRange}&limit=${limit}`);
  }

  async getTrack(id: string) {
    return this.request(`/tracks/${id}`);
  }

  async getArtist(id: string) {
    return this.request(`/artists/${id}`);
  }

  async getAlbum(id: string) {
    return this.request(`/albums/${id}`);
  }

  async searchTracks(query: string, limit: number = 20) {
    return this.request(`/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`);
  }

  async searchArtists(query: string, limit: number = 20) {
    return this.request(`/search?q=${encodeURIComponent(query)}&type=artist&limit=${limit}`);
  }

  async getCurrentPlayback() {
    return this.request('/me/player');
  }
}

export const spotifyApi = new SpotifyAPI();