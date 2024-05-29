/**
 * Exercise 01: The Retro Movie Store
 * Implement a shopping cart with the next features for the Movie Store that is selling retro dvds:
 * 1. Add a movie to the cart
 * 2. Increment or decrement the quantity of movie copies. If quantity is equal to 0, the movie must be removed from the cart
 * 3. Calculate and show the total cost of your cart. Ex: Total: $150
 * 4. Apply discount rules. You have an array of offers with discounts depending of the combination of movie you have in your cart.
 * You have to apply all discounts in the rules array (discountRules).
 * Ex: If m: [1, 2, 3], it means the discount will be applied to the total when the cart has all that products in only.
 *
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import Nav from "../../Nav/Nav";
import "./assets/styles.css";
import { useState } from "react";

export default function Exercise01() {
  const movies = [
    {
      id: 1,
      name: "Star Wars",
      price: 20,
    },
    {
      id: 2,
      name: "Minions",
      price: 25,
    },
    {
      id: 3,
      name: "Fast and Furious",
      price: 10,
    },
    {
      id: 4,
      name: "The Lord of the Rings",
      price: 5,
    },
  ];

  const discountRules = [
    {
      m: [3, 2],
      discount: 0.25,
    },
    {
      m: [2, 4, 1],
      discount: 0.5,
    },
    {
      m: [4, 2],
      discount: 0.1,
    },
  ];

  const [cart, setCart] = useState([]);

  const getTotal = () => {
    let total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Apply discounts based on discountRules
    discountRules.forEach((rule) => {
      if (rule.m.every((movieId) => cart.some((item) => item.id === movieId))) {
        total *= 1 - rule.discount;
      }
    });

    return total.toFixed(2); // Convert to fixed decimal for display
  };

  const handleAddToCart = (movie) => {
    const existingItem = cart.find((item) => item.id === movie.id);
    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === movie.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      const newCartItem = { ...movie, quantity: 1 };
      setCart([...cart, newCartItem]);
    }
  };

  const handleDecrementQuantity = (item) => {
    if (item.quantity > 1) {
      const updatedCart = cart.map((x) =>
        x.id === item.id ? { ...x, quantity: x.quantity - 1 } : x
      );
      setCart(updatedCart);
    } else {
      const updatedCart = cart.filter((x) => x.id !== item.id);
      setCart(updatedCart);
    }
  };

  const handleIncrementQuantity = (item) => {
    const updatedCart = cart.map((x) =>
      x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x
    );
    setCart(updatedCart);
  };

  return (
    <div className="container_gral">
      <Nav />
      <section className="exercise01">
        <div className="movies__list">
          <ul className="movies_list-grid">
            {movies.map((o) => (
              <li className="movies__list-card" key={o.id}>
                <ul>
                  <li>ID: {o.id}</li>
                  <li>Name: {o.name}</li>
                  <li>Price: ${o.price}</li>
                </ul>
                <button onClick={() => handleAddToCart(o)}>Add to cart</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="movies__cart">
          <ul>
            {cart.map((x) => (
              <li className="movies__cart-card" key={x.id}>
                <ul>
                  <li>ID: {x.id}</li>
                  <li>Name: {x.name}</li>
                  <li>Price: ${x.price}</li>
                  <li>Quantity: {x.quantity}</li>
                </ul>
                <div className="movies__cart-card-quantity">
                  <button onClick={() => handleDecrementQuantity(x)}>-</button>
                  <span>{x.quantity}</span>
                  <button onClick={() => handleIncrementQuantity(x)}>+</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="movies__cart-total">
            <p>Total: ${getTotal()}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
