import { StrictMode } from "react";
import { scan } from "react-scan"; // import this BEFORE react
import { createRoot } from "react-dom/client";

import Order from "./Order";
import PizzaOfTheDay from "./PizzaOfTheDay";

if (typeof window !== "undefined") {
  scan({
    enabled: true,
    log: true, // logs render info to console (default: false)
  });
}

const App = () => {
  return (
    // <StrictMode>
    <div>
      <h1>Welcome to Padre Gino's Pizza</h1>
      <Order />
      <PizzaOfTheDay />
    </div>
    // </StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
