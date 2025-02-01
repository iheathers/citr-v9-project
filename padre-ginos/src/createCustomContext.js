import { useEffect, useState } from "react";

function createCustomContext(defaultValue) {
  let store = defaultValue;
  const listeners = new Set();

  function Provider({ children }) {
    debugger;
    const [state, setState] = useState(store);

    useEffect(() => {
      debugger;
      store = state; // Sync store with state
      listeners.forEach((listener) => listener(store));
    }, [state]);

    return children;
  }

  function useCustomContext() {
    debugger;
    const [state, setState] = useState(store);

    useEffect(() => {
      debugger;
      const listener = (newState) => setState(newState);
      listeners.add(listener);

      return () => listeners.delete(listener);
    }, []);

    const updateState = (newState) => {
      store = newState; // Update global store
      listeners.forEach((listener) => listener(store)); // Notify all subscribers
    };

    return [state, updateState];
  }

  return { Provider, useCustomContext };
}

export default createCustomContext;
