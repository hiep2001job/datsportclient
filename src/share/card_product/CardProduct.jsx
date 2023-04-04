import React from "react";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  addToCart,
  updateCartItemQuantity,
  deleteCartItem,
} from "../../redux/cartSlice";

const CardProduct = ({
  productId,
  productImage,
  productPrice,
  productName,
  productDescription,
}) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        "productId":productId,
        "price":productPrice,
        "accountId":4,
        "quantity":1
      })      
    );
    console.log(cartItems);
  };

  return (
    <div className="card">
      <img src={productImage} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{productName}</h5>
        <p className="card-text">
          {" "}
          {productDescription.toString().length < 110
            ? productDescription
            : productDescription.substr(0, 109)}
        </p>
        <button
          onClick={handleAddToCart}
          className="btn btn-success text-center stretched-link"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default CardProduct;
