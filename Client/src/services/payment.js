import api from "./axios";

export const createOrder = async (orderData) => {
  const res = await api.post("/orders", orderData);
  return res.data;
};

export const verifyPayment = async (id) => {
  const res = await api.get(
    `/payments/verify/${id}`
  );
  return res.data;
};