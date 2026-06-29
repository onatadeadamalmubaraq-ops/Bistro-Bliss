import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* ================= TOKEN ================= */
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

/* ================= REGISTER ================= */
export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, role, adminCode } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const allowedRoles = [
      "Admin",
      "Kitchen",
      "Rider",
      "Operational Manager",
      "Sales Manager",
    ];

    const selectedRole = role || "Operational Manager";

    if (!allowedRoles.includes(selectedRole)) {
      return res.status(400).json({
        message: "Invalid role selected",
      });
    }

    // ADMIN PROTECTION
    if (selectedRole === "Admin") {
      if (!process.env.ADMIN_SECRET_CODE) {
        return res.status(500).json({
          message: "Admin secret not configured",
        });
      }

      if (adminCode !== process.env.ADMIN_SECRET_CODE) {
        return res.status(403).json({
          message: "Invalid admin code",
        });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role: selectedRole,
    });

    const token = generateToken(user);

    return res.status(201).json({
      token,
      user,
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

/* ================= LOGIN ================= */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user);

    return res.json({
      token,
      user,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

/* ================= ME ================= */
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= CHANGE PASSWORD ================= */
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    const valid = await bcrypt.compare(currentPassword, user.password);

    if (!valid) {
      return res.status(400).json({
        message: "Incorrect current password",
      });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= SETUP STATUS ================= */
export const getSetupStatus = async (req, res) => {
  try {
    const adminExists = await User.exists({ role: "Admin" });

    res.json({
      setupComplete: !!adminExists,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= CREATE STAFF (ADMIN ONLY) ================= */
export const createStaffAccount = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};