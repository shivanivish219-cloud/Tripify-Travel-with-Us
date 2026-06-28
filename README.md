# Tripify — React Frontend

A React + Vite frontend for the Tripify travel booking app. This project preserves the original layout and styling from the vanilla version while using modern React components, routing, context, and an API layer.

## What this project includes

### Phase 1

- Vite + React 19 setup
- React Router DOM for navigation
- Main homepage components: `Navbar`, `Banner`, `DestinationRow`, `DestinationCard`, `GroupOfferBanner`, `InterestLinks`, `Footer`
- React modal components: `AuthModal`, `BookingModal`, `ContactModal`
- `AuthContext` for login/signup state
- `ToastContext` for toast notifications
- Axios API layer in `src/api/` that uses existing backend routes
- Local fallback destination data so the homepage still renders without a backend

### Phase 2

- `PaymentPage` (`/payment`) — receives booking data via router state, shows a simulated payment form, then creates the real booking and displays confirmation with a booking reference
- `MyBookingsPage` (`/my-bookings`) — fetches the logged-in user's bookings from `GET /api/bookings/my` and lists them with status badges
- `DestinationsPage` (`/destinations`) — filterable grid driven by URL query params (`?category=beach&type=domestic`), with fallback local filtering when the backend is unavailable
- `ProtectedRoute` component to block unauthenticated access to protected pages

### Phase 3

- `WeatherStrip` component in the top bar for live weather display
- `weatherApi.js` for OpenWeatherMap API integration
- Updated icon usage via `react-icons`
- Fixed broken logo fallback in `Navbar.jsx`
- Updated `Footer` and CSS to match the new icon implementation

## Project structure

- `src/`
  - `api/` — Axios client and backend service wrappers
  - `components/` — reusable UI components and modals
  - `context/` — auth and toast context providers
  - `pages/` — route pages like `HomePage`, `DestinationsPage`, `MyBookingsPage`, `PaymentPage`
  - `assets/` — fallback data and global styles

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env`
3. Add your environment values
4. Start the dev server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:5173`

## Environment variables

Use `.env` for local development or set the same values in Netlify deploy settings.

- `VITE_API_URL` — backend API URL
  - Example for local backend: `http://localhost:5000/api`
  - Example for production backend: `https://your-backend-host.com/api`
- `VITE_OPENWEATHER_KEY` — optional OpenWeatherMap API key
  - If this is not set, the weather widget will simply not render.

## Backend connection

This frontend expects a backend API at `VITE_API_URL`. It is designed to work with your existing `tripify-backend` routes for:

- authentication
- destinations
- bookings
- contact submissions

If the backend is not available during development, the homepage still shows fallback destination data from `src/assets/fallbackDestinations.js`.

## Deploying to Netlify

To deploy this app on Netlify:

1. Create a new site in your Netlify dashboard.
2. Connect your Git repository, or drag and drop the project folder.
3. Set the build command to:
   ```bash
   npm run build
   ```
4. Set the publish directory to:
   ```bash
   dist
   ```
5. Add environment variables in Netlify site settings:
   - `VITE_API_URL` = `https://your-backend-host.com/api`
   - `VITE_OPENWEATHER_KEY` = `your_openweathermap_key` (optional)

### Example Netlify environment values

- `VITE_API_URL=https://your-backend-host.com/api`
- `VITE_OPENWEATHER_KEY=abcd1234yourkey`

### Notes for Netlify

- The frontend is static and served from `dist` after build.
- The backend must be reachable from the deployed site via `VITE_API_URL`.
- If the backend is offline, the homepage still renders fallback content but dynamic features like bookings and auth will not work.

## How to connect Netlify to the backend

- Deploy or host your backend separately (Render, Railway, Heroku, AWS, etc.)
- Set `VITE_API_URL` in Netlify to your backend's production API URL
- If your backend is local only, Netlify cannot access it and the app will not function fully in production

## If you want to test locally with Netlify CLI

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
2. Run locally:
   ```bash
   netlify dev
   ```
3. Make sure your `.env` file contains `VITE_API_URL` and optional `VITE_OPENWEATHER_KEY`.

## What is not finished yet

- Destination detail page with full single-destination view
- Reviews and destination-specific booking details
- polished production images/icons and improved visual asset set
- production deployment guide for backend hosting or MongoDB Atlas

## Quick start summary

- `npm install`
- `npm run dev`
- `http://localhost:5173`
- Set `VITE_API_URL` to your backend URL
- Deploy to Netlify with build command `npm run build` and publish directory `dist`
