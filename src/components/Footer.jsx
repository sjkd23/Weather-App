
// Footer component
export default function Footer() {
    return (
        <footer className="w-full bg-blue-900 dark:bg-gray-800 text-white py-6 mt-10 h-24 flex items-center justify-center">
            <div className="max-w-7xl mx-auto px-4 text-center text-sm">
                <span className="font-semibold">
                    Weather Forecasting App © Dylan Stauch
                </span>
                <span className="mx-2">|</span>
                <span>Powered by the OpenWeatherMap API</span>
            </div>
        </footer>
    );
}
