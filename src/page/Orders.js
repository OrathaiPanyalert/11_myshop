import React, { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/orders", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setOrders(res.data))
      .catch((err) => alert("Unauthorized"));
  }, []);

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
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
