"use client";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (todo.trim() === "") {
      toast.error("You can't have an empty todo");
      return;
    }

    const newTodo = { id: Date.now().toString(), todo, completed: false };
    const updatedTodos = [...todos, newTodo];

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTodo("");

    toast.success("Todo has been added successfully");
  }

  return (
    <main className="p-8 flex justify-center">
      <ToastContainer />
      <form
        className="flex flex-col gap-8 w-full md:w-[600px] mt-20"
        onSubmit={handleSubmit}
      >
        <textarea
          name="todo"
          id="todo"
          className="bg-todo-light-black rounded-md h-[60px] text-white p-2"
          onInput={(e) => {
            setTodo(e.target.value);
          }}
          value={todo}
        />
        <input
          type="submit"
          value="Create Todo"
          className="uppercase bg-slate-50 text-slate-900 font-[700] p-2 rounded-md cursor-pointer"
        />
      </form>
    </main>
  );
}
