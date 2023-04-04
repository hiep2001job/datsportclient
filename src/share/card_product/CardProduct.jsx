import React from "react";

import { Link } from "react-router-dom";
import { Card, CardBody, Col } from "reactstrap";

const CardProduct = ({
  productId,
  productImage,
  productPrice,
  productName,
  productDescription,
}) => {
  return (
    <Col>
      <Card>
        <Link to={`detail-product/${productId}`}>
          <img src={productImage} className="card-img-top" alt="..." />
        </Link>
        <CardBody>
          <Link to={`detail-product/${productId}`}>
            <h5 className="card-title">{productName}</h5>
          </Link>
          <p className="card-text">
            {productDescription.toString().length < 110
              ? productDescription
              : productDescription.substr(0, 109)}
          </p>
          <Link to="#" className="btn btn-primary ">
            Add to cart
          </Link>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CardProduct;
