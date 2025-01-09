import { useParams } from "react-router-dom";
import { useState } from "react";
import { Card, CardHeader, CardContent } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { Badge } from "../components/common/Badge";
import { mockStartups } from "../data/mockData";

export function StartupDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const startup = mockStartups.find((s) => s.id === id);
  const [isVoted, setIsVoted] = useState(false);

  if (!startup) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">
          Startup not found
        </h2>
      </div>
    );
  }

  const formatAmount = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {startup.name}
            </h1>
            <p className="text-xl text-gray-600">{startup.tagline}</p>
          </div>
          <Button
            variant={isVoted ? "secondary" : "primary"}
            onClick={() => setIsVoted(!isVoted)}
          >
            {isVoted ? "Voted" : "Vote for this startup"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold mb-2">Fundraising Goal</h3>
            <p className="text-2xl font-bold text-primary">
              {formatAmount(startup.fundraising.targetAmount)}
            </p>
            <p className="text-sm text-gray-500">
              for {startup.fundraising.equity}% equity
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold mb-2">Minimum Investment</h3>
            <p className="text-2xl font-bold text-primary">
              {formatAmount(startup.fundraising.minInvestment)}
            </p>
            <p className="text-sm text-gray-500">per investor</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold mb-2">Valuation</h3>
            <p className="text-2xl font-bold text-primary">
              {formatAmount(startup.fundraising.valuation)}
            </p>
            <p className="text-sm text-gray-500">pre-money</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">About the Startup</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-wrap">
                {startup.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {startup.industry.map((tag) => (
                  <Badge key={tag} variant="default">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Metrics</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {startup.metrics.revenue && (
                  <div>
                    <p className="text-sm text-gray-500">Revenue</p>
                    <p className="text-lg font-semibold">
                      {formatAmount(startup.metrics.revenue)}/month
                    </p>
                  </div>
                )}
                {startup.metrics.users && (
                  <div>
                    <p className="text-sm text-gray-500">Active Users</p>
                    <p className="text-lg font-semibold">
                      {startup.metrics.users}
                    </p>
                  </div>
                )}
                {startup.metrics.growth && (
                  <div>
                    <p className="text-sm text-gray-500">Monthly Growth</p>
                    <p className="text-lg font-semibold">
                      {startup.metrics.growth}%
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Team Size</p>
                  <p className="text-lg font-semibold">
                    {startup.teamSize} people
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Founder</h2>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-medium mb-2">
                {startup.founderName}
              </h3>
              <p className="text-gray-700">{startup.founderBio}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Company Info</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-gray-900">{startup.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Founded</p>
                  <p className="text-gray-900">
                    {new Date(startup.foundedDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Stage</p>
                  <Badge variant="info" className="mt-1">
                    {startup.stage}
                  </Badge>
                </div>
                {startup.website && (
                  <div>
                    <p className="text-sm text-gray-500">Website</p>
                    <a
                      href={startup.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {startup.website}
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
