import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

// Import pages
import { SubmitPitchPage } from "./pages/SubmitPitchPage";
import { LivePitchesPage } from "./pages/LivePitchesPage";

// Import components
import { StartupList } from "./components/startup/StartupList";
import { BackToTop } from "./components/common/BackToTop";
import { LivePitchProvider, useLivePitch } from "./contexts/LivePitchContext";

// Import mock data
import { mockStartups, mockUsers } from "./data/mockData";

const queryClient = new QueryClient();

const getNextFriday = () => {
  const today = new Date();
  const day = today.getDay();
  const diff = day <= 5 ? 5 - day : 12 - day;
  return new Date(today.setDate(today.getDate() + diff));
};

const getOrdinalSuffix = (day: number) => {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

function NavBar({ currentUser }: { currentUser: (typeof mockUsers)[0] }) {
  const { isLive, toggleLiveState } = useLivePitch();
  const location = useLocation();
  const isLivePage = location.pathname === "/live";

  return (
    <nav className="bg-white/70 backdrop-blur-lg border-b border-gray-200/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-2xl font-display font-bold text-gradient"
            >
              StartupLaunch
            </Link>
            <div className="hidden md:flex space-x-1">
              <Link to="/" className="nav-link">
                Discover
              </Link>
              <Link to="/pitch" className="nav-link">
                Submit Pitch
              </Link>
              <Link to="/live" className="nav-link relative group">
                <span className="flex items-center">
                  Live Pitches
                  {isLive && !isLivePage && (
                    <span className="ml-1.5 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                  )}
                  {isLive && isLivePage && (
                    <span className="ml-1.5 relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  )}
                </span>
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Live Toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">No Live Event</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleLiveState}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isLive ? "bg-primary-500" : "bg-gray-200"
                  }`}
                  role="switch"
                  aria-checked={isLive}
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      isLive ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
                <span className="text-sm text-gray-600">Live Event</span>
              </div>
            </div>
            <div className="flex items-center space-x-3 px-4 py-2 rounded-lg bg-gray-50/50 border border-gray-200/50">
              <span className="text-sm font-medium text-gray-700">
                {currentUser.name}
              </span>
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full ring-2 ring-white"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  const [currentUser] = useState(mockUsers[0]); // For demo purposes, we'll use the first user

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <LivePitchProvider>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            <NavBar currentUser={currentUser} />

            {/* Main Content */}
            <main className="container mx-auto px-4 pb-12">
              <Routes>
                <Route
                  path="/"
                  element={<DiscoverPage startups={mockStartups} />}
                />
                <Route path="/pitch" element={<SubmitPitchPage />} />
                <Route path="/live" element={<LivePitchesPage />} />
              </Routes>
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-200/50 bg-white/50 backdrop-blur-sm">
              <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <div className="flex flex-col items-center md:items-start">
                    <span className="text-gradient font-display font-bold text-xl mb-2">
                      StartupLaunch
                    </span>
                    <p className="text-sm text-gray-600">
                      Connecting visionary founders with passionate investors
                    </p>
                  </div>
                  <div className="flex space-x-8">
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      About
                    </a>
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Terms
                    </a>
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Privacy
                    </a>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200/50 text-center text-sm text-gray-600">
                  © 2024 StartupLaunch. All rights reserved.
                </div>
              </div>
            </footer>
          </div>
        </LivePitchProvider>
      </Router>
    </QueryClientProvider>
  );
}

// Discover Page Component
function DiscoverPage({ startups }: { startups: typeof mockStartups }) {
  const [localStartups, setLocalStartups] = useState(startups);
  const { isLive } = useLivePitch();

  const handleVote = (startupId: string) => {
    setLocalStartups((prev) =>
      prev.map((s) => (s.id === startupId ? { ...s, votes: s.votes + 1 } : s))
    );
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <h1 className="text-4xl md:text-5xl md:leading-normal font-display font-bold text-gradient animate-gradient">
          Invest in the Next Big Thing
        </h1>
        <p className="text-xl text-gray-600 mx-auto">
          Vote for your favorite startup to invest in them live on{" "}
          <span className="inline-flex items-center font-medium">
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              {(() => {
                const date = getNextFriday();
                const day = date.getDate();
                return date
                  .toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })
                  .replace(/\d+/, `${day}${getOrdinalSuffix(day)}`);
              })()}
            </span>
          </span>
          .
        </p>
        {isLive && (
          <Link
            to="/live"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 group"
          >
            <span className="relative flex h-3 w-3 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            Live Pitch Event in Progress
            <span className="group-hover:translate-x-1 transition-transform duration-300 ml-2">
              →
            </span>
          </Link>
        )}
      </div>

      <StartupList startups={localStartups} onVote={handleVote} />
      <BackToTop />
    </div>
  );
}

export default App;
