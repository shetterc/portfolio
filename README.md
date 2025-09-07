# UX Research Portfolio

A modern, responsive React portfolio website for UX researchers that showcases both UX Research projects and Research Operations work. Built with React 18, TypeScript, Tailwind CSS, and integrated with Airtable for dynamic content management.

![Portfolio Screenshot](https://via.placeholder.com/800x400?text=Portfolio+Screenshot)

## ✨ Features

- **Modern Design**: Clean, minimalist interface with dark/light mode toggle
- **Responsive**: Mobile-first design that works perfectly on all devices
- **Dynamic Content**: Integrated with Airtable for easy content management
- **Project Filtering**: Advanced filtering by category, tags, and search
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Fast Performance**: Optimized images, lazy loading, and efficient caching
- **Accessible**: WCAG compliant with proper ARIA labels and keyboard navigation

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Routing**: React Router v6
- **Content**: Airtable API integration
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Markdown**: React Markdown for project content
- **Build Tool**: Vite
- **Deployment**: GitHub Pages with Actions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Airtable account (optional - mock data provided)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your Airtable credentials:
   ```
   VITE_AIRTABLE_PAT=your_airtable_personal_access_token
   VITE_AIRTABLE_BASE_ID=your_airtable_base_id
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📊 Airtable Setup

### Database Schema

Create an Airtable base named "portfolio" with the following fields:

| Field Name | Field Type | Description |
|------------|------------|-------------|
| `title` | Single line text | Project title |
| `slug` | Single line text | URL slug (e.g., "banking-app-research") |
| `description` | Long text | Short project description |
| `content` | Long text | Full project content in Markdown |
| `image` | Attachment | Project hero image |
| `url` | URL | External project link (optional) |
| `tags` | Multiple select | Project tags and skills |
| `category` | Single select | "UX Research" or "UX Research Operations" |
| `featured_id` | Number | For featured projects (1, 2, 3, etc.) |

### Category Options

The `category` field should have these options:
- UX Research
- UX Research Operations

### Sample Tags

Consider these tags for the `tags` field:
- User Interviews
- Usability Testing  
- A/B Testing
- Survey Design
- Journey Mapping
- Persona Development
- Research Repository
- Tool Implementation
- Process Design
- Workshop Facilitation

### Getting Airtable Credentials

1. Go to [Airtable API page](https://airtable.com/api)
2. Select your base
3. Copy your Base ID from the URL
4. Create a [Personal Access Token](https://airtable.com/create/tokens)

## 🎨 Customization

### Design System

The portfolio uses a custom design system with:
- **Research colors**: Blue tones (#3b82f6, #2563eb)
- **Operations colors**: Teal tones (#14b8a6, #0d9488)
- **Typography**: Inter font family
- **Spacing**: Tailwind's spacing scale

### Updating Content

#### Personal Information
Edit these files to customize personal information:
- `src/pages/AboutPage.tsx` - Bio, skills, experience
- `src/pages/ContactPage.tsx` - Contact information
- `src/components/Footer.tsx` - Social links

#### Styling
- `src/index.css` - Global styles and custom components
- `tailwind.config.js` - Theme configuration
- Component files - Individual component styling

### Mock Data

If you don't want to use Airtable, the app includes mock data. The mock projects are defined in `src/lib/airtable.ts` in the `getMockProjects()` method.

## 📱 Responsive Design

The portfolio is fully responsive with:
- **Mobile**: Optimized for phones (320px+)
- **Tablet**: Enhanced for tablets (768px+)  
- **Desktop**: Full desktop experience (1024px+)
- **Large screens**: Optimized for large displays (1280px+)

## 🚀 Deployment

### GitHub Pages (Recommended)

1. **Update configuration**
   Edit `package.json` and `vite.config.ts` with your repository name:
   ```json
   "homepage": "https://yourusername.github.io/your-repo-name"
   ```

2. **Deploy using GitHub Actions** (Automatic)
   - Push to main branch
   - GitHub Actions will automatically build and deploy

3. **Manual deployment**
   ```bash
   npm run deploy
   ```

### Other Platforms

#### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

#### Vercel
1. Import your GitHub repository
2. Vercel will auto-detect Vite configuration
3. Add environment variables in Vercel dashboard

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main layout wrapper
│   ├── Navigation.tsx  # Navigation bar
│   ├── ProjectCard.tsx # Project card component
│   └── ...
├── contexts/           # React contexts
│   └── ThemeContext.tsx
├── hooks/              # Custom React hooks
│   └── useProjects.ts
├── lib/                # Utility libraries
│   └── airtable.ts     # Airtable integration
├── pages/              # Page components
│   ├── HomePage.tsx
│   ├── ProjectsPage.tsx
│   └── ...
├── types/              # TypeScript type definitions
│   └── index.ts
└── App.tsx             # Main app component
```

## 🎯 Performance

The portfolio is optimized for performance with:
- **Lazy loading** for images
- **Code splitting** with React Router
- **Caching** for Airtable responses
- **Optimized builds** with Vite
- **Minimal bundle size** with tree shaking

## ♿ Accessibility

Built with accessibility in mind:
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Color contrast compliance
- Screen reader optimization

## 🐛 Troubleshooting

### Common Issues

1. **Airtable connection issues**
   - Verify API key and base ID
   - Check network connectivity
   - Ensure base permissions are correct

2. **Build failures**
   - Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
   - Check for TypeScript errors: `npm run build`

3. **Routing issues on GitHub Pages**
   - Ensure `base` is set correctly in `vite.config.ts`
   - Check that `homepage` in `package.json` matches your repository

### Getting Help

- Check the [Issues](https://github.com/yourusername/portfolio/issues) page
- Review Airtable API documentation
- Check Vite and React documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👏 Acknowledgments

- Design inspiration from modern portfolio sites
- Icons by [Lucide](https://lucide.dev/)
- Fonts by [Google Fonts](https://fonts.google.com/)
- Built with [Vite](https://vitejs.dev/) and [React](https://reactjs.org/)

---

**Made with ❤️ for the UX Research community**