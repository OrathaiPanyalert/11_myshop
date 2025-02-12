import React, { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ productName: "", price: "", stock: "" });
  const [editProduct, setEditProduct] = useState({ id: null, productName: "", price: "", stock: "" });
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/products", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setProducts(res.data))
      .catch((err) => alert("Unauthorized"));
  };

  const addProduct = () => {
    axios
      .post("http://localhost:5000/products", newProduct, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        fetchProducts();
        setNewProduct({ productName: "", price: "", stock: "" });
      })
      .catch((err) => alert("Error adding product"));
  };

  const editProductDetails = (id) => {
    const productToEdit = products.find((product) => product.ProductID === id);
    setEditProduct({
      id: productToEdit.ProductID,
      productName: productToEdit.ProductName,
      price: productToEdit.Price,
      stock: productToEdit.Stock,
    });
  };

  const updateProduct = () => {
    axios
      .put(
        `http://localhost:5000/products/${editProduct.id}`,
        {
          productName: editProduct.productName,
          price: editProduct.price,
          stock: editProduct.stock,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        fetchProducts();
        setEditProduct({ id: null, productName: "", price: "", stock: "" });
      })
      .catch((err) => alert("Error updating product"));
  };

  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:5000/products/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => fetchProducts())
      .catch((err) => alert("Error deleting product"));
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#F5E6DA", minHeight: "100vh", color: "#333" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Products</h2>

      {/* New Product Form */}
      <div style={{ marginBottom: "16px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.productName}
          onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <input
          type="number"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <button onClick={addProduct} style={{ padding: "8px 12px", backgroundColor: "#D8B6A4", color: "white", border: "none", borderRadius: "4px" }}>
          Add
        </button>
      </div>

      {/* Edit Product Form */}
      {editProduct.id && (
        <div style={{ marginBottom: "16px", display: "flex", gap: "10px" }}>
          <input
            type="text"
            placeholder="Product Name"
            value={editProduct.productName}
            onChange={(e) => setEditProduct({ ...editProduct, productName: e.target.value })}
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <input
            type="number"
            placeholder="Price"
            value={editProduct.price}
            onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <input
            type="number"
            placeholder="Stock"
            value={editProduct.stock}
            onChange={(e) => setEditProduct({ ...editProduct, stock: e.target.value })}
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <button onClick={updateProduct} style={{ padding: "8px 12px", backgroundColor: "#A4D8A4", color: "white", border: "none", borderRadius: "4px" }}>
            Update
          </button>
        </div>
      )}

      {/* Product List */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
        {products.map((p) => (
          <div key={p.ProductID} style={{ backgroundColor: "white", padding: "16px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", borderRadius: "8px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>{p.ProductName}</h3>
            <p style={{ color: "#666" }}>${p.Price}</p>
            <p style={{ color: "#666" }}>Stock: {p.Stock}</p>
            <button onClick={() => editProductDetails(p.ProductID)} style={{ marginTop: "8px", padding: "6px 10px", backgroundColor: "#D8B6A4", color: "white", border: "none", borderRadius: "4px", marginRight: "8px" }}>
            <button onClick={() => deleteProduct(p.ProductID)} style={{ marginTop: "8px", padding: "6px 10px", backgroundColor: "red", color: "white", border: "none", borderRadius: "4px" }}>
              Delete
            </button>
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
