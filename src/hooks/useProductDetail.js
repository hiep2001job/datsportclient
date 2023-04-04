import {
  useEffect,
  useState,
} from 'react';

import productApi from '../api/product';

export default function useProductDetail(productId) {
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState({});
  const [brand, setBrand] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const productResult = await productApi.getProductByProductId(productId);
        setProduct(productResult);
        // const productCategory = await categoryApi.getbycategoryid;
        // setProduct(result); 
      } catch (error) {
        console.log("Failed to fetch product", error);
      }
      setLoading(false);
    })();
  }, [productId]);

  return { product,brand ,category, loading };
}
