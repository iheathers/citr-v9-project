import { useContext } from "react";
import { CartContext } from "./contexts";

// import { MyContext } from "./contexts";

export default function Header() {
  const [cart] = useContext(CartContext);

  // debugger;
  // const [value] = MyContext.useCustomContext();

  return (
    <nav>
      <h1 className="logo">Padre Gino's Pizza</h1>
      <div className="nav-cart">
        {/* <h1>{value}</h1> */}
        🛒<span className="nav-cart-number">{cart.length}</span>
      </div>
    </nav>
  );
}
