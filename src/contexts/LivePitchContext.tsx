import { createContext, useContext, ReactNode, useState } from "react";
import { DEMO_LIVE_STREAM } from "../pages/LivePitchesPage";

interface LivePitchContextType {
  isLive: boolean;
  nextStreamDate: Date;
  toggleLiveState: () => void;
}

const LivePitchContext = createContext<LivePitchContextType | undefined>(
  undefined
);

export function LivePitchProvider({ children }: { children: ReactNode }) {
  const [isLive, setIsLive] = useState(DEMO_LIVE_STREAM.isLive);

  const value = {
    isLive,
    nextStreamDate: DEMO_LIVE_STREAM.nextStreamDate,
    toggleLiveState: () => setIsLive((prev) => !prev),
  };

  return (
    <LivePitchContext.Provider value={value}>
      {children}
    </LivePitchContext.Provider>
  );
}

export function useLivePitch() {
  const context = useContext(LivePitchContext);
  if (context === undefined) {
    throw new Error("useLivePitch must be used within a LivePitchProvider");
  }
  return context;
}
