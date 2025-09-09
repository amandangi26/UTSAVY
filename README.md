# UTSAVY - Premium Invitation Platform

![UTSAVY Logo](https://img.shields.io/badge/UTSAVY-Premium%20Invitations-purple?style=for-the-badge&logo=react)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

## 🌟 Project Overview

UTSAVY is a premium invitation management platform that allows users to create stunning, personalized digital wedding invitations with dynamic templates, comprehensive guest management, and real-time RSVP tracking. Built with modern web technologies, it provides a seamless experience for both hosts and guests.

### ✨ Key Features

- 🎨 **Beautiful Template System** - Multiple wedding invitation templates with customizable designs
- 👥 **Guest Management** - Complete guest list management with personalized invitation links
- 📊 **Analytics Dashboard** - Real-time event analytics and guest response tracking  
- 🔐 **Secure Authentication** - Email/mobile-based authentication with role-based access
- 📱 **Responsive Design** - Mobile-first approach with glass morphism UI
- 🎭 **Admin Panel** - Comprehensive admin dashboard for user and template management
- 🔗 **External Template Integration** - Support for external template URLs with dynamic data
- 💌 **RSVP System** - Interactive RSVP forms with custom fields and export functionality
- 🎊 **Interactive Elements** - Animations, confetti effects, and smooth transitions

## 🚀 Technology Stack

### Frontend
- **React 18** - Modern React with hooks and context
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Advanced animations and transitions
- **React Router DOM** - Client-side routing
- **TanStack Query** - Data fetching and caching

### UI Components
- **Radix UI** - Accessible component primitives
- **Shadcn/UI** - Beautiful component library
- **Lucide React** - Modern icon library
- **React Hook Form** - Forms with validation
- **Zod** - TypeScript-first schema validation

### Backend & Database
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Relational database
- **Row Level Security** - Database-level security
- **Real-time subscriptions** - Live data updates

### Additional Libraries
- **Embla Carousel** - Touch-friendly carousels
- **React Confetti** - Celebration effects
- **Date-fns** - Date manipulation
- **jsPDF** - PDF generation
- **Recharts** - Data visualization

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** or **bun** package manager
- **Supabase** account for database

### Quick Start

1. **Clone the repository**
```bash
git clone <your-repository-url>
cd utsavy-platform
```

2. **Install dependencies**
```bash
npm install
# or
bun install
```

3. **Environment Configuration**
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_PROJECT_ID=your_project_id
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
VITE_SUPABASE_URL=https://your-project.supabase.co
```

4. **Database Setup**
- Create a new Supabase project
- Run the provided migration scripts in `supabase/migrations/`
- Configure Row Level Security policies

5. **Start Development Server**
```bash
npm run dev
# or
bun dev
```

The application will be available at `http://localhost:8080`

## 📝 Usage Examples

### Creating a Wedding Event
```typescript
// Example event creation
const eventData = {
  name: "Sarah & John's Wedding",
  date: "2024-06-15",
  venue: "Garden Palace",
  template_id: "wedding-template-01",
  details: {
    bride_name: "Sarah",
    groom_name: "John",
    ceremony_time: "16:00",
    reception_time: "19:00"
  }
};
```

### Adding Guests
```typescript
// Example guest management
const guests = [
  {
    name: "Alice Johnson",
    mobile_number: "+1-555-0123",
    relationship: "friend"
  },
  {
    name: "Bob Smith", 
    mobile_number: "+1-555-0124",
    relationship: "family"
  }
];
```

### Custom RSVP Fields
```typescript
// Example RSVP configuration
const rsvpFields = [
  {
    type: "radio",
    label: "Will you attend?",
    options: ["Yes, I'll be there", "Sorry, can't make it"],
    required: true
  },
  {
    type: "number",
    label: "Number of guests",
    min: 1,
    max: 4
  }
];
```

## ⚙️ Configuration

### Environment Variables
| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | ✅ |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase anon key | ✅ |
| `VITE_SUPABASE_PROJECT_ID` | Supabase project ID | ✅ |

### Template Configuration
Templates are defined in `src/templates/` with the following structure:
```typescript
interface TemplateProps {
  eventData: EventData;
  guestData: GuestData;
  onRSVP: (response: RSVPResponse) => void;
  customizations?: Record<string, any>;
}
```

### Admin Configuration
Admin users are managed through the `user_roles` table:
```sql
INSERT INTO user_roles (user_id, role) VALUES (user_uuid, 'admin');
```

## 🚀 Deployment

### Production Build
```bash
npm run build
# or
bun run build
```

### Deployment Options

#### Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

#### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project directory
3. Follow the deployment prompts
4. Configure environment variables

#### Supabase Edge Functions
Deploy serverless functions for advanced features:
```bash
supabase functions deploy your-function-name
```

### Performance Optimizations
- ✅ Code splitting implemented
- ✅ Lazy loading for images and components
- ✅ Optimized bundle size
- ✅ PWA ready (service worker)

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Process
1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** changes: `git commit -m 'Add amazing feature'`
4. **Push** to branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Code Standards
- Follow TypeScript best practices
- Use ESLint and Prettier for formatting
- Write meaningful commit messages
- Add tests for new features
- Update documentation

### Pull Request Process
- Ensure CI/CD checks pass
- Include screenshots for UI changes
- Update README if needed
- Request review from maintainers

## 🏗️ Project Architecture

```
src/
├── components/           # Reusable UI components
│   ├── admin/           # Admin dashboard components
│   ├── auth/            # Authentication components
│   ├── dashboard/       # User dashboard components
│   ├── events/          # Event management components
│   ├── homepage/        # Landing page components
│   ├── invitations/     # Invitation templates
│   └── ui/              # Base UI components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── pages/               # Route components
├── providers/           # Context providers
├── services/            # API services
├── templates/           # Invitation templates
├── types/               # TypeScript definitions
└── utils/               # Helper utilities
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact & Support

### Maintainers
    - **Lead Developer**: [Vasudev Ai Team](mailto:your.email@example.com),(amandangi950@gmail.com)
- **UI/UX Designer**: [Designer Name](mailto:info@vasudev.online)

### Support Channels
- 📧 **Email**: support@utsavy.com
- 💬 **Discord**: [Join our community](https://discord.com/invite/e5uPQDXSSk)


### Getting Help
3. Join our [Discord community](https://discord.com/invite/e5uPQDXSSk)
4. Create a new issue with detailed information

## 🎯 Roadmap

### Version 2.0 (Coming Soon)
- [ ] Multi-language support
- [ ] Advanced analytics with charts
- [ ] SMS notification integration
- [ ] Custom domain support
- [ ] Template marketplace

### Version 2.1 (Future)
- [ ] Mobile app (React Native)
- [ ] AI-powered template suggestions
- [ ] Video invitation support
- [ ] Integration with calendar apps
- [ ] White-label solutions

---

<div align="center">

  **Built with ❤️ by the UTSAVY Team X Vasudev Ai**

[Website](https://www.vasudev.online/) X [Website](https://utsavy.in) • [Documentation](https://github.com/amandangi26/UTSAVY/edit/main/README.md) • [Support](mailto:info@vasudev.online), amandangi950@gmail.com

</div>
