import { useState, useEffect, useCallback } from 'react';
import { fetchJSON } from './lib/fetchJSON';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import UnitToggle from './components/UnitToggle';
import Loader from './components/Loader';
import Error from './components/Error';
import CurrentWeatherCard from './components/CurrentWeatherCard';
import Forecast from './components/Forecast/Forecast';
import useWeatherData from './hooks/useWeatherData';
import Footer from './components/Footer';

const GEO_API_BASE = 'https://api.openweathermap.org/geo/1.0/direct';
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export default function App() {
  // ------------ //
  // Theme State  //
  // ------------ //
  const getInitialTheme = () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return 'light';
  };
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const htmlEl = document.documentElement;
    htmlEl.classList.remove('dark', 'fancy');
    if (theme === 'dark') {
      htmlEl.classList.add('dark');
    } else if (theme === 'fancy') {
      htmlEl.classList.add('fancy');
    }
  }, [theme]);

  // ------------------------ //
  // Weather App State & Hooks //
  // ------------------------ //
  const [cityDisplay, setCityDisplay] = useState('Montreal, CA');
  const [coords, setCoords] = useState({ lat: null, lon: null });
  const [unit, setUnit] = useState('metric');
  const [error, setError] = useState(null);

  const { weather, forecast, loading, error: weatherError } = useWeatherData(
    coords.lat,
    coords.lon,
    unit
  );

  // Propagate any weather‐related error into local `error`
  useEffect(() => {
    if (weatherError) {
      setError(weatherError);
    }
  }, [weatherError]);

  // Whenever user types, clear coords & previous errors
  const handleChange = useCallback((newDisplay) => {
    setCityDisplay(newDisplay);
    setCoords({ lat: null, lon: null });
    setError(null);
  }, []);

  // On “Search” button or Enter key press:
  const handleSearch = useCallback(async () => {
    const query = cityDisplay.trim();
    if (query === '') {
      setError('Please enter a city name.');
      return;
    }
    setError(null);

    try {
      const geoUrl = `${GEO_API_BASE}?q=${encodeURIComponent(
        query
      )}&limit=1&appid=${API_KEY}`;
      const geoResults = await fetchJSON(geoUrl);

      if (Array.isArray(geoResults) && geoResults.length > 0) {
        const loc = geoResults[0];
        const displayString = `${loc.name}${loc.state ? `, ${loc.state}` : ''
          }, ${loc.country}`;

        setCityDisplay(displayString);
        setCoords({ lat: loc.lat, lon: loc.lon });
      } else {
        setError('Location not found.');
        setCoords({ lat: null, lon: null });
      }
    } catch (err) {
      console.error('Geocoding error:', err);
      setError(err.message || 'Failed to fetch location.');
      setCoords({ lat: null, lon: null });
    }
  }, [cityDisplay]);

  // When user clicks on a suggested location:
  const handleSelect = useCallback((loc) => {
    const displayString = `${loc.name}${loc.state ? `, ${loc.state}` : ''
      }, ${loc.country}`;
    setCityDisplay(displayString);
    setCoords({ lat: loc.lat, lon: loc.lon });
    setError(null);
  }, []);

  // On start, auto‐search “Montreal, CA”
  useEffect(() => {
    handleSearch();
  }, []);

  // Toggle between metric and imperial
  const toggleUnit = () => {
    setUnit((prev) => (prev === 'metric' ? 'imperial' : 'metric'));
  };

  return (
    <div
      className="
        min-h-screen
        bg-white text-gray-900
        dark:bg-gray-900 dark:text-gray-100
        fancy:bg-gradient-to-r fancy:from-purple-600 fancy:via-pink-500 fancy:to-red-500 fancy:text-white
        flex flex-col
        transition-colors duration-300
      "
    >
      {/* MAIN CONTENT */}
      <div className="flex-grow w-full flex flex-col items-center">
        {/* HEADER */}
        <div className="w-full max-w-7xl mx-auto">
          <Header theme={theme} onChange={setTheme} />
        </div>

        {/* SEARCH BAR + UNIT TOGGLE */}
        <div className="w-full mb-8 flex items-center justify-center">
          {/*  Mobile: stack column */}
          <div className="w-full flex flex-col items-center gap-4 px-4 md:hidden">
            {/* SearchBar at full width (up to 28rem) */}
            <div className="w-full max-w-md">
              <SearchBar
                value={cityDisplay}
                onChange={handleChange}
                onSelect={handleSelect}
                onSearch={handleSearch}
              />
            </div>
            {/* Toggle below */}
            <UnitToggle unit={unit} onToggle={toggleUnit} />
          </div>

          {/* Desktop (md+): inline-flex with invisible spacer on left */}
          <div className="hidden md:flex items-center justify-center gap-4 w-full">
            {/* Invisible spacer toggle (non-interactive) to center the real search bar */}
            <div className="opacity-0 pointer-events-none">
              <UnitToggle unit={unit} onToggle={() => { }} />
            </div>

            {/* Searchbar size */}
            <div className="w-[36rem]">
              <SearchBar
                value={cityDisplay}
                onChange={handleChange}
                onSelect={handleSelect}
                onSearch={handleSearch}
              />
            </div>

            {/* Actual toggle on the right */}
            <UnitToggle unit={unit} onToggle={toggleUnit} />
          </div>
        </div>

        {/* ─── LOADING / ERROR / WEATHER CONTENT ─── */}
        {loading && <Loader />}

        {error && <Error message={error} />}

        {weather && <CurrentWeatherCard weather={weather} unit={unit} />}

        <hr className="w-full max-w-7xl mx-auto my-4 border-gray-300 dark:border-gray-700" />

        {forecast && <Forecast list={forecast.list} unit={unit} />}
      </div>
      <Footer />
    </div>
  );
}
