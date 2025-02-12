import React, { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({ orderDate: "", customerID: "", products: [{ productID: "", quantity: "" }] });
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/orders", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setOrders(res.data))
      .catch((err) => alert("Unauthorized"));
  }, [token]);

  // Handle order deletion
  const handleDelete = (orderId) => {
    axios
      .delete(`http://localhost:5000/orders/${orderId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        setOrders(orders.filter(o => o.OrderID !== orderId));
      })
      .catch(() => alert("Error deleting order"));
  };

  // Handle new order form changes
  const handleNewOrderChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  // Handle changes for product details
  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = [...newOrder.products];
    updatedProducts[index][name] = value;
    setNewOrder({ ...newOrder, products: updatedProducts });
  };

  // Add new product input fields
  const handleAddProduct = () => {
    setNewOrder({ ...newOrder, products: [...newOrder.products, { productID: "", quantity: "" }] });
  };

  // Handle adding a new order
  const handleAddOrder = () => {
    axios
      .post("http://localhost:5000/orders", newOrder, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setOrders([...orders, res.data]);
        setNewOrder({ orderDate: "", customerID: "", products: [{ productID: "", quantity: "" }] }); // Reset form
      })
      .catch(() => alert("Error adding order"));
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#F5E6DA", minHeight: "100vh", color: "#333" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Orders</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
        {orders.map((o) => (
          <div key={o.OrderID} style={{ backgroundColor: "white", padding: "16px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", borderRadius: "8px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>Order #{o.OrderID}</h3>
            <p style={{ margin: "4px 0", color: "#666" }}><strong>Date:</strong> {o.OrderDate}</p>
            <p style={{ margin: "4px 0", color: "#666" }}><strong>Customer:</strong> {o.FullName}</p>

            <p style={{ margin: "4px 0", color: "#666" }}><strong>Product:</strong> {o.ProductName} x{o.Quantity}</p>


            <div style={{ marginTop: "8px" }}>
              <button onClick={() => handleDelete(o.OrderID)} style={{ marginTop: "8px", padding: "6px 10px", backgroundColor: "red", color: "white", border: "none", borderRadius: "4px" }}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Form for adding a new order */}
      <div style={{ marginTop: "40px", backgroundColor: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
        <h3>Add New Order</h3>
        <input
          type="date"
          name="orderDate"
          value={newOrder.orderDate}
          onChange={handleNewOrderChange}
          style={{ margin: "8px 0", padding: "8px", width: "100%" }}
        />
        <input
          type="text"
          name="customerID"
          value={newOrder.customerID}
          onChange={handleNewOrderChange}
          placeholder="Customer ID"
          style={{ margin: "8px 0", padding: "8px", width: "100%" }}
        />

        {/* Product fields */}
        <h4>Products</h4>
        {newOrder.products.map((product, index) => (
          <div key={index} style={{ marginBottom: "8px" }}>
            <input
              type="text"
              name="productID"
              value={product.productID}
              onChange={(e) => handleProductChange(index, e)}
              placeholder="Product ID"
              style={{ margin: "4px 0", padding: "8px", width: "48%", marginRight: "4%" }}
            />
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={(e) => handleProductChange(index, e)}
              placeholder="Quantity"
              style={{ margin: "4px 0", padding: "8px", width: "48%" }}
            />
          </div>
        ))}
        
        <button onClick={handleAddProduct} style={{ marginTop: "8px", padding: "8px 16px", backgroundColor: "#D8B6A4", color: "white", border: "none", borderRadius: "4px", marginRight: "8px" }}>
          Add Product
        </button>

        <button onClick={handleAddOrder} style={{ marginTop: "8px", padding: "8px 16px", backgroundColor: "#527853", color: "white", border: "none", borderRadius: "4px", marginRight: "8px" }}>
          Add Order
        </button>
      </div>
    </div>
  );
}

export default Orders;
