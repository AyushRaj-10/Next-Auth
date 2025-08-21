'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const Nav = () => {
  const router = useRouter();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo / App Name */}
          <div 
            className="text-2xl font-bold text-emerald-600 cursor-pointer"
            onClick={() => router.push("/")}
          >
            Next-Auth
          </div>

          {/* Nav Links */}
          <div className="flex space-x-6 items-center">
            <button 
              className="text-gray-700 hover:text-emerald-600 font-medium transition"
              onClick={() => router.push("/")}
            >
              Home
            </button>
            <button 
              className="text-gray-700 hover:text-emerald-600 font-medium transition flex items-center gap-1"
              onClick={() => router.push("/profile")}
            >
              <FaUserCircle /> Profile
            </button>
            <button 
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-md transition"
              onClick={logoutHandler}
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
