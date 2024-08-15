import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    todo: { type: String, required: true },
    completed: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

// Creating a mongoose model for the todo document
const Todo = mongoose.models?.Todo || mongoose.model("Todo", todoSchema);

export default Todo;
