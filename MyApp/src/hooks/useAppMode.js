import { useState } from "react";

const appModeConstants = {
  CURATE: "CURATE",
  BINGE: "BINGE",
  THREAD: "THREAD",
};

const useAppMode = function (initialMode) {
  const [appMode, setAppMode] = useState(initialMode);

  return {
    appMode,
    setAppMode,
  };
};

export { useAppMode, appModeConstants };
