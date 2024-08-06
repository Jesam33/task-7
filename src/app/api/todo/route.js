import { NextRequest, NextResponse } from "next/server";
import Todo from "@/model/todoModel";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    // Parse the request body
    const body = await req.json();

    // Basic validation
    if (!body.todo || typeof body.todo !== "string") {
      return NextResponse.json({
        status: 400,
        error: "Invalid input: 'todo' is required and should be a string",
      });
    }

    // Ensure database connection is ready
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000, // 5 seconds timeout
      });
    }

    // Check for existing todo
    const alreadyExisting = await Todo.findOne({ todo: body.todo });

    if (alreadyExisting) {
      return NextResponse.json({
        status: 400,
        error: "This todo already exists",
      });
    }

    // Create a new Todo instance
    const newTodo = new Todo({
      todo: body.todo,
      completed: false,
    });

    // Save the new Todo
    await newTodo.save();

    // Return a successful response
    return NextResponse.json({ status: 201, data: newTodo });
  } catch (error) {
    console.error("Error posting todo:", error.message);
    return NextResponse.json({
      status: 500,
      error: error.message || "Internal Server Error",
    });
  }
}
