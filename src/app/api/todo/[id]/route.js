import { NextRequest, NextResponse } from "next/server";
import Todo from "@/model/todoModel";
import mongoose from "mongoose";

export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();
    if (!id) {
      return NextResponse.json({ status: 400, message: "ID is required" });
    }

    // Ensure database connection is ready
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000, // 5 seconds timeout
      });
    }

    const deletedTodo = await Todo.findOneAndDelete({ _id: id });

    if (!deletedTodo) {
      return NextResponse.json({ status: 404, message: "Todo not found" });
    }

    return NextResponse.json({ status: 200, data: deletedTodo });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return NextResponse.json({
      status: 500,
      message: error.message || "Internal Server Error",
    });
  }
}
