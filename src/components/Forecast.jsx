import { format } from "date-fns";

function Forecast({ forecastData, unit }) {
  const daily = {};

  forecastData.list.forEach((entry) => {
    const date = entry.dt_txt.split(" ")[0];
    if (!daily[date]) {
      daily[date] = [];
    }
    daily[date].push(entry);
  });

  const summarized = Object.entries(daily)
    .slice(1, 6)
    .map(([date, entries]) => {
      const temps = entries.map((e) => e.main.temp);
      const min = Math.min(...temps);
      const max = Math.max(...temps);
      const icon = entries[0].weather[0].icon;
      const desc = entries[0].weather[0].description;
      return { date, min, max, icon, desc };
    });

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">5-Day Forecast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-sm">
        {summarized.map((day) => (
          <div
            key={day.date}
            className="bg-white rounded-md shadow p-3 text-center"
          >
            <p className="font-medium">{format(new Date(day.date), "EEE")}</p>
            <img
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.desc}
              className="mx-auto"
            />
            <p>{day.desc}</p>
            <p className="mt-1 font-semibold">
              {Math.round(day.max)}° / {Math.round(day.min)}°{" "}
              {unit === "metric" ? "C" : "F"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
