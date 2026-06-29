import Order from "../models/Order.js";

export const getAnalytics = async (req, res) => {
  const orders = await Order.find();

  const totalRevenue = orders.reduce(
    (sum, o) => sum + o.total,
    0
  );

  const totalOrders = orders.length;

  const avgOrderValue =
    totalRevenue / (totalOrders || 1);

  res.json({
    totalRevenue,
    totalOrders,
    avgOrderValue,
  });
};