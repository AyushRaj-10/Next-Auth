// utils/dbConnect.js
import mongoose from "mongoose";

export const dbConnection = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect('mongodb+srv://ayushrajranjan10:Mb0k7p5WcXtF6uKl@cluster0.rbumslu.mongodb.net/', {
      dbName: "Next-Auth", // optional
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
  }
};
