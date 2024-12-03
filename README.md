# Challenge U Web Platform

A modern web platform with authentication, collaboration, and mentorship features.

## Recent Updates

### UI Improvements
- Enhanced navbar styling and responsiveness
- Fixed dropdown menu alignment and interactions
- Improved theme toggle button with consistent icon usage
- Updated authentication pages layout and styling
- Optimized mobile responsiveness across all pages

### Mentor Features
- Streamlined mentor registration process
- Enhanced mentor profile creation workflow
- Added expertise selection with visual tags
- Improved verification step UI
- Added professional details form validation

## Project Structure

```
Web/
├── public/
│   ├── css/
│   │   ├── auth/
│   │   │   └── auth.css         # Authentication styles
│   │   ├── components/
│   │   │   └── ui.css           # Shared UI components
│   │   └── pages/
│   │       ├── collaborate.css   # Collaboration page styles
│   │       ├── find-mentor.css   # Mentor finding page styles
│   │       ├── join-team.css     # Team joining page styles
│   │       ├── resources.css     # Resources page styles
│   │       └── styles.css        # Global styles
│   ├── js/
│   │   ├── auth/
│   │   │   └── auth.js          # Authentication scripts
│   │   ├── components/
│   │   │   └── ui.js            # Shared UI components
│   │   └── pages/
│   │       └── script.js         # Page-specific scripts
│   ├── images/                   # Image assets
│   ├── fonts/                    # Custom fonts
│   └── videos/                   # Video content
├── pages/
│   ├── collaborate.html          # Collaboration page
│   ├── find-mentor.html          # Mentor finding page
│   ├── join-team.html           # Team joining page
│   └── resources.html           # Resources page
├── index.html                   # Home page
├── sign-in.html                # Sign in page
├── sign-up.html                # Multi-step sign up page
└── README.md                   # Project documentation
```

## Features

### Authentication
- Multi-step registration process
- Social sign-in options (Google, Apple)
- Password visibility toggle
- Real-time form validation
- Team member invitation system

### UI Components
- Modern responsive navbar with dropdowns
- Toast notifications
- Loading spinners
- Tooltips
- Modal dialogs
- Form elements
- Cards
- Badges
- Theme toggle (Light/Dark mode)

### Pages
- Home
- Authentication (Sign In/Sign Up)
- Find Mentor
- Join as Mentor
- Join Team
- Collaborate
- Resources

## Dependencies

- Font Awesome 6.4.0 (CDN)
- Inter Font (Google Fonts)
- Custom SVG icons

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Getting Started

1. Clone the repository
2. No build process required - pure HTML, CSS, and JavaScript
3. Open `index.html` in a modern web browser

## Development

The project uses a modular structure:
- Components are shared across pages
- Styles are organized by feature and component
- JavaScript is modular and feature-based
- Assets are properly organized in the public directory

### CSS Organization
- `components/ui.css`: Shared UI components and utilities
- `auth/auth.css`: Authentication-specific styles
- `pages/*.css`: Page-specific styles

### JavaScript Organization
- `components/ui.js`: Shared UI functionality
- `auth/*.js`: Authentication and form handling
- `pages/*.js`: Page-specific functionality

### Best Practices
- Semantic HTML structure
- Mobile-first responsive design
- Consistent naming conventions
- Modular and reusable components
- Accessibility considerations
- Performance optimization
