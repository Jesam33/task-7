import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="relative flex justify-center  bg-slate-50 py-4 shadow-md md:justify-end md:px-10">
      <ul className="flex gap-6 md:gap-10">
        <li className="bg-slate-900">
          <Link href="/">
            <p className="text-white px-4 py-2 rounded-md">Add Todo</p>
          </Link>
        </li>
        <li className="hover:bg-todo-light-purple bg-slate-900 transition-colors duration-300">
          <Link href="/todo">
            <p className="text-white px-4 py-2 rounded-md">Todos</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
