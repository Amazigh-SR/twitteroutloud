import { useState } from "react";

const appModeConstants = {
  INTERVAL: "INTERVAL",
  BINGE: "BINGE",
  THREAD: "THREAD",
};

const useAppMode = function (initialMode) {
  const [appMode, setAppMode] = useState(initialMode);

  /**
   * When setting appMode, optionally trigger a player control function
   * @param newMode an app mode constant; 
   * @param action a player control function from usePlayerControl;
   */
  const updateAppMode = function(newMode, action) {
    if (action) {
      action();
    }
    setAppMode(newMode);
  }

  return {
    appMode,
    updateAppMode,
  };
};

export { useAppMode, appModeConstants };
