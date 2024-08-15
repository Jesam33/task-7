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

    // Retrieve the current todos from local storage
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    // Check for existing todo
    const alreadyExisting = todos.find((todo) => todo.todo === body.todo);

    if (alreadyExisting) {
      return NextResponse.json({
        status: 400,
        error: "This todo already exists",
      });
    }

    // Create a new todo object
    const newTodo = {
      id: Date.now().toString(), // Generate a unique ID
      todo: body.todo,
      completed: false,
    };

    // Add the new todo to the array
    todos.push(newTodo);

    // Save the updated todos array to local storage
    localStorage.setItem("todos", JSON.stringify(todos));

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
