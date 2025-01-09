import { useState } from "react";
import { Card, CardHeader, CardContent } from "../components/common/Card";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";

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
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative mb-8 p-8 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative">
          <h1 className="text-4xl font-display font-bold text-white mb-3">
            Submit Your Pitch
          </h1>
          <p className="text-lg text-white/90">
            Share your startup with potential investors and get the funding you
            need to grow.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
        <Card variant="hover" className="group transition-all duration-300">
          <CardHeader>
            <h2 className="text-xl font-display font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
              Basic Information
            </h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Startup Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="focus:ring-2"
            />
            <Input
              label="Tagline"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              helperText="A short, catchy description of your startup"
              required
              className="focus:ring-2"
            />
            <Input
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              helperText="Detailed description of your product/service and market opportunity"
              required
              className="focus:ring-2"
            />
          </CardContent>
        </Card>

        <Card variant="hover" className="group transition-all duration-300">
          <CardHeader>
            <h2 className="text-xl font-display font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
              Founder Information
            </h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Founder Name"
              name="founderName"
              value={formData.founderName}
              onChange={handleChange}
              required
              className="focus:ring-2"
            />
            <Input
              label="Founder Bio"
              name="founderBio"
              value={formData.founderBio}
              onChange={handleChange}
              helperText="Your background and relevant experience"
              required
              className="focus:ring-2"
            />
          </CardContent>
        </Card>

        <Card variant="hover" className="group transition-all duration-300">
          <CardHeader>
            <h2 className="text-xl font-display font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
              Company Details
            </h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              helperText="Main industry category"
              required
              className="focus:ring-2"
            />
            <Input
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="focus:ring-2"
            />
            <Input
              label="Team Size"
              name="teamSize"
              type="number"
              value={formData.teamSize}
              onChange={handleChange}
              required
              className="focus:ring-2"
            />
            <Input
              label="Stage"
              name="stage"
              value={formData.stage}
              onChange={handleChange}
              helperText="IDEA, MVP, BETA, or LAUNCHED"
              required
              className="focus:ring-2"
            />
            <Input
              label="Website"
              name="website"
              type="url"
              value={formData.website}
              onChange={handleChange}
              className="focus:ring-2"
            />
          </CardContent>
        </Card>

        <Card variant="hover" className="group transition-all duration-300">
          <CardHeader>
            <h2 className="text-xl font-display font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
              Fundraising Details
            </h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Valuation"
                name="valuation"
                type="number"
                value={formData.valuation}
                onChange={handleChange}
                helperText="Pre-money valuation in USD"
                required
                className="focus:ring-2"
              />
              <Input
                label="Equity Offered"
                name="equity"
                type="number"
                value={formData.equity}
                onChange={handleChange}
                helperText="Percentage of equity being offered"
                required
                className="focus:ring-2"
              />
              <Input
                label="Minimum Investment"
                name="minInvestment"
                type="number"
                value={formData.minInvestment}
                onChange={handleChange}
                helperText="Minimum investment amount per investor in USD"
                required
                className="focus:ring-2"
              />
              <Input
                label="Target Amount"
                name="targetAmount"
                type="number"
                value={formData.targetAmount}
                onChange={handleChange}
                helperText="Total funding target in USD"
                required
                className="focus:ring-2"
              />
            </div>
          </CardContent>
        </Card>

        <Card variant="hover" className="group transition-all duration-300">
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                By submitting this form, you agree to our terms and conditions.
              </p>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 transition-all duration-300"
              >
                Submit Pitch
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
