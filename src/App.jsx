import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import Forecast from "./components/Forecast";
import Error from "./components/Error";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);
  const [lastSearchedCity, setLastSearchedCity] = useState("");
  const [unit, setUnit] = useState("metric");
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async () => {
    if (!city) return;
    try {
      setLoading(true);

      const [weatherRes, forecastRes] = await Promise.all([
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`
        ),
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${unit}`
        ),
      ]);

      if (!weatherRes.ok) throw new Error("City not found!");
      if (!forecastRes.ok) throw new Error("Forecast data not available!");

      const weatherData = await weatherRes.json();
      const forecastData = await forecastRes.json();

      setWeather(weatherData);
      setForecast(forecastData);
      setError(null);
      setLastSearchedCity(city);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (lastSearchedCity) {
      fetchWeather();
    }
  }, [unit]);

  useEffect(() => {
    const savedCity = localStorage.getItem("lastCity");
    if (savedCity) {
      setCity(savedCity);
      setLastSearchedCity(savedCity);
    }
  }, []);

  useEffect(() => {
    if (lastSearchedCity) {
      localStorage.setItem("lastCity", lastSearchedCity);
    }
  }, [lastSearchedCity]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center px-4">
      <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl max-w-lg w-full p-8 text-center relative overflow-hidden">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Weather App <span className="text-yellow-500">☀️</span>
        </h1>

        <SearchBar city={city} setCity={setCity} onSearch={fetchWeather} />

        {lastSearchedCity && (
          <p className="text-sm text-gray-600 mb-4">
            Showing weather for: <strong>{lastSearchedCity}</strong>
          </p>
        )}

        {error && <Error message={error} />}

        {weather && !error ? (
          <>
            <WeatherDisplay
              weather={weather}
              unit={unit}
              onUnitToggle={() =>
                setUnit(unit === "metric" ? "imperial" : "metric")
              }
            />
            {forecast && <Forecast forecastData={forecast} unit={unit} />}
          </>
        ) : (
          !error &&
          !lastSearchedCity && (
            <p className="text-gray-500 mt-4 italic">
              No weather data yet. Try searching~!
            </p>
          )
        )}

        {loading && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
            <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
