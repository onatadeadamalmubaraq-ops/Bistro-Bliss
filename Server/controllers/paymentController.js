import axios from "axios";
import Order from "../models/Order.js";

export const verifyPayment = async (req, res) => {
  try {
    const { transactionId } = req.params;

    const response = await axios.get(
      `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        },
      }
    );

    const data = response.data;

    if (
      data.status !== "success" ||
      data.data.status !== "successful"
    ) {
      return res.status(400).json({
        message: "Payment not successful",
      });
    }

    const order = await Order.findOneAndUpdate(
      { tx_ref: data.data.tx_ref },
      {
        paymentStatus: "Paid",
        transactionId,
      },
      { new: true }
    );

    return res.json({
      message: "Payment verified",
      order,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Verification failed",
      error: err.message,
    });
  }
};