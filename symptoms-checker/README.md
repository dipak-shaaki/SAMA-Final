# HealthAssist Symptom Checker

A WebMD-like symptom checker application built with React for the frontend and designed to work with a Flask backend.

## Features

- Interactive human body map for symptom selection
- Detailed symptom input form with severity, duration, and description
- Results page showing potential conditions based on symptoms
- Responsive design that works on mobile and desktop

## Tech Stack

- Frontend: React, TypeScript, Tailwind CSS, Vite
- Backend: Flask (to be implemented)
- API: Axios for API requests

## Project Structure

- `/src/components`: Reusable UI components
- `/src/pages`: Main application pages
- `/src/api`: API client for communicating with the Flask backend

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Build for production:
   ```
   npm run build
   ```

## Backend Integration

This frontend is designed to work with a Flask backend. The API client is configured in `/src/api/index.ts`. Update the `BASE_URL` to point to your Flask API when it's ready.

## Flask Backend (To Be Implemented)

The Flask backend should implement the following endpoints:

- `POST /api/symptoms`: Store symptom data in a database
- `POST /api/analyze`: Analyze symptoms and return potential conditions

## License

MIT