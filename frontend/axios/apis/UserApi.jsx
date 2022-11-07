import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import api from "../apiclient";

const UserApi = (token) => {
  const [user, setUser] = useState({});
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await api.get("/api/auth/info", {
            headers: { Authorization: token },
          });

          setUser(res.data);
          setIsLogged(true);

          res.data.isAdmin ? setIsAdmin(true) : setIsAdmin(false);

          setCart(res.data.cart);
        } catch (err) {
          alert(err.response.data.msg);
        }
      };

      getUser();
    }
  }, [token]);

  const addCart = async (product, quantity = 1) => {
    if (!isLogged)
      return alert("Please login or register to continue shopping");

    const check = cart.every((item) => item._id !== product._id);

    if (check) {
      setCart([...cart, { ...product, quantity: quantity }]);

      await api.patch(
        "/api/auth/addcart",
        { cart: [...cart, { ...product, quantity: quantity }] },
        {
          headers: { Authorization: token },
        }
      );
    } else {
    }

    alert("This product has been added to the cart");
  };

  const emptyCart = async () => {
    try {
      await api.put(
        "/api/auth/empty",
        {
          cart: [],
        },
        {
          headers: { Authorization: token },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return {
    user: [user, setUser],
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addCart: addCart,
    emptyCart: emptyCart,
  };
};

export default UserApi;
