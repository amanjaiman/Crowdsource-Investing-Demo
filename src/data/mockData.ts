import { Startup, User } from "../types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    investedAmount: 50000,
  },
];

const startupNames = [
  "TechFlow",
  "GreenEarth Solutions",
  "HealthMate AI",
  "CryptoVault",
  "EduTech Pro",
  "SmartHome Hub",
  "FoodChain",
  "CloudSecure",
  "FitTech",
  "ArtificialMinds",
  "SpaceVentures",
  "BioInnovate",
  "UrbanMobility",
  "FinanceFlow",
  "RetailTech",
  "CleanEnergy",
  "DataInsights",
  "MedTech Solutions",
  "GameVerse",
  "AIAssistant",
  "RoboTech",
  "VirtualReality",
  "BlockchainSolutions",
  "DroneDelivery",
  "SmartFarming",
  "QuantumComputing",
  "CyberSecurity",
  "IoTConnect",
  "3DPrinting",
  "SustainableFashion",
];

const industries = [
  "AI/ML",
  "Healthcare",
  "Fintech",
  "EdTech",
  "CleanTech",
  "Blockchain",
  "IoT",
  "SaaS",
  "E-commerce",
  "Gaming",
  "Biotech",
  "Robotics",
  "Cybersecurity",
  "AgTech",
  "SpaceTech",
];

const stages = ["IDEA", "MVP", "BETA", "LAUNCHED"] as const;

function generateStartup(index: number): Startup {
  const randomIndustries = Array.from(
    { length: Math.floor(Math.random() * 2) + 1 },
    () => industries[Math.floor(Math.random() * industries.length)]
  );

  const targetAmount = Math.floor(Math.random() * 9000000) + 1000000;
  const equity = Math.floor(Math.random() * 15) + 5;

  return {
    id: `startup-${index + 1}`,
    name: startupNames[index % startupNames.length],
    tagline: `Revolutionizing ${randomIndustries[0]} with innovative solutions`,
    description: `We are building cutting-edge solutions in the ${
      randomIndustries[0]
    } space, leveraging ${
      randomIndustries[1] || "technology"
    } to solve real-world problems.`,
    industry: Array.from(new Set(randomIndustries)),
    stage: stages[Math.floor(Math.random() * stages.length)],
    founderName: `Founder ${index + 1}`,
    location: "San Francisco, CA",
    foundedDate: new Date(
      2020 + Math.floor(Math.random() * 4),
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1
    ).toISOString(),
    fundraising: {
      targetAmount,
      equity,
      minInvestment: Math.floor(targetAmount * 0.01),
    },
    votes: Math.floor(Math.random() * 1000),
    pitchVideo: "https://example.com/video.mp4",
    pitchDeck: "https://example.com/deck.pdf",
  };
}

export const mockStartups: Startup[] = Array.from({ length: 100 }, (_, i) =>
  generateStartup(i)
);
