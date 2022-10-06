import { useState } from "react";

const useVisualMode = initial => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = newMode => {
    setHistory(prev => [...prev, newMode]);
    setMode(prev => newMode);
  };