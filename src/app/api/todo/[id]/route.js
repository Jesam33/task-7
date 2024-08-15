export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // Extract the ID from the URL
    
    if (!id) {
      return NextResponse.json({ status: 400, message: "ID is required" });
    }

    // Retrieve the current todos from local storage
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    // Find the todo to delete
    const todoIndex = todos.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) {
      return NextResponse.json({ status: 404, message: "Todo not found" });
    }

    // Remove the todo from the array
    const deletedTodo = todos.splice(todoIndex, 1)[0];

    // Update local storage with the remaining todos
    localStorage.setItem("todos", JSON.stringify(todos));

    return NextResponse.json({ status: 200, data: deletedTodo });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return NextResponse.json({
      status: 500,
      message: error.message || "Internal Server Error",
    });
  }
}
