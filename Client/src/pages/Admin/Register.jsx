import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showAdminCode, setShowAdminCode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [setupComplete, setSetupComplete] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
    adminCode: "",
  });

  useEffect(() => {
    const checkSetup = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/setup-status`
        );

        setSetupComplete(res.data.setupComplete);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    checkSetup();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Staff registered successfully!");

      setFormData({
        fullName: "",
        email: "",
        password: "",
        role: "",
        adminCode: "",
      });

      navigate("/admin/dashboard");
    } catch (err) {
      alert(
        err.response?.data?.message || "Registration failed"
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6">
          Staff Registration
        </h1>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full border p-3 mb-4"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-3 mb-4"
          required
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 pr-12"
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border p-3 mb-4"
          required
        >
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Kitchen">Kitchen</option>
          <option value="Rider">Rider</option>
          <option value="Operational Manager">
            Operational Manager
          </option>
          <option value="Sales Manager">
            Sales Manager
          </option>
        </select>

        <div className="relative mb-6">
          <input
            type={showAdminCode ? "text" : "password"}
            name="adminCode"
            placeholder="Admin Access Code"
            value={formData.adminCode}
            onChange={handleChange}
            className="w-full border p-3 pr-12"
            required
          />

          <button
            type="button"
            onClick={() => setShowAdminCode(!showAdminCode)}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            {showAdminCode ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded-lg"
        >
          Register Staff
        </button>
      </form>
    </div>
  );
}