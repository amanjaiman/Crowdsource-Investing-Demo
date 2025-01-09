import { useEffect, useRef, useState } from "react";
import { ArrowUpIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Dialog } from "@headlessui/react";
import { Startup } from "../../types";

interface StartupListProps {
  startups: Startup[];
  onVote: (startupId: string) => void;
}

const ITEMS_PER_PAGE = 20;

type SortOption = "votes" | "newest" | "target";
type FilterOption = "all" | "IDEA" | "MVP" | "BETA" | "LAUNCHED";

const gradients = [
  "from-primary-500 to-secondary-500",
  "from-secondary-500 to-accent-500",
  "from-accent-500 to-primary-500",
  "from-emerald-500 to-teal-500",
  "from-rose-500 to-pink-500",
] as const;

const getGradientForStartup = (id: string) => {
  const hash = id.split("").reduce((acc, char) => char.charCodeAt(0) + acc, 0);
  return gradients[hash % gradients.length];
};

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

export function StartupList({ startups, onVote }: StartupListProps) {
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("votes");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");
  const loadingRef = useRef<HTMLDivElement>(null);

  // Filter and sort startups
  const filteredAndSortedStartups = [...startups]
    .filter((startup) => filterBy === "all" || startup.stage === filterBy)
    .sort((a, b) => {
      switch (sortBy) {
        case "votes":
          return b.votes - a.votes;
        case "newest":
          return (
            new Date(b.foundedDate).getTime() -
            new Date(a.foundedDate).getTime()
          );
        case "target":
          return b.fundraising.targetAmount - a.fundraising.targetAmount;
        default:
          return 0;
      }
    });

  const displayedStartups = filteredAndSortedStartups.slice(0, displayCount);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (
          first.isIntersecting &&
          displayCount < filteredAndSortedStartups.length
        ) {
          setIsLoading(true);
          setTimeout(() => {
            setDisplayCount((prev) =>
              Math.min(prev + ITEMS_PER_PAGE, filteredAndSortedStartups.length)
            );
            setIsLoading(false);
          }, 800);
        }
      },
      { threshold: 1.0 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => observer.disconnect();
  }, [displayCount, filteredAndSortedStartups.length]);

  return (
    <>
      {/* Header and Controls */}
      <div className="max-w-5xl mx-auto mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-display font-bold">
            Top Voted Startups
          </h2>
          <div className="flex items-center space-x-3">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as FilterOption)}
              className="rounded-full px-4 py-1.5 text-sm bg-white border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Stages</option>
              <option value="IDEA">Idea Stage</option>
              <option value="MVP">MVP</option>
              <option value="BETA">Beta</option>
              <option value="LAUNCHED">Launched</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="rounded-full px-4 py-1.5 text-sm bg-white border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="votes">Most Popular</option>
              <option value="newest">Newest First</option>
              <option value="target">Highest Target</option>
            </select>
          </div>
        </div>
      </div>

      {/* Startup List */}
      <div className="max-w-5xl mx-auto space-y-2">
        {displayedStartups.map((startup, index) => (
          <>
            <div
              key={startup.id}
              className="group flex items-center space-x-3 p-3 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-100 hover:border-primary-100 transition-all duration-300 animate-fade-in"
            >
              {/* Vote Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onVote(startup.id);
                }}
                className="relative flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors group-hover:ring-2 ring-primary-100"
              >
                <ArrowUpIcon className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
                <span className="text-xs font-medium text-gray-700 group-hover:text-primary-600">
                  {startup.votes}
                </span>
                <div className="absolute inset-0 rounded-xl bg-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              {/* Startup Info */}
              <div className="flex-1 min-w-0">
                <button
                  onClick={() => setSelectedStartup(startup)}
                  className="block w-full text-left"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {startup.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">
                        {startup.tagline}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {startup.stage}
                      </span>
                    </div>
                  </div>
                  <div className="mt-1.5 flex items-center space-x-2 text-xs">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 font-medium">
                      Raising{" "}
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        notation: "compact",
                        maximumFractionDigits: 1,
                      }).format(startup.fundraising.targetAmount)}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-50 text-secondary-700 font-medium">
                      {startup.fundraising.equity}% equity
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-accent-50 text-accent-700 font-medium">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        notation: "compact",
                        maximumFractionDigits: 1,
                      }).format(
                        startup.fundraising.targetAmount /
                          (startup.fundraising.equity / 100)
                      )}{" "}
                      valuation
                    </span>
                  </div>
                </button>
              </div>
            </div>
            {index === 4 && (
              <div className="relative py-4">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 bg-white/70 backdrop-blur-sm text-sm text-gray-500">
                    Pitch cutoff for the{" "}
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
                      <span className="mx-1">pitch event</span>
                    </span>
                  </span>
                </div>
              </div>
            )}
          </>
        ))}

        {/* Loading State */}
        {displayCount < filteredAndSortedStartups.length && (
          <div
            ref={loadingRef}
            className="flex items-center justify-center py-8"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div
                  className="w-2 h-2 rounded-full bg-primary-500 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <div
                  className="w-2 h-2 rounded-full bg-primary-500 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <div
                  className="w-2 h-2 rounded-full bg-primary-500 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            ) : (
              <span className="text-sm text-gray-500">Scroll to load more</span>
            )}
          </div>
        )}
      </div>

      {/* Startup Details Dialog */}
      <Dialog
        open={selectedStartup !== null}
        onClose={() => setSelectedStartup(null)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          aria-hidden="true"
        />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-3xl w-full rounded-2xl bg-white shadow-xl">
            {selectedStartup && (
              <div className="relative">
                {/* Dialog Header with Hero Image */}
                <div
                  className={`h-48 rounded-t-2xl bg-gradient-to-br ${getGradientForStartup(
                    selectedStartup.id
                  )} relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div>
                        <Dialog.Title className="text-3xl font-display font-bold text-white">
                          {selectedStartup.name}
                        </Dialog.Title>
                        <Dialog.Description className="text-white/90 mt-2 text-lg">
                          {selectedStartup.tagline}
                        </Dialog.Description>
                      </div>
                      <button
                        onClick={() => setSelectedStartup(null)}
                        className="rounded-lg p-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <XMarkIcon className="w-6 h-6" />
                      </button>
                    </div>
                    <div className="flex items-center space-x-3">
                      {selectedStartup.industry.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dialog Content */}
                <div className="p-6 space-y-8">
                  {/* Description */}
                  <div className="prose prose-lg">
                    <p className="text-gray-600 leading-relaxed">
                      {selectedStartup.description}
                    </p>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2 space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">
                          Investment Opportunity
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="p-4 rounded-xl bg-primary-50">
                            <p className="text-sm text-primary-600 mb-1">
                              Target Raise
                            </p>
                            <p className="text-xl font-semibold text-primary-900">
                              {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                                notation: "compact",
                              }).format(
                                selectedStartup.fundraising.targetAmount
                              )}
                            </p>
                          </div>
                          <div className="p-4 rounded-xl bg-secondary-50">
                            <p className="text-sm text-secondary-600 mb-1">
                              Equity Offered
                            </p>
                            <p className="text-xl font-semibold text-secondary-900">
                              {selectedStartup.fundraising.equity}%
                            </p>
                          </div>
                          <div className="p-4 rounded-xl bg-accent-50">
                            <p className="text-sm text-accent-600 mb-1">
                              Min Investment
                            </p>
                            <p className="text-xl font-semibold text-accent-900">
                              {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                                notation: "compact",
                              }).format(
                                selectedStartup.fundraising.minInvestment
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4">
                          Resources
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <a
                            href={selectedStartup.pitchDeck}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline"
                          >
                            View Pitch Deck
                          </a>
                          <a
                            href={selectedStartup.pitchVideo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                          >
                            Watch Pitch Video
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">
                          Company Info
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-gray-500">Founded</p>
                            <p className="font-medium">
                              {new Date(
                                selectedStartup.foundedDate
                              ).toLocaleDateString(undefined, {
                                month: "long",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Stage</p>
                            <p className="font-medium">
                              {selectedStartup.stage}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-medium">
                              {selectedStartup.location}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Founder</p>
                            <p className="font-medium">
                              {selectedStartup.founderName}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
