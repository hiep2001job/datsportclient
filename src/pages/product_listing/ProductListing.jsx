import React, { useEffect, useState } from "react";
import { GrCart } from "react-icons/gr";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import productApi from "../../api/product";
import LoadingSpinner from "../../share/loading_spinner/LoadingSpinner";
import { formatVnd } from "../../utils/common";

const ProductListing = () => {
  const [dataCategory, setDataCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { success } = useSelector((state) => state.auth);
  const handleAddToCart = () => {
    alert("123");
  };
  const getDataCategoryById = async () => {
    try {
      const rs = await productApi.getProductByCategoryId(id);
      setDataCategory(rs);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getDataCategoryById();
  }, [dataCategory]);
  return (
    <div className="bg-white">
      <h2 className="sr-only">Products</h2>
      <section
        id="Projects"
        className="flex items-start justify-start flex-wrap px-10 pt-40"
      >
        {dataCategory.length !== 0 &&
          dataCategory.map((item) => {
            return (
              <div
                key={item.productId}
                className="w-[calc(100% / 4)] bg-white shadow-md rounded-xl mb-7 duration-500 mr-5 hover:scale-105 hover:shadow-xl"
              >
                <Link to={`/detail-product/${item.productId}`}>
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="h-200 w-72 object-cover rounded-t-xl"
                  />
                  <div className="px-4 py-3 w-72">
                    <p className="text-lg font-bold text-black truncate block capitalize">
                      {item.productName}
                    </p>
                  </div>
                </Link>
                <div className="flex items-center px-5">
                  <p className="text-lg font-semibold text-black cursor-auto my-3">
                    {formatVnd(item.productPrice)}
                  </p>
                  <div className="ml-auto" onClick={handleAddToCart}>
                    <GrCart size={25} />
                  </div>
                </div>
              </div>
            );
          })}
      </section>
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default ProductListing;
