import { StrictMode, useState } from "react";
import { scan } from "react-scan"; // import this BEFORE react
import { createRoot } from "react-dom/client";

import Order from "./Order";
import Header from "./Header";
import PizzaOfTheDay from "./PizzaOfTheDay";

// import { CartContext } from "./contexts";

import { MyContext } from "./contexts";

if (typeof window !== "undefined") {
  scan({
    enabled: true,
    log: true, // logs render info to console (default: false)
  });
}

const App = () => {
  // const cartHook = useState([]);

  debugger;

  const [contextValue, setContextValue] = useState([]);

  return (
    <MyContext.Provider value={contextValue}>
      <div>
        <Header />
        <Order />
        <PizzaOfTheDay />
      </div>
    </MyContext.Provider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
