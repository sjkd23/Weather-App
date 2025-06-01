# Weather App


Link to hosted site: <https://weather-app-4es7.onrender.com>

A modern weather forecasting web application built with React and Tailwind CSS. It allows users to search for cities, view current weather, and see a 5-day forecast with a clean, responsive UI. The app uses the OpenWeatherMap API for weather and geocoding data.

## Features

- Search for any city worldwide
- View current weather conditions (temperature, feels like, humidity, wind, etc.)
- 5-day forecast with daily high/low and weather icons
- Toggle between Celsius and Fahrenheit
- Light, dark, and fancy theme support
- Responsive design for mobile and desktop
- Error handling and loading indicators

## Project Structure

```text
src/
  App.jsx                # Main app logic and state
  main.jsx               # App entry point
  index.css              # Tailwind and custom styles
  components/            # Reusable UI components
    Header.jsx           # App header and theme toggle
    SearchBar.jsx        # City search input with suggestions
    UnitToggle.jsx       # Celsius/Fahrenheit toggle
    Loader.jsx           # Loading spinner
    Error.jsx            # Error message display
    ErrorBoundary.jsx    # React error boundary
    Footer.jsx           # App footer
    Forecast/            # Forecast grid and cards
      Forecast.jsx       # Forecast grid logic
      ForecastCard.jsx   # Individual forecast day card
  hooks/                 # Custom React hooks
    useWeatherData.js    # Fetches weather and forecast data
    useCitySuggestions.js# Fetches city suggestions for search
    useDebounce.js       # Debounce utility for input
  lib/
    fetchJSON.js         # Helper for API requests with error handling
```

## External Libraries & Frameworks

- [React](https://react.dev/) – UI library
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework
- [OpenWeatherMap API](https://openweathermap.org/api) – Weather and geocoding data
- [date-fns](https://date-fns.org/) – Date formatting (optional, see package.json)

## Setup Instructions

1. **Clone the repository**

   ```sh
   git clone https://github.com/sjkd23/Weather-App.git
   cd weather-app
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Set up environment variables**

   - Create a `.env` file in the project root:

     ```env
     VITE_WEATHER_API_KEY=your_openweathermap_api_key
     ```

   - Get your API key from [OpenWeatherMap](https://openweathermap.org/appid)

4. **Run the development server**

   ```sh
   npm run dev
   ```

   The app will be available at `http://localhost:5173` (or as shown in your terminal).

5. **Build for production**

   ```sh
   npm run build
   ```

6. **Preview the production build**

   ```sh
   npm run preview
   ```

## Code Organization Notes

- All main logic is in `App.jsx`.
- API requests are handled in `lib/fetchJSON.js` and custom hooks in `hooks/`.
- UI is split into small, reusable components in `components/`.
- Forecast grid and cards are in `components/Forecast/`.
- Error boundaries and loading states are included for robustness.

## License

MIT
