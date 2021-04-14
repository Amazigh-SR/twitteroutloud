import { useState } from 'react'

const appModeConstants = {
  CURATE: "CURATE",
  BINGE: "BINGE",
  THREAD: "THREADS"
};

const useAppMode = function() {
  const [appMode, setAppMode] = useState(null);

  return {
    appMode,
    setAppMode
  }
}

export { useAppMode, appModeConstants };