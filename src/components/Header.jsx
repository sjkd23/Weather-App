import ThemeToggle from './ThemeToggle';
import logo from '../assets/logo.png';

export default function Header({ theme, onChange }) {
    return (
        // App header with logo, title, and theme toggle
        <header className="w-full bg-blue-400 dark:bg-slate-800/60 backdrop-blur sticky top-0 z-10 mb-10 rounded-b-xl shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-24">
                {/* Left: App logo and title */}
                <div className="flex items-center">
                    <img
                        src={logo}
                        alt="My Weather App"
                        className="h-20 w-auto rounded-full shadow-lg"
                    />

                    <div className="ml-5 flex flex-col">
                        <span className="text-[1.75rem] font-semibold text-gray-100 dark:text-gray-100 sm:text-[2.5rem]">
                            Weather Checker
                        </span>
                        <span className="text-md italic text-gray-100 dark:text-gray-300 translate-x-50 translate-y-[-0.25rem] hidden sm:block">
                            Powered by the OpenWeather api
                        </span>
                    </div>
                </div>

                {/* Right: Theme toggle button */}
                <div>
                    <ThemeToggle theme={theme} onChange={onChange} />
                </div>
            </div>
        </header>
    );
}
