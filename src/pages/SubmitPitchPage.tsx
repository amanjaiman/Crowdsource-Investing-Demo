import { useState } from "react";
import { Card, CardHeader, CardContent } from "../components/common/Card";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { DocumentIcon } from "@heroicons/react/24/outline";
import {
  ChartBarIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";

interface FormData {
  name: string;
  tagline: string;
  description: string;
  founderName: string;
  founderBio: string;
  industry: string;
  location: string;
  teamSize: string;
  stage: string;
  valuation: string;
  equity: string;
  minInvestment: string;
  targetAmount: string;
  website: string;
}

export function SubmitPitchPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    tagline: "",
    description: "",
    founderName: "",
    founderBio: "",
    industry: "",
    location: "",
    teamSize: "",
    stage: "",
    valuation: "",
    equity: "",
    minInvestment: "",
    targetAmount: "",
    website: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to an API
    console.log("Form submitted:", formData);
    alert("Your pitch has been submitted for review!");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="relative mb-8 p-8 rounded-2xl bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/0 to-black/20 backdrop-blur-sm" />
        <div className="relative flex items-center gap-6">
          <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md shadow-xl border border-white/20">
            <DocumentIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2 tracking-tight">
              Submit Your Pitch
            </h1>
            <p className="text-base text-white/90 max-w-2xl leading-relaxed">
              Share your startup with potential investors and get the funding
              you need to grow.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
        <Card className="group transition-all duration-300 hover:shadow-xl border border-gray-100/50 bg-white/70 backdrop-blur-sm">
          <CardHeader className="border-b border-gray-100 bg-gradient-to-br from-gray-50 to-white/50 p-8">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary-50 text-primary-600">
                <RocketLaunchIcon className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-display font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                Basic Information
              </h2>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <Input
              label="Startup Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="focus:ring-2 focus:ring-primary-500"
            />
            <Input
              label="Tagline"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              helperText="A short, catchy description of your startup"
              required
              className="focus:ring-2 focus:ring-primary-500"
            />
            <Input
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              helperText="Detailed description of your product/service and market opportunity"
              required
              className="focus:ring-2 focus:ring-primary-500"
            />
          </CardContent>
        </Card>

        <Card className="group transition-all duration-300 hover:shadow-xl border border-gray-100/50 bg-white/70 backdrop-blur-sm">
          <CardHeader className="border-b border-gray-100 bg-gradient-to-br from-gray-50 to-white/50 p-8">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary-50 text-primary-600">
                <UserGroupIcon className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-display font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                Founder Information
              </h2>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <Input
              label="Founder Name"
              name="founderName"
              value={formData.founderName}
              onChange={handleChange}
              required
              className="focus:ring-2 focus:ring-primary-500"
            />
            <Input
              label="Founder Bio"
              name="founderBio"
              value={formData.founderBio}
              onChange={handleChange}
              helperText="Your background and relevant experience"
              required
              className="focus:ring-2 focus:ring-primary-500"
            />
          </CardContent>
        </Card>

        <Card className="group transition-all duration-300 hover:shadow-xl border border-gray-100/50 bg-white/70 backdrop-blur-sm">
          <CardHeader className="border-b border-gray-100 bg-gradient-to-br from-gray-50 to-white/50 p-8">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary-50 text-primary-600">
                <ChartBarIcon className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-display font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                Company Details
              </h2>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                helperText="Main industry category"
                required
                className="focus:ring-2 focus:ring-primary-500"
              />
              <Input
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="focus:ring-2 focus:ring-primary-500"
              />
              <Input
                label="Team Size"
                name="teamSize"
                type="number"
                value={formData.teamSize}
                onChange={handleChange}
                required
                className="focus:ring-2 focus:ring-primary-500"
              />
              <Input
                label="Stage"
                name="stage"
                value={formData.stage}
                onChange={handleChange}
                helperText="IDEA, MVP, BETA, or LAUNCHED"
                required
                className="focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <Input
              label="Website"
              name="website"
              type="url"
              value={formData.website}
              onChange={handleChange}
              className="focus:ring-2 focus:ring-primary-500"
            />
          </CardContent>
        </Card>

        <Card className="group transition-all duration-300 hover:shadow-xl border border-gray-100/50 bg-white/70 backdrop-blur-sm">
          <CardHeader className="border-b border-gray-100 bg-gradient-to-br from-gray-50 to-white/50 p-8">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary-50 text-primary-600">
                <CurrencyDollarIcon className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-display font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                Fundraising Details
              </h2>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Valuation"
                name="valuation"
                type="number"
                value={formData.valuation}
                onChange={handleChange}
                helperText="Pre-money valuation in USD"
                required
                className="focus:ring-2 focus:ring-primary-500"
              />
              <Input
                label="Equity Offered"
                name="equity"
                type="number"
                value={formData.equity}
                onChange={handleChange}
                helperText="Percentage of equity being offered"
                required
                className="focus:ring-2 focus:ring-primary-500"
              />
              <Input
                label="Minimum Investment"
                name="minInvestment"
                type="number"
                value={formData.minInvestment}
                onChange={handleChange}
                helperText="Minimum investment amount per investor in USD"
                required
                className="focus:ring-2 focus:ring-primary-500"
              />
              <Input
                label="Target Amount"
                name="targetAmount"
                type="number"
                value={formData.targetAmount}
                onChange={handleChange}
                helperText="Total funding target in USD"
                required
                className="focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between p-8 rounded-2xl bg-gradient-to-br from-gray-50/90 to-white/90 backdrop-blur-sm border border-gray-100/50 shadow-lg">
          <div className="max-w-lg">
            <p className="text-sm text-gray-600">
              By submitting this form, you agree to our terms and conditions.
              Your pitch will be reviewed by our team before being listed.
            </p>
          </div>
          <Button
            type="submit"
            size="lg"
            className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white px-10 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            Submit Pitch
          </Button>
        </div>
      </form>
    </div>
  );
}
