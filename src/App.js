import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Products from "./page/Products";
import Login from "./page/Login";
import Register from "./page/Register";
import Orders from "./page/Orders";
import Navbar from "./components/Navbar";
import { AuthContext } from "./AuthContext";

function App() {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="App">
            <Navbar /> {/* ใช้ Navbar component */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    );
}

export default App;