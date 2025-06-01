
import { useState, useEffect, useCallback, useRef } from 'react'
import { fetchJSON } from '../lib/fetchJSON'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

/**
 * Fetch current weather + 5-day forecast by latitude & longitude.
 * Usage: const { weather, forecast, loading, error, refresh } = useWeatherData(lat, lon, unit);
 *
 * @param {number|null} lat
 * @param {number|null} lon
 * @param {'metric'|'imperial'} unit
 */
export default function useWeatherData(lat, lon, unit = 'metric') {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const controllerRef = useRef()

  const fetchAll = useCallback(async () => {
    // Don’t do anything if lat or lon is missing
    if (lat == null || lon == null) return

    // Abort any in‐flight requests
    controllerRef.current?.abort()
    const ctrl = new AbortController()
    controllerRef.current = ctrl

    setLoading(true)
    setError(null)

    try {
      // 1) Fetch current weather by coords
      const wUrl = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
      const wData = await fetchJSON(wUrl, { signal: ctrl.signal })
      setWeather(wData)

      // 2) Fetch 5-day / 3-hour forecast by coords
      const fUrl = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
      const fData = await fetchJSON(fUrl, { signal: ctrl.signal })
      setForecast(fData)
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }, [lat, lon, unit])

  // Automatically run fetchAll whenever lat, lon, or unit changes
  useEffect(() => {
    fetchAll()
    return () => controllerRef.current?.abort()
  }, [fetchAll])

  // Expose a manual "refresh" function
  const refresh = () => {
    fetchAll()
  }

  return { weather, forecast, loading, error, refresh }
}
