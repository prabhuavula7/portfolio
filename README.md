# Prabhu Avula Portfolio

Personal developer portfolio for Prabhu Kiran Avula, built with React, Vite, Tailwind CSS, and Three.js.

The site presents AI/ML and full stack projects, experience, education, values, blog posts, and contact flows in a responsive canvas-style interface with light and dark themes.

## Tech Stack

- React 19 and Vite
- Tailwind CSS 4
- Three.js for the hero background scene
- React Router for page routing
- MDX blog content with syntax highlighting
- Lucide and React Icons for interface/social icons
- Vercel Analytics

## Features

- Responsive landing page with canvas-style sections
- Interactive Three.js hero shapes
- Light/dark theme toggle with persisted preference
- Desktop navbar that condenses after the hero
- Project slider with keyboard, wheel, swipe, and timed navigation
- MDX-powered blog posts with code tabs and source links
- Technology logo wall with filtering
- Contact form with mail client fallback

## Getting Started

```bash
npm install
npm run dev
```

The local dev server runs through Vite. By default it is available at `http://localhost:5173`.

## Scripts

```bash
npm run dev      # Start local development server
npm run build    # Build production assets
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

## Project Structure

```text
src/components/       Reusable UI sections and controls
src/hooks/            Theme and Three.js background hooks
src/pages/            Routed pages
src/data/             Blog post loading and metadata helpers
content/blog/         MDX blog posts
public/logos/         Static technology and organization logos
```

## Deployment

Vercel is connected to the GitHub repository. Pushes to `main` deploy to production, and branch pushes create preview deployments.

If local environment variables are needed in the future, sync them with:

```bash
vercel env pull
```
