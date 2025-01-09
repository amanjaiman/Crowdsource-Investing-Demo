import { useState } from "react";
import { mockStartups } from "../data/mockData";
import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";
import {
  ChatBubbleLeftIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";

// For demo purposes, we'll simulate a live stream
const DEMO_LIVE_STREAM = {
  isLive: true,
  currentStartupIndex: 0,
  nextStreamDate: new Date("2024-02-01T18:00:00Z"),
};

export function LivePitchesPage() {
  const [isLive] = useState(DEMO_LIVE_STREAM.isLive);
  const [currentStartupIndex] = useState(DEMO_LIVE_STREAM.currentStartupIndex);
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [activeTab, setActiveTab] = useState<"chat" | "qa">("chat");

  // Get top 5 startups by votes (in reverse order so highest voted goes last)
  const topStartups = [...mockStartups]
    .sort((a, b) => a.votes - b.votes)
    .slice(0, 5)
    .reverse();

  const currentStartup = topStartups[currentStartupIndex];

  const calculateEquity = (amount: number) => {
    const percentage =
      (amount / currentStartup.fundraising.targetAmount) *
      currentStartup.fundraising.equity;
    return percentage.toFixed(2);
  };

  if (!isLive) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <div className="hero-card">
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-display font-bold text-gradient">
              Next Pitch Session
            </h1>
            <div className="flex items-center justify-center space-x-4 text-gray-600">
              <CalendarIcon className="w-5 h-5" />
              <span>
                {DEMO_LIVE_STREAM.nextStreamDate.toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <ClockIcon className="w-5 h-5 ml-4" />
              <span>
                {DEMO_LIVE_STREAM.nextStreamDate.toLocaleTimeString(undefined, {
                  hour: "numeric",
                  minute: "2-digit",
                  timeZoneName: "short",
                })}
              </span>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-display font-bold mb-6">
              Upcoming Pitches
            </h2>
            <div className="space-y-4">
              {topStartups.map((startup, index) => (
                <div
                  key={startup.id}
                  className="flex items-center p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-100"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-medium mr-4">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {startup.name}
                    </h3>
                    <p className="text-sm text-gray-500">{startup.tagline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="grid grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="col-span-2 space-y-8">
          {/* Video Player */}
          <div className="aspect-video rounded-2xl bg-gray-900 flex items-center justify-center">
            <span className="text-gray-400">Live Stream Placeholder</span>
          </div>

          {/* Startup Details */}
          <div className="card p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-display font-bold">
                  {currentStartup.name}
                </h1>
                <p className="text-gray-600 mt-1">{currentStartup.tagline}</p>
              </div>
              <div className="flex items-center space-x-2">
                {currentStartup.industry.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-gray-600">{currentStartup.description}</p>
          </div>

          {/* Investment Calculator */}
          <div className="card p-6">
            <h2 className="text-xl font-display font-bold mb-4">
              Investment Calculator
            </h2>
            <div className="flex items-end space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Amount
                </label>
                <input
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="input-field"
                />
              </div>
              <div className="flex-1">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">You will receive</p>
                  <p className="text-2xl font-semibold text-primary-600">
                    {calculateEquity(Number(investmentAmount) || 0)}% equity
                  </p>
                </div>
              </div>
              <button className="btn btn-primary">Invest Now</button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Next Pitches */}
          <div className="card p-6">
            <h2 className="text-xl font-display font-bold mb-4">Next Up</h2>
            <div className="space-y-4">
              {topStartups.slice(currentStartupIndex + 1).map((startup) => (
                <div
                  key={startup.id}
                  className="flex items-center p-3 rounded-lg bg-gray-50"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {startup.name}
                    </h3>
                    <p className="text-sm text-gray-500">{startup.tagline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat and Q&A */}
          <div className="card">
            <div className="flex border-b border-gray-200">
              <button
                className={`flex-1 px-4 py-3 text-sm font-medium ${
                  activeTab === "chat"
                    ? "text-primary-600 border-b-2 border-primary-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("chat")}
              >
                <ChatBubbleLeftIcon className="w-5 h-5 inline-block mr-2" />
                Live Chat
              </button>
              <button
                className={`flex-1 px-4 py-3 text-sm font-medium ${
                  activeTab === "qa"
                    ? "text-primary-600 border-b-2 border-primary-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("qa")}
              >
                <QuestionMarkCircleIcon className="w-5 h-5 inline-block mr-2" />
                Q&A
              </button>
            </div>
            <div className="h-96 overflow-y-auto p-4">
              {activeTab === "chat" ? (
                <div className="text-center text-gray-500 mt-4">
                  Chat messages will appear here
                </div>
              ) : (
                <div className="text-center text-gray-500 mt-4">
                  Q&A messages will appear here
                </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-200">
              <input
                type="text"
                placeholder={
                  activeTab === "chat"
                    ? "Type a message..."
                    : "Ask a question..."
                }
                className="input-field"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
