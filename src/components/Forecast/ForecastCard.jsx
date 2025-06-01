export default function ForecastCard({ dt, min, max, icon, desc, unit }) {
  // Convert Unix timestamp to JS Date object
  const date = new Date(dt * 1000);
  // Get short weekday name (e.g., Mon)
  const dayOfWeek = date.toLocaleDateString(undefined, {
    weekday: 'short',
  });
  // Get short month and day (e.g., May 31)
  const monthDate = date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      className="
        relative
        bg-white/80 dark:bg-slate-800/60
        shadow-lg dark:shadow-slate-700/50
        ring-1 ring-gray-300 dark:ring-slate-700/50
        rounded-xl
        p-6
        flex flex-col items-center
        w-full
        sm:max-w-[12rem]
        md:max-w-[14rem]
        lg:max-w-[16rem]
        mx-auto
        transition-colors duration-200
        border-t-3
        border-t-blue-500
      "
    >
      {/* Display day of week and date */}
      <div className="text-center uppercase text-[1.5rem] font-medium text-gray-900 dark:text-gray-300 translate-y-[-0.5rem]">
        <p>{dayOfWeek}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{monthDate}</p>
      </div>

      {/* Weather icon from OpenWeatherMap */}
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={`Forecast: ${desc}`}
        className="
          w-20 h-20
          sm:w-16 sm:h-16
          md:w-20 md:h-20
          lg:w-24 lg:h-24
        "
      />

      {/* Weather description */}
      <p className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400 capitalize">
        {desc}
      </p>

      {/* High and low temperature with arrows */}
      <div className="mt-2 flex space-x-4">
        {/* High temperature */}
        <span
          className="
            flex items-center
            text-red-600 dark:text-red-400
            font-semibold
            text-lg sm:text-base md:text-lg lg:text-xl
          "
        >
          <span className="mr-1">▲</span>
          {Math.round(max)}°{unit === 'metric' ? 'C' : 'F'}
        </span>
        <span className="text-gray-500 dark:text-gray-400">|</span>
        {/* Low temperature */}
        <span
          className="
            flex items-center
            text-blue-600 dark:text-blue-400
            font-semibold
            text-lg sm:text-base md:text-lg lg:text-xl
          "
        >
          <span className="mr-1">▼</span>
          {Math.round(min)}°{unit === 'metric' ? 'C' : 'F'}
        </span>
      </div>
    </div>
  );
}
