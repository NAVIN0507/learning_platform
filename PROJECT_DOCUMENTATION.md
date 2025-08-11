# Converso - Real-time AI Teaching Platform

## Project Overview

**Converso** is a Next.js-based real-time AI teaching platform that enables interactive learning experiences through AI-powered companions. The platform allows users to engage with specialized AI tutors across various subjects including mathematics, science, language, coding, history, and economics.

## Key Features

- **AI-Powered Companions**: Interactive AI tutors specialized in different subjects
- **Real-time Voice Interaction**: Voice-based learning sessions using VAPI integration
- **User Authentication**: Secure authentication system using Clerk
- **Session Management**: Track and manage learning sessions
- **Subject-based Learning**: Organized learning content by academic subjects
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

## Technology Stack

### Frontend
- **Next.js 15.3.2** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Bricolage Grotesque** - Custom Google Font

### Backend & Database
- **Supabase** - Backend-as-a-Service for database and authentication
- **Clerk** - Authentication and user management
- **Server Actions** - Next.js server-side functions

### AI & Voice
- **VAPI AI** - Voice AI integration for real-time conversations
- **Lottie React** - Animated graphics for companions

### Development & Monitoring
- **Sentry** - Error tracking and performance monitoring
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## Project Structure

```
learning_platform/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   ├── companions/               # Companion-related pages
│   ├── my-journy/               # User journey pages
│   ├── sign-in/                 # Authentication pages
│   ├── subscription/            # Subscription management
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
├── components/                   # Reusable UI components
│   ├── ui/                      # Base UI components
│   ├── CompanianCard.tsx        # Companion display card
│   ├── CompanionComponent.tsx   # Main companion interface
│   ├── CompanionForm.tsx        # Companion creation form
│   ├── ComapnaionsList.tsx      # List of companions
│   ├── CTA.tsx                  # Call-to-action component
│   ├── Navbar.tsx               # Navigation bar
│   ├── SearchInput.tsx          # Search functionality
│   └── SubjectFilter.tsx        # Subject filtering
├── lib/                         # Utility functions and actions
│   ├── actions/                 # Server actions
│   ├── companion.action.ts      # Companion-related actions
│   ├── supabase.ts             # Supabase client configuration
│   ├── utils.ts                # Utility functions
│   └── vapi.sdk.ts             # VAPI SDK integration
├── constants/                   # Application constants
│   ├── index.ts                # Subject definitions and colors
│   └── soundwaves.json         # Audio-related data
├── types/                       # TypeScript type definitions
│   ├── index.d.ts              # Main type definitions
│   └── vapi.d.ts               # VAPI-specific types
└── public/                      # Static assets
```

## Core Components

### 1. Companion System
- **CompanianCard**: Displays companion information with subject-specific styling
- **CompanionComponent**: Main interface for interacting with AI companions
- **CompanionForm**: Form for creating new companions

### 2. Authentication & User Management
- **Clerk Integration**: Handles user authentication and session management
- **User Permissions**: Role-based access control for companion creation

### 3. Database Schema (Supabase)
- **companions**: Stores AI companion data (name, subject, topic, duration, author)
- **session_history**: Tracks user learning sessions
- **User data**: Managed through Clerk integration

### 4. Voice AI Integration
- **VAPI SDK**: Real-time voice conversation capabilities
- **Voice Profiles**: Different voice options (male/female, casual/formal)
- **Transcript Management**: Real-time conversation transcription

## Key Features Implementation

### Subject-Based Learning
```typescript
export const subjects = [
  "maths", "language", "science", 
  "history", "coding", "economics"
];

export const subjectsColors = {
  science: "#E5D0FF",
  maths: "#FFDA6E",
  language: "#BDE7FF",
  coding: "#FFC8E4",
  history: "#FFECC8",
  economics: "#C8FFDF",
};
```

### Companion Management
- Create, read, and manage AI companions
- Subject-specific filtering and search
- Session history tracking
- User-specific companion limits based on subscription

### Real-time Voice Interaction
- VAPI integration for voice-based learning
- Real-time transcript display
- Voice profile selection
- Interactive conversation flow

## Environment Configuration

Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- Clerk authentication keys
- VAPI API keys
- Sentry configuration

## Development Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   - Copy `.env.local.example` to `.env.local`
   - Configure all required environment variables

3. **Database Setup**
   - Set up Supabase project
   - Configure database tables for companions and session history

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Access Application**
   - Open http://localhost:3000

## Deployment

The application is configured for deployment on Vercel with:
- Automatic builds on push
- Environment variable management
- Sentry integration for monitoring
- Image optimization for Clerk avatars

## Monitoring & Analytics

- **Sentry Integration**: Error tracking and performance monitoring
- **Build Optimization**: TypeScript and ESLint error handling disabled for builds
- **Source Maps**: Configured for better debugging in production

## Security Features

- **Authentication**: Secure user authentication via Clerk
- **Database Security**: Row-level security through Supabase
- **Environment Variables**: Secure configuration management
- **CORS Configuration**: Proper API security

## Future Enhancements

- Enhanced AI companion personalities
- Advanced analytics and progress tracking
- Mobile app development
- Multi-language support
- Advanced subscription features
- Integration with educational content providers

## Contributing

1. Follow TypeScript best practices
2. Use the established component structure
3. Maintain consistent styling with Tailwind CSS
4. Test voice interactions thoroughly
5. Ensure proper error handling and user feedback

---

*This documentation provides a comprehensive overview of the Converso platform architecture, features, and implementation details.*