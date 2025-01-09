import { Startup, User } from "../types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Jane Doe",
    email: "jane@example.com",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
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

  const amounts = [
    25000, // 25k
    50000, // 50k
    75000, // 75k
    100000, // 100k
    125000, // 125k
    150000, // 150k
    175000, // 175k
    200000, // 200k
    250000, // 250k
    300000, // 300k
    400000, // 400k
    500000, // 500k
    600000, // 600k
    750000, // 750k
    1000000, // 1M
  ];
  const equityOptions = [5, 7.5, 10, 12.5, 15, 17.5, 20, 25];
  const targetAmount = amounts[Math.floor(Math.random() * amounts.length)];
  const equity =
    equityOptions[Math.floor(Math.random() * equityOptions.length)];
  const id = `startup-${index + 1}`;
  const name = startupNames[index % startupNames.length];

  return {
    id,
    name,
    imageUrl: `https://picsum.photos/seed/${id}/200`,
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
      targetAmount: targetAmount,
      equity: equity,
      minInvestment: 0,
    },
    votes: Math.floor(Math.random() * 1000),
    pitchVideo: "https://example.com/video.mp4",
    pitchDeck: "https://example.com/deck.pdf",
  };
}

export const mockStartups: Startup[] = Array.from({ length: 100 }, (_, i) =>
  generateStartup(i)
);
