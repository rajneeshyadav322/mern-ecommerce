import React, { useEffect } from "react";
import { useMemo } from "react";
import moment from "moment";

const OrderItem = ({ product }) => {
  return (
    <div className="flex gap-2 my-4">
      <img className="w-16 h-16" src={product?.images[0]} />
      <div className="flex flex-col w-full">
        <p>{product?.name}</p>
        <div className="w-full flex justify-between">
          <p className="font-light"> ₹ {product?.amount/100}</p>
          <p>
            <span className="font-semibold">Qty: </span> {product?.quantity}
          </p>
        </div>
      </div>
    </div>
  );
};

const Order = ({ item }) => {
  const date = useMemo(() => moment(item?.createdAt).format("LL"), [item]);

  return (
    <div className="shadow-2xl rounded-lg p-4 h-fit">
      <p>
        <span className="font-semibold">Order </span> &nbsp; #{item?._id}
      </p>
      <p className="font-light">{moment(item?.createdAt).format("LL")}</p>

      {item?.products?.map((product) => (
        <OrderItem key={product?._id} product={product} />
      ))}
      <div className="flex justify-between">
        <p className="text-xl font-light">  
          <span className="font-normal">Total: </span>₹ {item?.total}
        </p>
        <button className={`${item?.status === 'succeeded' ? 'bg-green-500':  'bg-red-500'} text-white py-1 w-24 rounded-md`}>
          {item?.status}
        </button>
      </div>
    </div>
  );
};

export default Order;
