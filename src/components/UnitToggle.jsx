// UnitToggle component allows users to switch between metric (Celsius) and imperial (Fahrenheit) units
export default function UnitToggle({ unit, onToggle }) {
  return (
    // Container for the toggle buttons with styling
    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden ">
      {/* Celsius button */}
      <button
        onClick={() => {
          // Only toggle if not already metric
          if (unit !== 'metric') onToggle();
        }}
        className={`cursor-pointer px-3 py-1 text-sm font-medium transition-colors duration-200 focus:outline-none ${unit === 'metric'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
          }`}
        aria-label="Switch to Celsius"
      >
        °C
      </button>
      {/* Fahrenheit button */}
      <button
        onClick={() => {
          // Only toggle if not already imperial
          if (unit !== 'imperial') onToggle();
        }}
        className={`cursor-pointer px-3 py-1 text-sm font-medium transition-colors duration-200 focus:outline-none ${unit === 'imperial'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
          }`}
        aria-label="Switch to Fahrenheit"
      >
        °F
      </button>
    </div>
  );
}
