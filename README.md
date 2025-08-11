# CooktsPhet - Educational Platform

**CooktsPhet** is a modern Next.js educational platform designed to provide interactive learning experiences through simulations, catalog management, and comprehensive educational content. The application serves as a comprehensive learning management system with user authentication, interactive simulations, course catalog, and analytics visualization.

## Features

- 🎓 **Interactive Simulations** - PhET-style educational simulations for hands-on learning
- 📚 **Course Catalog** - Comprehensive catalog of educational content and lessons
- 🔐 **User Authentication** - Secure login, registration, and password recovery
- 📊 **Analytics Dashboard** - Track learning progress and performance metrics
- 👥 **Team Management** - Manage members and collaborative learning groups
- 📱 **Responsive Design** - Modern, mobile-friendly interface
- 🎨 **Dark/Light Theme** - Customizable theme switching
- ⚡ **Performance Optimized** - Built with Next.js 14 and modern tooling

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library with shadcn/ui
- **Animations**: Framer Motion
- **State Management**: SWR for data fetching
- **Authentication**: Custom auth system
- **Icons**: Lucide React
- **Charts**: Recharts

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd CooktsPhet
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
basecn/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   ├── explore/           # Explore/catalog pages
│   ├── simulation/        # Interactive simulation pages
│   └── ...
├── components/            # Reusable UI components
│   ├── common/           # Common components
│   ├── data-table/       # Data table components
│   ├── layout/           # Layout components
│   └── ui/               # Base UI components
├── features/             # Feature-based modules
│   ├── auth/             # Authentication features
│   ├── catalog/          # Course catalog features
│   ├── landing/          # Landing page features
│   ├── members/          # Team management features
│   ├── overview/         # Dashboard overview features
│   └── simulation/       # Simulation features
├── lib/                  # Utility libraries
└── public/               # Static assets
```

## Key Features

### Interactive Simulations
- PhET-style educational simulations
- Circuit construction kit and other physics simulations
- Responsive simulation containers
- Chatbot integration for learning support

### Course Catalog
- Comprehensive subject and topic filtering
- Chapter and lesson organization
- Textbook management
- Advanced search and filtering capabilities

### User Management
- Secure authentication system
- Role-based access control
- Team member management
- User profile management

### Analytics Dashboard
- Learning progress tracking
- Performance analytics
- Task completion metrics
- Team workload visualization

## Development

### Code Style
- TypeScript for type safety
- ESLint and Biome for code quality
- Prettier for code formatting
- Feature-based architecture

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Deployment

The application can be deployed on various platforms:

- **Vercel** (Recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Docker containers**

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the repository or contact the development team.

## Credits

This project is based on the excellent [basecn](https://github.com/daFoggo/basecn) template by [daFoggo](https://github.com/daFoggo), which provides essential components and features built with shadcn/ui for kickstarting Next.js projects. The original basecn template serves as a comprehensive foundation for modern web applications with dashboard functionality, authentication, and analytics visualization.

**Original Repository**: [https://github.com/daFoggo/basecn](https://github.com/daFoggo/basecn)
