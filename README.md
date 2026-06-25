# SpotifyStats

[![CI](https://github.com/obrenoalvim/spotifyStats/actions/workflows/ci.yml/badge.svg)](https://github.com/obrenoalvim/spotifyStats/actions/workflows/ci.yml) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Dashboard para explorar e visualizar suas estatísticas do Spotify. Conecte sua conta e veja músicas e artistas mais ouvidos em diferentes períodos, insights sobre seus hábitos musicais e gere papéis de parede a partir das capas dos seus álbuns favoritos.

## Stack

- [Next.js 13](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [Spotify Web API](https://developer.spotify.com/documentation/web-api)

## Getting started

```bash
git clone https://github.com/brenoalvim/spotifyStats.git
cd spotifyStats
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note:** You need a Spotify Developer app with `NEXT_PUBLIC_SPOTIFY_CLIENT_ID` and callback URL configured.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
