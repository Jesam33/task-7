"use client";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createTodo, todos } from "@/lib/features/crudOperations";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();
  const { response } = useSelector(todos) || {}; // Default to empty object

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createTodo(todo));
    setTodo("");

    if (todo === "") {
      // showErrorToast("You can't have an empty todo");
      toast.error ("You can't have an empty todo");
      return;
    }

    if (response && response.status === 201) {
      toast.success ("Todo has been added successfully");
    } else if (response && (response.status === 400 || response.status === 404)) {
      // showErrorToast(response.message);
      toast.error(response.message)
    }
  }

  // function showToast(toastMessage) {
  //   StartToastifyInstance({
  //     text: toastMessage,
  //     className: "fixed z-20 p-4 top-5 right-5 flex gap-3 text-tertiary text-white",
  //     duration: 3000,
  //     destination: "https://github.com/apvarun/toastify-js",
  //     newWindow: true,
  //     close: true,
  //     gravity: "top",
  //     position: "left",
  //     stopOnFocus: true,
  //     style: {
  //       background: "linear-gradient(to right, #8A2BE2,  #8A2BA2)",
  //     },
  //   }).showToast();
  // }

  // function showErrorToast(toastMessage) {
  //   StartToastifyInstance({
  //     text: toastMessage,
  //     className: "fixed z-20 p-4 top-5 right-5 flex gap-3 text-tertiary text-white bg-todo-red",
  //     duration: 3000,
  //     destination: "https://github.com/apvarun/toastify-js",
  //     newWindow: true,
  //     close: true,
  //     gravity: "top",
  //     position: "left",
  //     stopOnFocus: true,
  //   }).showToast();
  // }
  return (
    <main className="p-8 flex  justify-center">
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
          className="uppercase  bg-slate-50 text-slate-900 font-[700] p-2 rounded-md  cursor-pointer"
        />
      </form>
    </main>
  );
}
