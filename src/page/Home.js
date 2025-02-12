import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5E6DA] text-gray-800 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg text-center height-100%">
        <h1 className="text-4xl font-bold text-[#D8B6A4] mb-4">Welcome to MyShop</h1>
        <p className="text-lg mb-6 text-gray-600">Your one-stop shop for amazing products!</p>
        <nav className="flex justify-center gap-4">
          <Link to="/products" className="px-4 py-2 bg-[#D8B6A4] text-black rounded-lg shadow hover:bg-[#B89486] transition">
            View Products
          </Link>
          <Link to="/orders" className="px-4 py-2 bg-[#A4D8A4] text-black rounded-lg shadow hover:bg-[#86B894] transition">
            My Orders
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Home;
