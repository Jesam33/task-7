import { NextRequest, NextResponse } from "next/server";
import Todo from "@/model/todoModel";
import mongoose from "mongoose";

export async function PATCH(req) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();
    if (!id) {
      return NextResponse.json({ status: 400, message: "ID is required" });
    }

    const body = await req.json();

    // Validate the request body
    if (body.todo === undefined && body.completed === undefined) {
      return NextResponse.json({
        status: 400,
        message: "Invalid input: 'todo' or 'completed' is required",
      });
    }

    // Ensure database connection is ready
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000, // 5 seconds timeout
      });
    }

    // Build update object
    const update = {};
    if (body.todo !== undefined) update.todo = body.todo;
    if (body.completed !== undefined) update.completed = body.completed;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      update,
      { new: true } // Return the updated document
    );

    if (!updatedTodo) {
      return NextResponse.json({ status: 404, message: "Todo not found" });
    }

    return NextResponse.json({ status: 200, data: updatedTodo });
  } catch (error) {
    console.error("Error editing todo:", error);
    return NextResponse.json({
      status: 500,
      message: error.message || "Internal Server Error",
    });
  }
}
