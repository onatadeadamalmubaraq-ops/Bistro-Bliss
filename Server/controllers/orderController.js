import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);

    const io = req.app.get("io");

    if (io) {
      io.emit("newOrder", order);
    }

    res.status(201).json(order);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

export const getOrders = async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: req.body.status },
      { new: true }
    );

    const io = req.app.get("io");

    /* broadcast to all panels */
    io.emit("orderUpdated", order);

    /* notify kitchen + rider panels */
    io.emit("statusChanged", {
      orderId: order._id,
      status: order.orderStatus,
    });

    res.json(order);
  } catch (err) {
    res.status(500).json(err);
  }
};

