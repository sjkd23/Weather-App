
import { useEffect, useState } from 'react';
import useDebounce from './useDebounce';
import { fetchJSON } from '../lib/fetchJSON';

const GEO_API_BASE = 'https://api.openweathermap.org/geo/1.0/direct';
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

/**
 * Given a partial city name (`query`), returns up to `limit` matching locations.
 * Debounces the user’s input by 300ms internally.
 */
/**
 * Custom React hook to fetch city suggestions from the OpenWeather geocoding API
 * based on a user's input query. Debounces the query to minimize API calls and
 * only triggers requests when the query is at least 2 characters long.
 *
 * @param {string} query - The user's input string to search for city suggestions.
 * @param {number} [limit=5] - The maximum number of city suggestions to return.
 * @returns {Array<Object>} suggestions - An array of city suggestion objects returned by the API.
 *
 * @example
 * const suggestions = useCitySuggestions('Montreal');
 * // suggestions = [{ name: 'Montreal', lat: ..., lon: ..., country: ... }, ...]
 *
 * @see https://openweathermap.org/api/geocoding-api
 */
export default function useCitySuggestions(query, limit = 5) {
  const [suggestions, setSuggestions] = useState([]);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    // Don’t call OpenWeather’s geocoding endpoint until the user has typed ≥2 chars
    if (!debouncedQuery || debouncedQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    const ctrl = new AbortController();
    const url =
      `${GEO_API_BASE}?` +
      `q=${encodeURIComponent(debouncedQuery)}` +
      `&limit=${limit}` +
      `&appid=${API_KEY}`;

    fetchJSON(url, { signal: ctrl.signal })
      .then((data) => {
        // OpenWeather’s “direct” endpoint returns an array of { name, lat, lon, country, … }
        setSuggestions(data);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          // In case of any other error, reset suggestions to empty array:
          console.error('City suggestions error:', err);
          setSuggestions([]);
        }
      });

    // Cleanup: abort if component unmounts or query changes
    return () => ctrl.abort();
  }, [debouncedQuery, limit]);

  return suggestions;
}
