# Weather App

A modern React + TypeScript weather dashboard that shows current weather conditions for any city, powered by WeatherAPI.
This is a simple weather I make just to practice my front end dev skill. Feel free to add suggestions or critics.

Live demo: https://myweatherapptes.netlify.app/

## Features

- Search weather by city name
- Real-time clock and date display
- Day or night indicator
- Detailed weather metrics, including:
  - Temperature
  - Condition summary
  - Wind speed and direction
  - Humidity
  - Real feel temperature
  - UV index
  - Pressure
  - Wind chill
  - Gust
  - Heat index
  - Cloud coverage
- Responsive card-based layout

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- WeatherAPI

## Getting Started

### 1. Clone the repository

git clone https://github.com/slizer432/weather-app.git
cd weather-app

### 2. Install dependencies

npm install

### 3. Configure environment variables

Create a .env file in the project root and add:

VITE_API_KEY=your_weatherapi_key_here

You can get an API key from: https://www.weatherapi.com/

### 4. Run the development server

npm run dev

App will start on your local Vite server (usually http://localhost:5173).

## Available Scripts

- npm run dev: Start development server
- npm run build: Build for production
- npm run preview: Preview production build locally
- npm run lint: Run ESLint checks

## Project Structure

src/

- components/
  - SearchBar.tsx
  - Card.tsx
  - Loading.tsx
- lib/
  - weather.ts
- service/
  - service.ts
- App.tsx
- main.tsx

## Credits

- Weather data: https://www.weatherapi.com/
- UI inspiration: https://dribbble.com/shots/22065403-Weather-App-Landing-Page-Design

## To-do list:

- Search auto complete
- User location as default
- Catch for not found city
- Responive for phone
