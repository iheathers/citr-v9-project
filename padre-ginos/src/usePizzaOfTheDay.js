import { useEffect, useState, useDebugValue } from "react";

const usePizzaOfTheDay = () => {
  const [pizzaOfTheDay, setPizzaOfTheDay] = useState(null);
  useDebugValue(pizzaOfTheDay ? `${pizzaOfTheDay.name}` : "Loading...");

  useEffect(() => {
    async function fetchPizzaOfTheDay() {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      const pizzaOfTheDayRes = await fetch("api/pizza-of-the-day");

      const pizzaOfTheDayJson = await pizzaOfTheDayRes.json();

      setPizzaOfTheDay(pizzaOfTheDayJson);
    }

    fetchPizzaOfTheDay();
  }, []);

  return pizzaOfTheDay;
};

export default usePizzaOfTheDay;
