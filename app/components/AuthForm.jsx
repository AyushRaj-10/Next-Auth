"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

const AuthForm = () => {
  const router = useRouter()
  const [LoggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Redirect if token exists
  useEffect(() => {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")
    if (token && user) {
      router.push("/profile")
    }
  }, [router])

  // ✅ Moved outside useEffect
  const formHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const url = "/api/auth"
    const action = LoggedIn ? "login" : "signup"

    try {
      const response = await axios.post(
        url,
        { name, email, password, action },
        { headers: { "Content-Type": "application/json" } }
      )

      console.log("API Response:", response.data) // 👈 Debugging

      const { token, user } = response.data

      if (token && user) {
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        router.push("/profile")
      } else {
        setError("No token received. Check API response.")
      }
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed")
    } finally {
      setLoading(false)
    }
  }
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700 p-6">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {LoggedIn ? "Login to your account" : "Create an account"}
        </h1>

        <form onSubmit={formHandler} className="space-y-4">
          {!LoggedIn && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
            } text-white font-semibold py-2 rounded-lg shadow-md transition`}
          >
            {loading ? "Please wait..." : LoggedIn ? "Login" : "Sign Up"}
          </button>
        </form>

        {error && <p className="text-red-600 text-sm mt-4 text-center">{error}</p>}

        <p className="text-center text-gray-600 mt-6">
          {LoggedIn ? (
            <>
              Don’t have an account?{" "}
              <button
                type="button"
                className="text-indigo-600 font-medium hover:underline"
                onClick={() => setLoggedIn(false)}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                className="text-indigo-600 font-medium hover:underline"
                onClick={() => setLoggedIn(true)}
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  )
}

export default AuthForm
