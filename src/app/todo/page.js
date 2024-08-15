"use client";
import Todo from "../components/Todo";
import { useDispatch, useSelector } from "react-redux";
import {
  completeTodo,
  deleteTodo,
  editTodo,
  getTodo,
  todos,
} from "@/lib/features/crudOperations";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddTodo() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editedValue, setEditedValue] = useState("");
  const [editId, setEditId] = useState("");
  const dispatch = useDispatch();
  const { status, error, todoItems, response } = useSelector(todos);

  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);

  // Listen to changes in response state and show appropriate toast messages
  useEffect(() => {
    if (response?.status === 200) {
      toast.success(response.message || "Action completed successfully");
    } else if (response?.status === 400 || response?.status === 404) {
      toast.error(response?.message || "An error occurred");
    }
  }, [response]);

  if (status === "loading" || status === "idle") {
    return (
      <div className="p-8">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <p className="text-todo-red">Error: {error}</p>
      </div>
    );
  }

  function handleEdit(e) {
    setEditId(e.target.closest("li").id);
    setModalOpen(true);
  }

  function handleEditValue(value) {
    setEditedValue(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (editedValue === "") {
      toast.error("You can't have an empty todo");
      return;
    }
    const resultAction = dispatch(editTodo({ editedValue, editId }));
    
    // Check if dispatch was successful
    resultAction.then(result => {
      if (editTodo.fulfilled.match(result)) {
        toast.success("Todo edited successfully");
      } else {
        toast.error(result.payload.error || "An error occurred");
      }
    });
    setModalOpen(false);
  }
  

  function handleDelete(e) {
    dispatch(deleteTodo(e.target.closest("li").id));
  }

  function handleComplete(e) {
    dispatch(completeTodo(e.target.closest("li").id));
  }

  return (
    <main className="p-8">
      <ToastContainer />

      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm w-screen h-screen z-50 flex items-center justify-center">
          <form
            className="flex flex-col gap-5 w-[600px] bg-white p-5 rounded-lg shadow-lg"
            onSubmit={handleSubmit}
          >
            <div
              className="border border-secondary cursor-pointer rounded-full p-2 w-fit text-primary"
              onClick={() => setModalOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
            <input
              name="to-do"
              id="to-do"
              className="text-white bg-slate-500 px-3 py-2 focus:border focus:border-secondary focus:outline-none rounded-md"
              onInput={(e) => setEditedValue(e.target.value)}
              value={editedValue}
            />
            <button className="rounded-md bg-slate-900 text-white px-3 py-2 uppercase">
              Edit
            </button>
          </form>
        </div>
      )}
      <ul className="flex flex-col gap-5">
        {todoItems?.data?.length > 0 ? (
          todoItems.data.map((todo, index) => (
            <Todo
              key={todo.id}
              id={todo.id}
              todo={todo.todo}
              completed={todo.completed}
              handleEdit={(e) => {
                handleEdit(e);
                handleEditValue(todo.todo);
              }}
              handleDelete={(e) => {
                handleDelete(e);
              }}
              handleComplete={(e) => {
                handleComplete(e);
              }}
            />
          ))
        ) : (
          <p className="text-white text-center my-5 text-2xl">
            There aren&apos;t any todos yet
          </p>
        )}
      </ul>
    </main>
  );
}
