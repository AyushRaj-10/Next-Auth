'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  FaUser,
  FaEnvelope,
  FaSignOutAlt,
} from "react-icons/fa";
import Nav from '../components/Nav';

const Page = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      router.push("/");
    } else {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
        router.push("/");
      }
    }
  }, [router]);

  // ✅ Logout handler
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  if (!user) return null;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 to-teal-600 flex flex-col">
      <Nav />
      <div className="flex flex-1 justify-center items-center">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-[28rem]">
          <div className="text-center mb-6">
            <div className="flex justify-center">
              <FaUser size={70} className="text-emerald-500 mb-3" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">User Profile</h2>
          </div>

          <div className="border-t border-gray-200 my-4"></div>

          <div className="space-y-4 text-gray-700">
            <p className="flex items-center">
              <FaUser className="text-emerald-500 mr-2" />
              <span className="font-semibold">Name:</span>
              <span className="ml-2">{user.name}</span>
            </p>
            <p className="flex items-center">
              <FaEnvelope className="text-teal-500 mr-2" />
              <span className="font-semibold">Email:</span>
              <span className="ml-2">{user.email}</span>
            </p>
          </div>

          <button
            className="mt-6 w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-xl shadow-md transition duration-200"
            onClick={logoutHandler}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page;
