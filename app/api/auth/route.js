import { NextResponse } from "next/server";
import { dbConnection } from "@/app/utils/dbConnect.js";
import { register, login } from "@/app/controllers/authController";

export async function POST(req) {
    await dbConnection();
  
    try {
      const body = await req.json();
      const { action } = body;
  
      if (action === "signup") return register(body);
      if (action === "login") return login(body);
  
      return NextResponse.json({ message: "Invalid API action" }, { status: 400 });
    } catch (error) {
      console.error("❌ API Error:", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
  