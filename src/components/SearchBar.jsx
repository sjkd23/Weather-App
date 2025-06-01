import { useState, useEffect, useRef } from 'react';
import useCitySuggestions from '../hooks/useCitySuggestions';

export default function SearchBar({ value, onChange, onSelect, onSearch }) {
  // Local state for input value, error, focus, and highlighted suggestion
  const [input, setInput] = useState(value || '');
  const [showEmptyError, setShowEmptyError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  // Refs for input and wrapper (for focus and outside click handling)
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  // Keep local input in sync with parent value
  useEffect(() => {
    setInput(value || '');
  }, [value]);

  // Get city suggestions based on input
  const suggestions = useCitySuggestions(input, 5);

  // Handle input changes
  const handleInputChange = (e) => {
    setInput(e.target.value);
    onChange(e.target.value);
    setShowEmptyError(false);
    setHighlightedIndex(-1);
  };

  // Keyboard navigation for suggestions and search
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setHighlightedIndex((idx) =>
          idx < suggestions.length - 1 ? idx + 1 : 0
        );
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setHighlightedIndex((idx) =>
          idx > 0 ? idx - 1 : suggestions.length - 1
        );
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (input.trim() === '') {
        setShowEmptyError(true);
        return;
      }
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        const loc = suggestions[highlightedIndex];
        onSelect(loc);
        inputRef.current?.blur();
      } else {
        onSearch();
        inputRef.current?.blur();
      }
    } else if (e.key === 'Escape') {
      inputRef.current?.blur();
    }
  };

  // Close dropdown if clicking outside the search bar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full">
      {/* Input and search button */}
      <div
        className="
          flex w-full
          bg-white/90 dark:bg-gray-800
          border border-gray-450 dark:border-gray-600
          rounded-md overflow-hidden
          focus-within:ring-1 focus-within:ring-blue-1000
        "
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Enter city"
          className="
            flex-grow
            px-3 py-2
            bg-transparent
            text-gray-900 dark:text-gray-100
            border-none
            focus:outline-none
          "
          aria-autocomplete="list"
          aria-haspopup="listbox"
          aria-activedescendant={
            highlightedIndex >= 0
              ? `city-suggestion-${highlightedIndex}`
              : undefined
          }
        />
        <button
          type="button"
          onClick={() => {
            if (input.trim() === '') {
              setShowEmptyError(true);
            } else {
              onSearch();
              inputRef.current?.blur();
            }
          }}
          className="
            px-3 py-2
            bg-blue-500 text-white
            hover:bg-blue-600
            focus:outline-none
            justify-center
            flex items-center gap-2
            cursor-pointer
          "
          aria-label="Search"
        >
          {/* Magnifying glass icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span>Search</span>
        </button>
      </div>

      {/* Show error if input is empty and search is attempted */}
      {showEmptyError && (
        <p className="text-xs text-red-600 mt-1">
          Please enter a city name.
        </p>
      )}

      {/* Suggestions dropdown */}
      {isFocused && input.trim().length >= 2 && (
        <ul
          role="listbox"
          className="
            absolute
            bg-white dark:bg-gray-800
            rounded-md shadow-lg
            mt-1 w-full
            z-10 max-h-60 overflow-auto
          "
        >
          {suggestions.length > 0 ? (
            suggestions.map((loc, i) => {
              const displayText = `${loc.name}${loc.state ? `, ${loc.state}` : ''}, ${loc.country}`;
              const key = `${loc.name}-${loc.state || ''}-${loc.country}-${loc.lat}-${loc.lon}`;
              return (
                <li
                  role="option"
                  aria-selected={highlightedIndex === i}
                  key={key}
                >
                  <button
                    id={`city-suggestion-${i}`}
                    onMouseDown={() => onSelect(loc)}
                    className={`
                      w-full text-left px-3 py-2
                      ${highlightedIndex === i
                        ? 'bg-blue-100 dark:bg-blue-900'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }
                      focus:outline-none
                    `}
                  >
                    {displayText}
                  </button>
                </li>
              );
            })
          ) : (
            <li className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
              No matching cities
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
