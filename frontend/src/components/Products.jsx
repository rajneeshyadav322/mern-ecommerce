import React, { useEffect } from "react";
import Loading from "./Loading";
import ProductItem from "./ProductItem";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../redux/slices/productsSlice";
import { getMyInfo } from "../redux/slices/mySlice";

const Products = () => {
  const dispatch = useDispatch();
  const { error, products, loading } = useSelector(
    (state) => state?.productsReducer
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) dispatch(getMyInfo());
  }, []);

  if(products?.length == 0) {
    return <div style={{
      minHeight:"50vh"
    }} className="text-center my-6 text-3xl">No Products Found</div> 
  }

  return (
    <div>
      <div className="text-4xl mt-4 text-center font-extralight">Products</div>
      {loading && <Loading />}
      <div className="flex  flex-1 flex-wrap  m-6 justify-center">
        {products?.map((item) => (
          <ProductItem item={item} key={item?._id} />
        ))}
      </div>
    </div>
  );
};

export default Products;
