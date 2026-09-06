import Order from "../models/Order.js";
import Product from "../models/Product.js";

/* CREATE ORDER */
export const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);

    const io = req.app.get("io");

    if (io) {
      // Update all dashboards
      io.emit("newOrder", order);

      // Notify Admin only
      io.to("admin").emit("notification", {
        type: "new-order",
        title: "New Order Received",
        message: `Order #${order._id
          .toString()
          .slice(-6)} has been placed.`,
        order,
      });

      // Notify Kitchen only
      io.to("kitchen").emit("notification", {
        type: "new-order",
        title: "New Order Received",
        message: `Prepare Order #${order._id
          .toString()
          .slice(-6)}.`,
        order,
      });
    }

    res.status(201).json(order);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

/* GET ORDERS */
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

/* UPDATE ORDER STATUS */
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: req.body.status },
      { new: true }
    );

    // Order not found
    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    const io = req.app.get("io");

    if (io) {
      // Update every dashboard
      io.emit("orderUpdated", order);

      io.emit("statusChanged", {
        orderId: order._id,
        status: order.orderStatus,
      });

      /* Kitchen marks Ready */
      if (order.orderStatus === "Ready") {
        // Admin notification
        io.to("admin").emit("notification", {
          type: "order-ready",
          title: "Order Ready",
          message: `Order #${order._id
            .toString()
            .slice(-6)} is ready for delivery.`,
          order,
        });

        // Rider notification
        io.to("rider").emit("notification", {
          type: "order-ready",
          title: "New Delivery Available",
          message: `Order #${order._id
            .toString()
            .slice(-6)} is ready for pickup.`,
          order,
        });
      }

      /* Rider marks Delivered */
      if (order.orderStatus === "Delivered") {
        io.to("admin").emit("notification", {
          type: "order-delivered",
          title: "Order Delivered",
          message: `Order #${order._id
            .toString()
            .slice(-6)} has been delivered successfully.`,
          order,
        });
      }
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};