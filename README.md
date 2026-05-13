# Deal Advisor

AI-powered buying research assistant that helps you make informed purchasing decisions by aggregating and analyzing product reviews from YouTube and Reddit.

## Tech Stack

- **Next.js 14** - React framework with App Router and SSR
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Google Analytics** - User analytics

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend API running on port 3000

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Update .env.local with your values
```

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Backend API URL (required)
NEXT_PUBLIC_API_URL=http://localhost:3000

# API timeouts (optional)
API_TIMEOUT=10000
API_POST_TIMEOUT=60000

# Debug mode (optional)
DEBUG_API=false

# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Site URL (required for production)
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

### Development

```bash
# Start development server on port 3001
npm run dev
```

Visit [http://localhost:3001](http://localhost:3001)

### Build

```bash
# Type check
npm run type-check

# Build for production
npm run build

# Start production server
npm start
```

## Deployment to Vercel

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/deal-advisor)

### Manual Deployment

1. **Install Vercel CLI** (optional)
   ```bash
   npm i -g vercel
   ```

2. **Connect your repository to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure Environment Variables in Vercel**
   - Go to Project Settings → Environment Variables
   - Add the following variables:
     - `NEXT_PUBLIC_API_URL` - Your backend API URL
     - `NEXT_PUBLIC_SITE_URL` - Your Vercel deployment URL (e.g., `https://deal-advisor.vercel.app`)
     - `NEXT_PUBLIC_GA_ID` - Your Google Analytics ID (optional)
     - `API_TIMEOUT` - 10000 (optional)
     - `API_POST_TIMEOUT` - 60000 (optional)

4. **Deploy**
   - Vercel will automatically deploy on push to main
   - Or manually trigger deployment from Vercel dashboard
   - Or use CLI: `vercel --prod`

5. **Update robots.txt** (after first deployment)
   - Update `public/robots.txt` with your production domain

### Important Notes for Production

- **Backend API**: Make sure your backend API is accessible from Vercel
- **CORS**: Configure your backend to allow requests from your Vercel domain
- **Environment Variables**: Never commit `.env.local` - it's in `.gitignore`
- **Analytics**: Add your Google Analytics ID to start tracking

## Project Structure

```
spa-engine-ai/
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── page.tsx       # Homepage
│   │   ├── layout.tsx     # Root layout
│   │   └── q/[slug]/      # Query results pages
│   ├── components/        # React components
│   │   ├── home/          # Homepage components
│   │   ├── layout/        # Layout components
│   │   ├── query/         # Query page components
│   │   ├── search/        # Search components
│   │   ├── shared/        # Shared components
│   │   └── ui/            # UI primitives
│   ├── lib/               # Utilities and helpers
│   │   ├── api/           # API client and functions
│   │   ├── constants/     # Constants
│   │   └── utils/         # Utility functions
│   ├── types/             # TypeScript types
│   └── styles/            # Global styles and fonts
├── public/                # Static assets
└── tailwind.config.ts     # Tailwind configuration
```

## Features

- ✅ Server-side rendering (SSR) for optimal SEO
- ✅ AI-powered search with 60s timeout
- ✅ YouTube and Reddit source integration
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Google Analytics integration
- ✅ SEO optimization (metadata, JSON-LD, sitemap)
- ✅ Loading states and error handling
- ✅ TypeScript type safety
- ✅ Tailwind CSS styling

## License

MIT
