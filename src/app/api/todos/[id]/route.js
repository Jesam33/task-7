import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PATCH(req) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();
    if (!id) {
      return NextResponse.json({ status: 400, message: "ID is required" });
    }

    const body = await req.json();

    if (body.todo === undefined && body.completed === undefined) {
      return NextResponse.json({
        status: 400,
        message: "Invalid input: 'todo' or 'completed' is required",
      });
    }

    const updateFields = {};
    if (body.todo !== undefined) updateFields.todo = body.todo;
    if (body.completed !== undefined) updateFields.completed = body.completed;

    const updatedTodo = await Todo.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedTodo) {
      return NextResponse.json({ status: 404, message: "Todo not found" });
    }

    return NextResponse.json({ status: 200, data: updatedTodo });
  } catch (error) {
    console.error("Error updating todo:", error);
    return NextResponse.json({
      status: 500,
      message: error.message || "Internal Server Error",
    });
  }
}
