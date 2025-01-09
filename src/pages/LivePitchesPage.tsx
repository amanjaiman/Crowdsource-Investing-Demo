import { useState, useEffect } from "react";
import { mockStartups } from "../data/mockData";
import {
  CalendarIcon,
  ClockIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";
import {
  ChatBubbleLeftIcon,
  QuestionMarkCircleIcon,
  CheckCircleIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import { useLivePitch } from "../contexts/LivePitchContext";

// For demo purposes, we'll simulate a live stream
export const DEMO_LIVE_STREAM = {
  isLive: false,
  currentStartupIndex: 0,
  nextStreamDate: new Date("2024-02-01T18:00:00Z"),
  pitchDuration: 20 * 60, // 20 minutes in seconds
  startTime: new Date(Date.now() - 5 * 60 * 1000), // Started 5 minutes ago
};

const getRemainingTime = () => {
  const elapsedSeconds = Math.floor(
    (Date.now() - DEMO_LIVE_STREAM.startTime.getTime()) / 1000
  );
  const remainingSeconds = Math.max(
    0,
    DEMO_LIVE_STREAM.pitchDuration - elapsedSeconds
  );
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const getTimeUntilNextFriday = () => {
  const now = new Date();
  const nextFriday = new Date(now);
  nextFriday.setDate(now.getDate() + ((7 - now.getDay() + 5) % 7 || 7));
  nextFriday.setHours(18, 0, 0, 0); // Set to 6 PM
  const diff = nextFriday.getTime() - now.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return { days, hours, minutes, nextFriday };
};

export function LivePitchesPage() {
  const { isLive } = useLivePitch();
  const [currentStartupIndex] = useState(DEMO_LIVE_STREAM.currentStartupIndex);
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [activeTab, setActiveTab] = useState<"chat" | "qa">("chat");
  const [showInvestmentSuccess, setShowInvestmentSuccess] = useState(false);
  const [totalInvested, setTotalInvested] = useState(75000);
  const [remainingTime, setRemainingTime] = useState(getRemainingTime());
  const [isScrolled, setIsScrolled] = useState(false);
  const [countdown, setCountdown] = useState(getTimeUntilNextFriday());

  useEffect(() => {
    let timer: number;

    if (isLive) {
      timer = setInterval(() => {
        setRemainingTime(getRemainingTime());
      }, 1000);
    } else {
      timer = setInterval(() => {
        setCountdown(getTimeUntilNextFriday());
      }, 1000);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll position

    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLive]);

  // Get top 5 startups by votes (highest votes first)
  const topStartups = [...mockStartups]
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 5);

  const currentStartup = topStartups[currentStartupIndex];

  const calculateEquity = (amount: number) => {
    // If company wants $100k for 10%, then valuation is $1M
    // So $10k would get you 1% ($10k / $1M = 0.01 = 1%)
    const valuation =
      currentStartup.fundraising.targetAmount /
      (currentStartup.fundraising.equity / 100);
    const percentage = (amount / valuation) * 100;
    return percentage < 0.01 ? "< 0.01" : percentage.toFixed(2);
  };

  const calculatePotentialReturn = (amount: number) => {
    // Calculate equity percentage using valuation
    const valuation =
      currentStartup.fundraising.targetAmount /
      (currentStartup.fundraising.equity / 100);
    const equityPercentage = (amount / valuation) * 100;
    // Calculate what $10,000 in revenue would mean for this investment
    const returnOn10k = (10000 * equityPercentage) / 100;
    return returnOn10k < 0.01 ? "< $0.01" : `$${returnOn10k.toFixed(2)}`;
  };

  const formatInvestmentAmount = (value: string) => {
    // Remove any non-digit characters
    const digits = value.replace(/\D/g, "");
    // Convert to number and format with commas
    return digits ? Number(digits).toLocaleString() : "";
  };

  const getNumericValue = (value: string) => {
    // Remove commas and convert to number
    return Number(value.replace(/,/g, ""));
  };

  const handleInvest = () => {
    const amount = getNumericValue(investmentAmount);
    if (amount > 0) {
      setTotalInvested((prev) => prev + amount);
      setShowInvestmentSuccess(true);
      setInvestmentAmount("");
      setTimeout(() => setShowInvestmentSuccess(false), 2500);
    }
  };

  const scrollToInvestment = () => {
    const element = document.getElementById("investment-section");
    const header = document.querySelector("[data-sticky-header]");
    if (element && header) {
      const headerHeight = header.getBoundingClientRect().height;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - headerHeight - 24, // 24px extra padding
        behavior: "smooth",
      });
    }
  };

  if (!isLive) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <div className="hero-card">
          <div className="text-center space-y-8">
            <h1 className="text-4xl font-display font-bold text-gradient">
              Next Pitch Session
            </h1>
            <div className="flex items-center justify-center space-x-4 text-gray-600">
              <CalendarIcon className="w-5 h-5" />
              <span>
                {countdown.nextFriday.toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <ClockIcon className="w-5 h-5 ml-4" />
              <span>
                {countdown.nextFriday.toLocaleTimeString(undefined, {
                  hour: "numeric",
                  minute: "2-digit",
                  timeZoneName: "short",
                })}
              </span>
            </div>

            {/* Countdown Timer */}
            <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
              <div className="text-center">
                <div className="text-4xl font-display font-bold text-gradient mb-2">
                  {countdown.days}
                </div>
                <div className="text-sm text-gray-600">Days</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-display font-bold text-gradient mb-2">
                  {countdown.hours}
                </div>
                <div className="text-sm text-gray-600">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-display font-bold text-gradient mb-2">
                  {countdown.minutes}
                </div>
                <div className="text-sm text-gray-600">Minutes</div>
              </div>
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
      {/* Sticky Progress Bar */}
      <div
        data-sticky-header
        className={`sticky top-0 z-50 -mt-5 pt-5 -mx-4 px-4 mb-8 transition-all duration-300 ${
          isScrolled ? "" : ""
        }`}
      >
        <div className="bg-white/90 backdrop-blur-lg shadow-sm border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-10">
            {/* Progress and Investment Stats */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-display font-semibold text-gray-900">
                  Funding Progress
                </h3>
                <div>
                  <span className="text-xl font-semibold text-primary-600">
                    ${totalInvested.toLocaleString()}
                  </span>
                  <span className="text-gray-500 ml-2">
                    of $
                    {currentStartup.fundraising.targetAmount.toLocaleString()} (
                    {currentStartup.fundraising.equity}% equity)
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden ring-1 ring-inset ring-gray-200/50">
                  <div
                    className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        100,
                        (totalInvested /
                          currentStartup.fundraising.targetAmount) *
                          100
                      )}%`,
                    }}
                  />
                </div>
                <div className="flex items-center justify-end gap-2 text-sm text-gray-500">
                  <ChartBarIcon className="w-4 h-4 text-primary-500" />
                  <span>
                    {Math.floor(totalInvested / 5000)} investors participating
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8 pl-8 border-l border-gray-200">
              {/* Timer */}
              <div className="flex flex-col items-center">
                <div className="text-2xl font-display font-bold text-gradient">
                  {remainingTime}
                </div>
                <div className="text-sm text-gray-500">Time Remaining</div>
              </div>

              {/* Quick Investment CTA */}
              <button className="btn btn-primary" onClick={scrollToInvestment}>
                Invest Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Full Width */}
      <div className="space-y-8">
        {/* Video and Chat Section */}
        <div className="flex gap-6">
          {/* Video Player */}
          <div className="flex-1">
            <div className="aspect-video rounded-2xl bg-gray-900 flex items-center justify-center relative">
              <span className="text-gray-400">Live Stream Placeholder</span>

              {/* Upcoming Pitches Overlay */}
              <div className="absolute right-0 top-0 bottom-0 w-8 flex items-center z-30">
                {topStartups
                  .slice(currentStartupIndex + 1, currentStartupIndex + 3)
                  .map((startup, idx) => (
                    <div
                      key={startup.id}
                      className="group absolute right-2"
                      style={{
                        top: "50%",
                        transform: `translateY(calc(-50% + ${
                          idx === 0 ? -25 : 25
                        }px))`,
                      }}
                    >
                      {/* Minimized State - Vertical Bar */}
                      <div className="relative">
                        <div className="bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full h-10 w-1.5 transition-all duration-300" />

                        {/* Hover State Box */}
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                          <div className="bg-black/90 backdrop-blur-sm rounded-lg w-64 p-3 shadow-xl">
                            <div className="text-xs font-medium text-primary-400 mb-1">
                              Up {idx === 0 ? "Next" : "Later"}
                            </div>
                            <div className="font-medium text-white truncate">
                              {startup.name}
                            </div>
                            <p className="text-sm text-gray-400 mt-0.5 line-clamp-2">
                              {startup.tagline}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Chat and Q&A */}
          <div className="w-80 flex flex-col card">
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
            <div className="flex-1 overflow-y-auto p-4">
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

        {/* Startup Details */}
        <div className="card p-8 space-y-8">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold text-gradient mb-2">
                {currentStartup.name}
              </h1>
              <p className="text-lg text-gray-600">{currentStartup.tagline}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentStartup.industry.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-50 text-primary-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-6">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="text-sm font-medium text-gray-500 mb-1">
                Stage
              </div>
              <div className="font-semibold text-gray-900">
                {currentStartup.stage}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="text-sm font-medium text-gray-500 mb-1">
                Founded
              </div>
              <div className="font-semibold text-gray-900">
                {new Date(currentStartup.foundedDate).toLocaleDateString(
                  undefined,
                  {
                    month: "long",
                    year: "numeric",
                  }
                )}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="text-sm font-medium text-gray-500 mb-1">
                Location
              </div>
              <div className="font-semibold text-gray-900">
                {currentStartup.location}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="text-sm font-medium text-gray-500 mb-1">
                Founder
              </div>
              <div className="font-semibold text-gray-900">
                {currentStartup.founderName}
              </div>
            </div>
          </div>

          {/* Description and Highlights */}
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-display font-semibold mb-3">
                  About the Company
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {currentStartup.description}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-display font-semibold mb-3">
                  Why Invest
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary-600 text-sm font-semibold">
                        1
                      </span>
                    </div>
                    <p className="text-gray-600">
                      Early-stage investment opportunity in the rapidly growing{" "}
                      {currentStartup.industry[0]} sector
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary-600 text-sm font-semibold">
                        2
                      </span>
                    </div>
                    <p className="text-gray-600">
                      Experienced founding team with deep industry expertise
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary-600 text-sm font-semibold">
                        3
                      </span>
                    </div>
                    <p className="text-gray-600">
                      Clear path to market with validated customer demand
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl bg-gradient-to-br from-primary-50 to-secondary-50 p-6 border border-primary-100">
                <h3 className="text-lg font-display font-semibold mb-4">
                  Investment Highlights
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">
                      Raising
                    </div>
                    <div className="text-2xl font-semibold text-gradient">
                      $
                      {currentStartup.fundraising.targetAmount.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">
                      Equity Offered
                    </div>
                    <div className="text-2xl font-semibold text-gradient">
                      {currentStartup.fundraising.equity}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">
                      Valuation
                    </div>
                    <div className="text-2xl font-semibold text-gradient">
                      $
                      {(
                        currentStartup.fundraising.targetAmount /
                        (currentStartup.fundraising.equity / 100)
                      ).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={scrollToInvestment}
                className="w-full btn btn-primary py-4"
              >
                Invest Now
              </button>
            </div>
          </div>
        </div>

        {/* Investment Calculator */}
        <div
          id="investment-section"
          className="card p-8 relative border-2 border-primary-100"
        >
          {showInvestmentSuccess && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-lg transition-opacity z-10">
              <div className="text-center">
                <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Investment Successful!
                </h3>
                <p className="text-gray-600 text-lg mt-2">
                  Thank you for investing $
                  {Number(investmentAmount).toLocaleString()}
                </p>
              </div>
            </div>
          )}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-display font-bold text-gradient">
                  Investment Calculator
                </h2>
                <div className="text-sm text-gray-600 mt-1">
                  {currentStartup.name} is offering{" "}
                  {currentStartup.fundraising.equity}% equity
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Valuation: $
                {(
                  currentStartup.fundraising.targetAmount /
                  (currentStartup.fundraising.equity / 100)
                ).toLocaleString()}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Investment Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900 font-medium">
                      $
                    </span>
                    <input
                      type="text"
                      value={formatInvestmentAmount(investmentAmount)}
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                      placeholder="0"
                      className="input-field text-lg pl-7"
                    />
                  </div>
                </div>
                <button
                  className={`w-full text-lg py-4 transition-all duration-300 rounded-lg font-medium ${
                    getNumericValue(investmentAmount)
                      ? "btn btn-primary hover:shadow-lg"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                  onClick={handleInvest}
                  disabled={!getNumericValue(investmentAmount)}
                >
                  Invest Now
                </button>
              </div>

              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 flex flex-col justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-600 mb-2">
                    You will receive
                  </div>
                  <div className="text-3xl font-semibold text-gradient mb-2">
                    {investmentAmount
                      ? calculateEquity(getNumericValue(investmentAmount))
                      : "0"}
                    % equity
                  </div>
                  <div className="text-sm text-gray-600">
                    of {currentStartup.name} valued at $
                    {(
                      currentStartup.fundraising.targetAmount /
                      (currentStartup.fundraising.equity / 100)
                    ).toLocaleString()}
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-primary-100">
                  <div className="text-sm font-medium text-gray-600 mb-1">
                    Potential Returns
                  </div>
                  <div className="text-sm text-gray-600">
                    For every $10,000 in revenue, you'll receive{" "}
                    {investmentAmount
                      ? calculatePotentialReturn(
                          getNumericValue(investmentAmount)
                        )
                      : "$0"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Documents Section */}
        <div className="card p-6">
          <h2 className="text-xl font-display font-bold text-gradient mb-6">
            Documents
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: "Pitch Deck", type: "pdf" },
              { name: "Financial Projections", type: "xlsx" },
              { name: "Market Analysis", type: "pdf" },
              { name: "Team Overview", type: "pdf" },
            ].map((doc) => (
              <a
                key={doc.name}
                href="#"
                className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-primary-500 hover:bg-primary-50/50 transition-colors group"
              >
                <DocumentIcon className="w-6 h-6 text-gray-400 group-hover:text-primary-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-900 group-hover:text-primary-600">
                    {doc.name}
                  </p>
                  <p className="text-sm text-gray-500 uppercase">{doc.type}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
