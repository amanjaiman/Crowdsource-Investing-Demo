import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

// Import pages
import { StartupDetailsPage } from "./pages/StartupDetailsPage";
import { SubmitPitchPage } from "./pages/SubmitPitchPage";
import { LivePitchesPage } from "./pages/LivePitchesPage";

// Import components
import { StartupList } from "./components/startup/StartupList";

// Import mock data
import { mockStartups, mockUsers } from "./data/mockData";

const queryClient = new QueryClient();

function App() {
  const [currentUser] = useState(mockUsers[0]); // For demo purposes, we'll use the first user

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
          {/* Navigation */}
          <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-lg border-b border-gray-200/50">
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
                    <Link to="/live" className="nav-link">
                      Live Pitches
                    </Link>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
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

          {/* Main Content */}
          <main className="container mx-auto px-4 pt-24 pb-12">
            <Routes>
              <Route
                path="/"
                element={<DiscoverPage startups={mockStartups} />}
              />
              <Route path="/pitch" element={<SubmitPitchPage />} />
              <Route path="/live" element={<LivePitchesPage />} />
              <Route path="/startup/:id" element={<StartupDetailsPage />} />
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
      </Router>
    </QueryClientProvider>
  );
}

// Discover Page Component
function DiscoverPage({ startups }: { startups: typeof mockStartups }) {
  const [localStartups, setLocalStartups] = useState(startups);

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
          Discover the Next Big Thing
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Connect with innovative startups and be part of their journey from the
          ground up.
        </p>
      </div>

      <StartupList startups={localStartups} onVote={handleVote} />
    </div>
  );
}

export default App;
