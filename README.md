# Vinay Gajjar Portfolio

A modern, responsive portfolio website built with vanilla TypeScript and CSS. This project was created to practice frontend development skills and experiment with UI/UX improvements.

## Features

- **Dynamic Content Loading**: All content is loaded from JSON files, making it easy to update without touching HTML
- **Scroll-Triggered Animations**: Smooth animations that trigger when elements come into view
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between themes with smooth transitions
- **Animated Counters**: Statistics animate from 0 to target values when scrolled into view
- **Interactive Elements**: Hover effects, accordion sections, and modal project views
- **Performance Optimized**: Parallel data loading and efficient animation system

## Tech Stack

- **Frontend**: HTML5, CSS3, TypeScript
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Poppins, Playfair Display)

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm dev
   ```
4. Open your browser to `http://localhost:5173`

## Project Structure

```
src/
├── data/                 # JSON data files for all sections
│   ├── hero.json
│   ├── about.json
│   ├── technologies.json
│   ├── projects.json
│   ├── experience.json
│   ├── testimonials.json
│   ├── contact.json
│   └── footer.json
├── data-loader.ts        # Handles dynamic content loading
├── animations.ts         # Scroll-triggered animation system
├── counter.ts           # Animated counter functionality
├── theme.ts             # Dark/light theme toggle
├── loader.ts            # Loading screen management
└── main.ts              # Main application logic
```

## Customization

All content can be easily updated by modifying the JSON files in the `src/data/` directory:

- **hero.json**: Hero section content, buttons, and marquee items
- **about.json**: About text, statistics, and accordion content
- **technologies.json**: Skills and technologies with icons
- **projects.json**: Featured projects with descriptions and tech stacks
- **experience.json**: Work experience timeline
- **testimonials.json**: Client testimonials
- **contact.json**: Contact information and methods
- **footer.json**: Footer content and social links

## Development Notes

The project uses a modular architecture where each component (animations, counters, themes) is self-contained and can be easily extended or modified. The data loader handles all dynamic content rendering, making it simple to add new sections or modify existing ones.

The animation system uses Intersection Observer API for performance, only animating elements when they're visible. All animations are CSS-based with JavaScript triggers for smooth, hardware-accelerated effects.
