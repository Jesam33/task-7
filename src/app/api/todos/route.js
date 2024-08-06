import { NextRequest, NextResponse } from "next/server";
import Todo from "@/model/todoModel";
import mongoose from "mongoose";

export async function GET(req) {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
      });
    }

    const allTodos = await Todo.find({});

    return NextResponse.json({ status: 200, data: allTodos });
  } catch (error) {
    console.error("Error getting todos:", error);
    return NextResponse.json({
      status: 500,
      message: error.message || "Internal Server Error",
    });
  }
}
