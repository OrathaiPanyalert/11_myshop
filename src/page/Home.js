import React from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen p-6" 
         style={{ backgroundColor: "#F5E6DA", minHeight: "100vh", color: "#333", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="shadow-lg rounded-3xl p-8 w-50 max-w-4xl text-center"
           style={{ backgroundColor: "#F8EDE3", borderRadius: "20px", padding: "40px" }}>
        <h1 className="mb-4" style={{ fontWeight: "bold", fontSize: "50px", color: "#CBA35C" }}>Welcome to MyShop</h1>
        <p className="text-lg mb-6" style={{ fontWeight: "bold", fontSize: "20px", color: "#3B3030" }}>
          Your one-stop shop for amazing products!
        </p>
        
        <div className="text-black shadow transition p-5 w-full" 
             style={{ backgroundColor: "rgba(255, 248, 244, 0.7)", backdropFilter: "blur(10px)", borderRadius: "20px", padding: "30px" }}>
          {/* ปุ่มกลุ่มแรก พร้อมเว้นบรรทัด */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-4">
            <Button 
              onClick={() => navigate('/products')} 
              className="w-100 py-4 mb-4 md:mb-0"
              variant="outline-info"
              style={{ fontWeight: "bold", fontSize: "1.50rem", borderRadius: "12px" }}
            >
              View Products
            </Button>
            <Button 
              onClick={() => navigate('/orders')} 
              className="w-100 py-4"
              variant="outline-secondary"
              style={{ fontWeight: "bold", fontSize: "1.50rem", borderRadius: "12px" }}
            >
              My Orders
            </Button>
          </div>

          {/* ปุ่ม Login และ Register */}
          <div className="grid grid-cols-1 gap-4 mt-4">
            <Button 
              onClick={() => navigate('/login')} 
              className="w-100 py-4 mb-4 md:mb-0"
              variant="outline-success"
              style={{ fontWeight: "bold", fontSize: "1.50rem", borderRadius: "12px" }}
            >
              Login
            </Button>
            <Button 
              onClick={() => navigate('/register')} 
              className="w-100 py-4"
              variant="outline-warning"
              style={{ fontWeight: "bold", fontSize: "1.50rem", borderRadius: "12px" }}
            >
              Register 
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
