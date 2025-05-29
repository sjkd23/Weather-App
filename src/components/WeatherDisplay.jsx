function WeatherDisplay({ weather, unit, onUnitToggle }) {
  return (
    <div className="mt-6 p-6 bg-white rounded-lg shadow text-left">
      <p className="text-xl font-semibold mb-2">
        Temperature: {weather.main.temp}°{unit === "metric" ? "C" : "F"}{" "}
        <button
          className="ml-3 px-2 py-1 text-sm bg-gray-800 text-white rounded hover:bg-gray-700"
          onClick={onUnitToggle}
        >
          Switch to °{unit === "metric" ? "F" : "C"}
        </button>
      </p>
      <p className="mb-1">Humidity: {weather.main.humidity}%</p>
      <p>
        Wind Speed: {weather.wind.speed}{" "}
        {unit === "imperial" ? "mph" : "m/s"}
      </p>
    </div>
  );
}

export default WeatherDisplay;
