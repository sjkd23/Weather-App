import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchJSON } from '../lib/fetchJSON';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export default function useWeatherData(lat, lon) {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const controllerRef = useRef();

  const fetchAll = useCallback(async () => {
    if (lat == null || lon == null) return;
    controllerRef.current?.abort();
    const ctrl = new AbortController();
    controllerRef.current = ctrl;

    setLoading(true);
    setError(null);

    try {
      const wUrl = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
      const wData = await fetchJSON(wUrl, { signal: ctrl.signal });
      setWeather(wData);

      const fUrl = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
      const fData = await fetchJSON(fUrl, { signal: ctrl.signal });
      setForecast(fData);
    } catch (err) {
      if (err.name !== 'AbortError') setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [lat, lon]);

  useEffect(() => {
    fetchAll();
    return () => controllerRef.current?.abort();
  }, [fetchAll]);

  return { weather, forecast, loading, error, refresh: fetchAll };
}