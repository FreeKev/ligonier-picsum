import { createContext, useContext, useMemo, useState } from "react";

type UiStateContext = {
  hasSeenGallery: boolean;
  markSeenGallery: () => void;
};

const UiStateContext = createContext<UiStateContext | null>(null);

export function UiStateProvider({ children }: { children: React.ReactNode }) {
  const [hasSeenGallery, setHasSeenGallery] = useState(false);

  const seenValue = useMemo(
    () => ({
      hasSeenGallery,
      markSeenGallery: () => setHasSeenGallery(true),
    }),
    [hasSeenGallery],
  );

  return (
    <UiStateContext.Provider value={seenValue}>
      {children}
    </UiStateContext.Provider>
  );
}

export function useUiState() {
  const context = useContext(UiStateContext);

  if (!context) {
    throw new Error("useUiState to be used within UiStateProvider");
  }

  return context;
}
