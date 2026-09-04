import axios from "axios";
import Order from "../models/Order.js";
export const verifyPayment = async (req, res) => {
  try {
    const { transactionId, tx_ref } = req.body;

    if (!transactionId || !tx_ref) {
      return res.status(400).json({
        success: false,
        message: "Transaction ID and tx_ref are required.",
      });
    }

    const response = await axios.get(
      `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        },
      }
    );

    const payment = response.data;

    if (
      payment.status === "success" &&
      payment.data.status === "successful" &&
      payment.data.tx_ref === tx_ref
    ) {
      return res.status(200).json({
        success: true,
        message: "Payment verified successfully.",
      });
    }

    return res.status(400).json({
      success: false,
      message: "Payment verification failed.",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Verification failed.",
      error: err.message,
    });
  }
};