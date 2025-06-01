
// ThemeToggle lets users switch between light, dark, or fancy themes
export default function ThemeToggle({ theme, onChange }) {
  // Theme options with their styles and labels
  const buttons = [
    {
      value: 'light',
      bgClass: 'bg-white',
      label: 'Light mode',
    },
    {
      value: 'dark',
      bgClass: 'bg-gray-800',
      label: 'Dark mode',
    },
    {
      value: 'fancy',
      bgClass: 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500',
      label: 'Fancy mode',
    },
  ];

  return (
    <div className="flex items-center space-x-4">
      {/* Render a button for each theme option */}
      {buttons.map(({ value, bgClass, label }) => {
        const isSelected = theme === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            aria-label={label}
            className={`
              w-8 h-8 rounded-full cursor-pointer
              ${bgClass}
              transition-transform duration-200
              ${isSelected ? 'ring-2 ring-blue-500 scale-105' : 'ring-2 ring-transparent scale-100'}
            `}
          />
        );
      })}
    </div>
  );
}
