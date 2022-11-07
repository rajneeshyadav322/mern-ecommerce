import React, { useEffect } from "react";
import Loading from "./Loading";
import ProductItem from "./ProductItem";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../redux/slices/productsSlice";

const Products = ({ category, filter, sort }) => {
  const dispatch = useDispatch();
  const { error, products, loading } = useSelector(
    (state) => state?.productsReducer
  );

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div>
      <div className="text-4xl mt-4 text-center font-extralight">Products</div>
      {loading && <Loading />}
      <div className="flex  flex-1 flex-wrap  mx-4 mt-6 justify-center xl:justify-between">
        {products?.map((item) => (
          <ProductItem item={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default Products;
