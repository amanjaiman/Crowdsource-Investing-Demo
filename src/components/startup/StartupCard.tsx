import { Link } from "react-router-dom";
import { Badge } from "../common/Badge";
import { Startup } from "../../types";

interface StartupCardProps {
  startup: Startup;
}

export function StartupCard({ startup }: StartupCardProps) {
  const formatAmount = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(amount);

  const getStageColor = (
    stage: Startup["stage"]
  ): "default" | "info" | "warning" | "success" => {
    switch (stage) {
      case "IDEA":
        return "default";
      case "MVP":
        return "info";
      case "BETA":
        return "warning";
      case "LAUNCHED":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <Link to={`/startup/${startup.id}`} className="block group">
      <div className="card-gradient p-1">
        <div className="relative bg-white rounded-lg overflow-hidden">
          {/* Card Header */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {startup.name}
                </h3>
                <p className="text-gray-500 text-sm mt-1">{startup.tagline}</p>
              </div>
              <Badge variant={getStageColor(startup.stage)} size="sm">
                {startup.stage}
              </Badge>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Target Raise</p>
                <p className="font-semibold text-primary-600">
                  {formatAmount(startup.fundraising.targetAmount)}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Equity Offered</p>
                <p className="font-semibold text-primary-600">
                  {startup.fundraising.equity}%
                </p>
              </div>
            </div>

            {/* Industry Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {startup.industry.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 animate-pulse-soft" />
                  <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium">
                    {startup.votes}
                  </div>
                </div>
                <span className="text-sm text-gray-500">votes</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">Founded</span>
                <span className="text-sm font-medium">
                  {new Date(startup.foundedDate).toLocaleDateString(undefined, {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Hover Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </Link>
  );
}
