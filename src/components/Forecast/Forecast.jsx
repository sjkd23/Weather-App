import { useMemo } from 'react';
import ForecastCard from './ForecastCard';

export default function Forecast({ list, unit }) {
  // Return nothing if the forecast list is empty or undefined
  if (!list?.length) return null;

  // Memoize daily forecast calculation to avoid unnecessary recalculations
  const daily = useMemo(() => {
    const dailyMap = new Map();
    list.forEach((item) => {
      const dateObj = new Date(item.dt * 1000);
      // Format date as YYYY-MM-DD in local time
      const dayKey = dateObj.toLocaleDateString('en-CA');

      const payload = {
        dt: item.dt, // timestamp
        min: item.main.temp_min, // minimum temperature for this entry
        max: item.main.temp_max, // maximum temperature for this entry
        icon: item.weather[0].icon, // weather icon code
        desc: item.weather[0].description, // weather description
      };

      if (dailyMap.has(dayKey)) {
        // Update min/max for the day if needed
        const existing = dailyMap.get(dayKey);
        existing.min = Math.min(existing.min, payload.min);
        existing.max = Math.max(existing.max, payload.max);
      } else {
        // Add new day entry
        dailyMap.set(dayKey, { ...payload });
      }
    });

    // Return up to 5 days, sorted by timestamp
    return Array.from(dailyMap.values())
      .sort((a, b) => a.dt - b.dt)
      .slice(0, 5);
  }, [list]);

  return (
    <div className="forecast-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-6 w-9/12">
      {daily.map((d) => (
        <div key={d.dt} className="relative w-full">
          <ForecastCard {...d} unit={unit} />
        </div>
      ))}
    </div>
  );
}
