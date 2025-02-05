import { createLazyFileRoute } from "@tanstack/react-router";

import { useContext, useEffect, useState } from "react";
import Pizza from "../Pizza";

import Cart from "../Cart";
import { CartContext } from "../contexts";

const intl = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
});

let counter = 0;

export const Route = createLazyFileRoute("/order")({
  component: Order,
});

function Order() {
  console.log("Order component was rerendered", counter++);

  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [pizzaSize, setPizzaSize] = useState("M");
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [cart, setCart] = useContext(CartContext);

  const [loading, setLoading] = useState(true);

  async function fetchPizzaTypes() {
    await new Promise((resolve) => setTimeout(resolve, 3000)); // remove this later, just to show you the loading state

    const pizzasRes = await fetch("/api/pizzas");
    const pizzasJson = await pizzasRes.json();

    setPizzaTypes(pizzasJson);
    setLoading(false);
  }

  useEffect(() => {
    fetchPizzaTypes();
  }, []);
  let price, selectedPizza;

  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);

    price = intl.format(selectedPizza.sizes[pizzaSize]);
  }

  async function checkout() {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 5000));

    await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        cart,
      }),
    });

    setCart([]);
    setLoading(false);
  }

  return (
    <div className="order">
      <h2>Create Order</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          console.log(event);

          setCart([...cart, { pizza: selectedPizza, size: pizzaSize, price }]);
        }}
      >
        <div>
          <div>
            <label htmlFor="pizza-type">Pizza Type</label>
            <select
              name="pizza-type"
              value={pizzaType}
              onChange={(event) => {
                setPizzaType(event.target.value);
              }}
            >
              {pizzaTypes.map((pizza) => (
                <option value={pizza.id} key={pizza.id}>
                  {pizza.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pizza-size">Pizza Size</label>
            <div>
              <span>
                <input
                  checked={pizzaSize === "S"}
                  type="radio"
                  name="pizza-size"
                  value="S"
                  id="pizza-s"
                  onChange={(event) => setPizzaSize(event.target.value)}
                />
                <label htmlFor="pizza-s">Small</label>
              </span>
              <span>
                <input
                  checked={pizzaSize === "M"}
                  type="radio"
                  name="pizza-size"
                  value="M"
                  id="pizza-m"
                  onChange={(event) => setPizzaSize(event.target.value)}
                />
                <label htmlFor="pizza-m">Medium</label>
              </span>
              <span>
                <input
                  checked={pizzaSize === "L"}
                  type="radio"
                  name="pizza-size"
                  value="L"
                  id="pizza-l"
                  onChange={(event) => setPizzaSize(event.target.value)}
                />
                <label htmlFor="pizza-l">Large</label>
              </span>
            </div>
          </div>
          <button type="submit">Add to Cart</button>
        </div>
        <div className="order-pizza">
          {loading ? (
            <p> Loading </p>
          ) : (
            <div className="order-pizza">
              <Pizza
                name={selectedPizza.name}
                description={selectedPizza.description}
                image={selectedPizza.image}
              />
              <p>{price}</p>
            </div>
          )}
        </div>
      </form>

      {loading ? <h2>LOADING …</h2> : <Cart checkout={checkout} cart={cart} />}
    </div>
  );
}
