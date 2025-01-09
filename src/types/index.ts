export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  investedAmount: number;
}

export interface Startup {
  id: string;
  name: string;
  tagline: string;
  description: string;
  industry: string[];
  stage: "IDEA" | "MVP" | "BETA" | "LAUNCHED";
  founderName: string;
  location: string;
  foundedDate: string;
  fundraising: {
    targetAmount: number;
    equity: number;
    minInvestment: number;
  };
  votes: number;
  pitchVideo: string;
  pitchDeck: string;
}
