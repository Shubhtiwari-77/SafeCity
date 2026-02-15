# SafeCity - Smart Driver Safety & Emergency Response Platform

A professional Next.js platform for monitoring driver behavior, detecting accidents, and managing emergency responses in real-time.

## Features

- **Control Center (Dashboard)**: Live vehicle tracking, risk scores, and recent alerts.
- **Driver Panel**: Individual driver performance analytics (Speeding, Braking, etc.).
- **Emergency Panel**: Active incident management and hospital dispatch interface.
- **Admin Analytics**: City-wide safety trends and blackspot detection.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **State**: React Hooks (Mock Data Simulation included)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

- `src/app`: Page routes
  - `/`: Dashboard
  - `/driver`: Driver Panel
  - `/emergency`: Emergency Response
  - `/admin`: Admin Analytics
- `src/components`: Reusable UI components
- `src/hooks`: Data simulation logic (`useRealTimeData`)

## Next Steps

- Integrate real backend APIs replacing `useRealTimeData`.
- Connect Mapbox/Google Maps API in `LiveMap` component.
- Implement authentication for different user roles.

