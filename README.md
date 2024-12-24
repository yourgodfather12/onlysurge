# OnlySurge - Multi-Platform Content Management Dashboard

OnlySurge is a powerful dashboard for content creators to manage their presence across multiple platforms like OnlyFans and Fansly. Built with Next.js 13 and Supabase, it provides a unified interface for content management, analytics, and subscriber engagement.

## Features

- **Multi-Platform Integration**: Seamlessly manage content across OnlyFans and Fansly
- **Analytics Dashboard**: Track performance metrics, revenue, and engagement
- **Content Vault**: AI-powered content management and scheduling
- **Subscriber Management**: Detailed subscriber insights and interaction history
- **Promotional Tools**: Create and track promotional campaigns
- **Message Center**: Centralized messaging hub for subscriber communication
- **Profile Builder**: Customizable profile management and preview
- **Link Management**: Track and optimize promotional links

## Tech Stack

### Frontend
- Next.js 13 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand (State Management)
- React Query
- Lucide Icons
- Shadcn UI Components

### Backend
- Supabase (Database & Authentication)
- Edge Functions
- Row Level Security
- Real-time Subscriptions

## Prerequisites

- Node.js 18.x or later
- Supabase account
- OnlyFans/Fansly API access

## Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Platform API Keys
ONLYFANS_CLIENT_ID=your_onlyfans_client_id
ONLYFANS_CLIENT_SECRET=your_onlyfans_client_secret
FANSLY_API_KEY=your_fansly_api_key

# Additional Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/onlysurge.git
   cd onlysurge
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Supabase:
   - Create a new Supabase project
   - Run the migration in `supabase/migrations/20231223_initial_schema.sql`
   - Update environment variables with your Supabase credentials

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Schema

The application uses the following main tables in Supabase:

- `users`: Extended user profiles
- `platforms`: Connected platform credentials
- `content`: Content management
- `subscribers`: Subscriber information
- `messages`: Communication history
- `analytics`: Performance metrics
- `promotions`: Marketing campaigns
- `links`: Promotional links

## State Management

We use Zustand for state management, organized into the following stores:

- `useAuthStore`: Authentication state
- `usePlatformStore`: Platform connections
- `useContentStore`: Content management
- `useAnalyticsStore`: Analytics data
- `useUIStore`: UI state and preferences

## Testing

Run the test suite:

```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e
```

## Deployment

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy with `npm run build`

### Backend (Supabase)

1. Update production database schema
2. Configure edge functions
3. Set up production environment variables

## Development Guidelines

### Code Style
- Follow the TypeScript style guide
- Use ESLint and Prettier for formatting
- Write meaningful commit messages

### Performance
- Implement code splitting and lazy loading
- Optimize images and assets
- Monitor load times and responsiveness

### Accessibility
- Follow WCAG guidelines
- Test with screen readers
- Ensure keyboard navigation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@onlysurge.com or join our Discord community.

## Acknowledgments

- Next.js team for the amazing framework
- Supabase team for the backend infrastructure
- All contributors who have helped shape this project
