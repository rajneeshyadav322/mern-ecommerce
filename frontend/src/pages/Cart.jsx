import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useSelector, useDispatch } from "react-redux";
import api from "../../axios/apiclient";
import { getMyCart } from "../redux/slices/cartSlice";
import { getMyInfo } from "../redux/slices/mySlice";

const Cart = () => {
  // const state = useContext(GlobalState);
  // const [cart] = state.userApi.cart;
  // const [user] = state.userApi.user;

  // const { cart, error, loading } = useSelector((store) => store?.cartReducer);
  const {info, error, loading} = useSelector((store) => store?.myReducer);
  const dispatch = useDispatch();


  const key = import.meta.env.VITE_STRIPE_KEY;

  useEffect(() => {
    dispatch(getMyInfo())
  },[])
  
  // useEffect(() => {
  //   dispatch(getMyCart(info));
  // }, [info]);


  if (!info?.products || info?.products?.length === 0)
    return (
      <div className="text-6xl text-center py-20 h-screen">
        Your cart is empty.
      </div>
    );

  const handleSubmit = async (e) => {
    e.preventDefault();

    cart?.products?.forEach((element) => {
      const { title, image, quantity, price } = element;
      products.push({
        name: title,
        currency: "inr",
        images: [image],
        amount: price * 100,
        quantity: quantity,
      });
    });

    try {
      const res = await api.post("/api/checkout/payment", {
        products: products,
        userId: user._id,
      });

      // console.log(res.data)
      window.location = res.data;
    } catch (err) {
      return console.log(err);
    }
  };

  return (
    <div>
      <div className="text-center text-4xl font-light mt-8">Your Cart</div>
      <div className="flex flex-wrap flex-1 gap-2 items-center justify-between m-8">
        <Link to="/products">
          <button className="px-4 py-2  border-2 cursor-pointer hover:bg-black hover:text-white border-black">
            Continue Shopping
          </button>
        </Link>
        <button className="px-4 py-2 hover:bg-black hover:text-white border-2 cursor-pointer border-black">
          Checkout
        </button>
      </div>

      <div className="flex flex-wrap mt-6 xsm:mx-3 sm:mx-8  justify-center">
        <div className="md:flex-1 sm:p-8 w-full">
          <div className="flex w-full p-4 items-center justify-between flex-col">
            {info?.products?.map((item) => (
              <CartItem item={item} key={item.productId} />
            ))}
          </div>
        </div>
        <div className="border-2 h-min lg:p-10 p-4 lg:m-4">
          <div className="text-center font-light text-4xl">Order Summary</div>
          <div className="flex mt-4 justify-between">
            <div className="font-light text-xl">Sub Total</div>
            <div className="font-light text-xl">₹ {info?.subTotal}</div>
          </div>
          <div className="flex mt-4 justify-between">
            <div className="font-light text-xl">Shipping Charge</div>
            <div className="font-light text-xl">₹ 30</div>
          </div>
          <div className="flex mt-4 justify-between">
            <div className="font-light text-xl">Shipping Discount</div>
            <div className="font-light text-xl">₹ 30</div>
          </div>
          <hr className="mt-6" />
          <div className="flex mt-4 justify-between">
            <div className="text-2xl font-normal">Total</div>
            <div className="font-normal text-2xl">₹ {info?.subTotal}</div>
          </div>

          {/* <Checkout
                    name="E-Commerce Store"
                    description={`Your total is ₹ ${total}`} // the pop-in header subtitle
                    token={myToken}
                    amount={total*100}
                    currency="INR"
                    stripeKey={key}
                    billingAddress
                    shippingAddress>

                    </Checkout> */}

          <form>
            <button
              onClick={handleSubmit}
              className="cursor-pointer hover:text-white hover:bg-black border-2 px-4 border-black w-full text-center mt-6 py-2"
            >
              Checkout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cart;
