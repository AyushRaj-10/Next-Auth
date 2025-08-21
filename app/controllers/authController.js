// controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User  from "../models/user";
import { NextResponse } from "next/server";

export const register = async (body) => {
  const { name, email, password } = body;

  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        message: "User already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    // create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return NextResponse.json({ token, user }, { status: 201 });
  } catch (error) {
    console.error("❌ Register error:", error);
    return NextResponse.json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const login = async (body) => {
  const { email, password } = body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
      });
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return NextResponse.json({
        message: "Invalid credentials",
        success: false,
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "!@#", {
      expiresIn: "1d",
    });

    return NextResponse.json({
      message: `Welcome back ${user.name}`,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
      success: true,
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    return NextResponse.json({
      message: "Server error",
      error: error.message,
    });
  }
};
