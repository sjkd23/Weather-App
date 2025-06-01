import { useState, useEffect } from "react";

/**
 * Returns a "debounced" copy of `value` that only updates
 * after `delay` ms have elapsed with no new changes.
 *
 * @param {*}   value  Any changing value (string, number, object).
 * @param {number} delay  Delay in milliseconds (default = 300 ms).
 */
export default function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);     // cancel on value/delay change
  }, [value, delay]);

  return debounced;
}
