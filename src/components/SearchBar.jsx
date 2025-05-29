function SearchBar({ city, setCity, onSearch }) {
  return (
    <div className="mb-6 flex justify-center">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch();
        }}
        placeholder="Enter city..."
        className="p-2 w-2/3 max-w-xs border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        className="ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-md transition"
        onClick={onSearch}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
