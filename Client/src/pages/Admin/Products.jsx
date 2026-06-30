import React, { useEffect, useState } from "react";
import api from "../../services/axios";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [preview, setPreview] = useState(null);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "Local",
    subCategory: "Proteins & Grills",
    image: null,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setForm((prev) => ({
      ...prev,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setForm({
      name: "",
      price: "",
      category: "Local",
      subCategory: "Proteins & Grills",
      image: null,
    });

    setPreview(null);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("name", form.name);
      data.append("price", form.price);
      data.append("category", form.category);
      data.append("subCategory", form.subCategory);

      if (form.image) {
        data.append("image", form.image);
      }

      if (editingId) {
        await api.put(`/products/${editingId}`, data);
      } else {
        await api.post("/products", data);
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);

    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      subCategory: product.subCategory,
      image: null,
    });

    setPreview(`${import.meta.env.VITE_API_URL}${product.image}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* FORM */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-5">
          {editingId ? "Edit Product" : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Food Name"
            className="w-full border rounded-xl p-3"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            required
          />

          <input
            type="number"
            placeholder="Price"
            className="w-full border rounded-xl p-3"
            value={form.price}
            onChange={(e) =>
              setForm({
                ...form,
                price: e.target.value,
              })
            }
            required
          />

          <select
            className="w-full border rounded-xl p-3"
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
          >
            <option value="Local">Local</option>
            <option value="Continental">Continental</option>
          </select>

          <select
            className="w-full border rounded-xl p-3"
            value={form.subCategory}
            onChange={(e) =>
              setForm({
                ...form,
                subCategory: e.target.value,
              })
            }
          >
            <option value="Proteins & Grills">
              Proteins & Grills
            </option>

            <option value="Rice & Pasta">
              Rice & Pasta
            </option>

            <option value="Pizza & Wraps">
              Pizza & Wraps
            </option>

            <option value="Beverages">
              Beverages
            </option>

            <option value="Salads & Fries">
              Salads & Fries
            </option>

            <option value="Soup & Sauce">
              Soup & Sauce
            </option>
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-52 object-cover rounded-xl border"
            />
          )}

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl"
          >
            {editingId ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>

      {/* PRODUCTS */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-5">
          Products ({products.length})
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-2xl overflow-hidden"
            >
              <img
                src={`${import.meta.env.VITE_API_URL}${product.image}`}
                alt={product.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h3 className="font-bold text-lg">
                  {product.name}
                </h3>

                <p className="text-orange-500 font-semibold">
                  ₦{product.price}
                </p>

                <p className="text-sm text-gray-500">
                  {product.category}
                </p>

                <p className="text-sm text-gray-500">
                  {product.subCategory}
                </p>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg"
                  >
                    <FaEdit className="mx-auto" />
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(product._id)
                    }
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg"
                  >
                    <FaTrash className="mx-auto" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            No products found
          </p>
        )}
      </div>
    </div>
  );
}