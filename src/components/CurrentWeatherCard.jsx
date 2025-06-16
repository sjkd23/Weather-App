// src/components/CurrentWeatherCard.jsx
import { useState } from 'react';
import { toFahrenheit, toMPH } from '../utils/conversionUtils';

export default function CurrentWeatherCard({ weather, unit }) {
  const [showDetails, setShowDetails] = useState(false);

  // Don't render if no weather data
  if (!weather) return null;

  // Apply unit conversion if needed
  const temp = unit === 'imperial' ? toFahrenheit(weather.main.temp) : Math.round(weather.main.temp);
  const feels = unit === 'imperial' ? toFahrenheit(weather.main.feels_like) : Math.round(weather.main.feels_like);
  const high = unit === 'imperial' ? toFahrenheit(weather.main.temp_max) : Math.round(weather.main.temp_max);
  const low = unit === 'imperial' ? toFahrenheit(weather.main.temp_min) : Math.round(weather.main.temp_min);
  const wind = unit === 'imperial' ? toMPH(weather.wind.speed) : Math.round(weather.wind.speed);

  // Weather icon URL
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  // Calculate local time for the city
  const localTimestamp = (weather.dt + weather.timezone) * 1000;
  const localDate = new Date(localTimestamp);

  // Format date and time as strings, forcing UTC so it matches city local time
  const dateString = localDate.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
  const timeString = localDate.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  });

  // Toggle for showing more details
  const toggleDetails = () => setShowDetails((prev) => !prev);

  // Convert visibility from meters to kilometers
  const visibilityInKm =
    typeof weather.visibility === 'number'
      ? (weather.visibility / 1000).toFixed(1)
      : null;

  return (
    <div
      className="
        bg-white/80 dark:bg-slate-800/60
        shadow-2xl
        ring-1 ring-gray-300 dark:ring-slate-700/50
        p-6 sm:p-8
        w-full
        sm:max-w-md
        lg:max-w-lg
        mx-auto
        mb-6
        rounded-xl
        transition-colors duration-200
      "
    >
      {/* Header: city name and date/time */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100">
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="mt-1 text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {dateString}
          </p>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Local time: {timeString}
          </p>
        </div>
        <button
          onClick={toggleDetails}
          className="
            cursor-pointer
            text-sm text-blue-600 dark:text-blue-400
            hover:underline
          "
          aria-expanded={showDetails}
        >
          {showDetails ? 'Hide Details' : 'More Details'}
        </button>
      </div>

      {/* Main weather info and icon */}
      <div
        className={`flex w-full ${showDetails ? 'justify-center items-center' : 'justify-center'}`}
      >
        <div
          className={showDetails ? 'flex-shrink-0 flex flex-col items-center' : 'flex flex-col items-center'}
        >
          <img
            src={iconUrl}
            alt={weather.weather[0].description}
            className="
              w-24 h-24
              sm:w-28 sm:h-28
              md:w-32 md:h-32
              lg:w-36 lg:h-36
            "
          />
          <p className="mt-1 text-sm sm:text-base text-gray-600 dark:text-gray-400 capitalize underline dark:underline-offset-2">
            {weather.weather[0].description}
          </p>
          <p
            className="
              mt-2
              text-5xl sm:text-6xl
              font-bold text-gray-800 dark:text-gray-100
            "
          >
            {temp}°{unit === 'metric' ? 'C' : 'F'}
          </p>
          <p className="mt-1 text-sm sm:text-base text-gray-600 dark:text-gray-300">
            feels like {feels}°
          </p>
          {/* High and low temperatures */}
          <div className="mt-2 flex items-center space-x-2 text-sm sm:text-base">
            <span className="flex items-center text-red-600 dark:text-red-400">
              <span className="mr-1">▲</span>
              {high}°
            </span>
            <span className="text-gray-500 dark:text-gray-400">|</span>
            <span className="flex items-center text-blue-600 dark:text-blue-400">
              <span className="mr-1">▼</span>
              {low}°
            </span>
          </div>
        </div>

        {/* Details panel, only shown if toggled */}
        {showDetails && (
          <div
            className="
              ml-8
              bg-gray-100 dark:bg-slate-700
              ring-1 ring-gray-200 dark:ring-slate-600
              rounded-lg
              w-full sm:w-80 md:w-96 lg:w-104
            "
          >
            <div className="divide-y divide-gray-300 dark:divide-slate-600">
              <div className="flex justify-between py-2 px-4">
                <span className="font-medium">Humidity:</span>
                <span>{weather.main.humidity}%</span>
              </div>
              <div className="flex justify-between py-2 px-4">
                <span className="font-medium">Pressure:</span>
                <span>{weather.main.pressure} hPa</span>
              </div>
              <div className="flex justify-between py-2 px-4">
                <span className="font-medium">Wind Speed:</span>
                <span>{wind} {unit === 'metric' ? 'm/s' : 'mph'}</span>
              </div>
              {visibilityInKm !== null && (
                <div className="flex justify-between py-2 px-4">
                  <span className="font-medium">Visibility:</span>
                  <span>{visibilityInKm} km</span>
                </div>
              )}
              {weather.clouds && (
                <div className="flex justify-between py-2 px-4">
                  <span className="font-medium">Cloudiness:</span>
                  <span>{weather.clouds.all}%</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
