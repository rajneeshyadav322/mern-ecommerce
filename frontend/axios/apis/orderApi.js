import api from "../apiclient";

export const createOrder = async (products, id) => {
  try {
    const res = await api.post("/api/checkout/payment", {
      products: products,
      user_id: id,
    });
    // console.log(res.data)
    window.location = res.data;
  } catch (err) {
    return console.log(err);
  }
};
