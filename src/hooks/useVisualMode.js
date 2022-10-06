import { useState } from "react";

const useVisualMode = initial => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = newMode => {
    setHistory(prev => [...prev, newMode]);
    setMode(prev => newMode);
  };

  const back = () => {
    if (history.length === 1) return [initial];
    history.pop();
    setMode(prev => history.slice(-1)[0]);
  };

  return {
    mode,
    transition,
    back,
  };
};

export default useVisualMode;
