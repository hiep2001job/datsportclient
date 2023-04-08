import React from "react";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  addToCart,
  updateCartItemQuantity,
  deleteCartItem,
} from "../../redux/cartSlice";
import DefaultImg from "../../assets/images/default.png";
import { useNavigate } from "react-router-dom";

const CardProduct = ({
  productId,
  productImage1,
  productPrice,
  productName,
  productDescription,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const userDetail = useSelector((state) => state.auth.data);

  // const handleAddToCart = () => {
  //   if (!userDetail) navigate("/login");
  //   dispatch(
  //     addToCart({
  //       productId: productId,
  //       price: productPrice,
  //       productSize:"M",
  //       accountId: userDetail.id,
  //       quantity: 1,
  //     })
  //   );
   
  // };
  const handleViewDetail = (id) => {
    navigate(`/detail-product/${id}`);
  };

  return (
    <div className="card">
      <div class="card-img-wrapper">
        <img
          src={productImage1 ?? DefaultImg}
          className="card-img-top"
          alt="..."
        />
      </div>

      <div className="card-body">
        <h5 className="card-title">{productName}</h5>
        <p className="card-text">
          {" "}
          {productDescription.toString().length < 110
            ? productDescription
            : productDescription.substr(0, 109)}
        </p>
        <button
          onClick={()=>handleViewDetail(productId)}
          className="btn btn-success text-center stretched-link"
        >
          View more
        </button>
      </div>
    </div>
  );
};

export default CardProduct;
