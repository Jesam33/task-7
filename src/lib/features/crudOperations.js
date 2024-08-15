import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Utility functions for handling local storage
const loadTodosFromLocalStorage = () => {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
};

const saveTodosToLocalStorage = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Thunk for creating a new todo
export const createTodo = createAsyncThunk(
  "todoOperations/create",
  async (todo) => {
    try {
      if (typeof todo !== 'string' || !todo.trim()) {
        throw new Error("Invalid input: 'todo' is required and should be a non-empty string");
      }

      const todos = loadTodosFromLocalStorage();
      const newTodo = {
        id: Date.now().toString(), // Create a unique ID
        todo,
        completed: false,
      };
      todos.push(newTodo);
      saveTodosToLocalStorage(todos);

      console.log("Created Todo:", newTodo); // Logging the newly created todo

      return newTodo;
    } catch (error) {
      return { error: error.message };
    }
  }
);

export const getTodo = createAsyncThunk("todoOperations/get", async () => {
  try {
    const todos = loadTodosFromLocalStorage();
    return { data: todos };
  } catch (error) {
    return { error: error.message };
  }
});

// Thunk for editing a todo
export const editTodo = createAsyncThunk(
  "todoOperations/edit",
  async (change) => {
    try {
      const todos = loadTodosFromLocalStorage();
      const index = todos.findIndex(todo => todo.id === change.editId);

      if (index !== -1) {
        todos[index].todo = change.editedValue;
        saveTodosToLocalStorage(todos);
        return todos[index];
      } else {
        throw new Error("Todo not found with the provided ID");
      }
    } catch (error) {
      return { error: error.message };
    }
  }
);



// Thunk for deleting a todo
export const deleteTodo = createAsyncThunk(
  "todoOperations/delete",
  async (id) => {
    try {
      let todos = loadTodosFromLocalStorage();

      console.log("Deleting Todo ID:", id); // Debugging line
      console.log("Available Todos:", todos); // Debugging line

      const index = todos.findIndex((todo) => todo.id === id);

      if (index !== -1) {
        todos.splice(index, 1);
        saveTodosToLocalStorage(todos);
        return { id };
      } else {
        throw new Error("Todo not found");
      }
    } catch (error) {
      return { error: error.message };
    }
  }
);


// Thunk for completing a todo
export const completeTodo = createAsyncThunk(
  "todoOperations/complete",
  async (id) => {
    try {
      console.log("Complete Request for ID:", id); // Log the ID for completion

      const todos = loadTodosFromLocalStorage();
      console.log("Todos in Local Storage:", todos); // Log all todos

      const index = todos.findIndex((todo) => todo.id === id);

      if (index !== -1) {
        todos[index].completed = !todos[index].completed;
        saveTodosToLocalStorage(todos);
        console.log("Completed Todo:", todos[index]); // Log the completed todo
        return todos[index];
      } else {
        throw new Error("Todo not found");
      }
    } catch (error) {
      console.error("Complete Error:", error.message); // Log any errors
      return { error: error.message };
    }
  }
);

// Slice for CRUD operations
const crudOperations = createSlice({
  name: "crudTodo",
  initialState: {
    todoItems: { data: [] },
    status: "idle",
    error: null,
    response: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload.error) {
          state.error = action.payload.error;
        } else {
          state.todoItems.data.push(action.payload);
          state.response = action.payload;
        }
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todoItems = action.payload;
      })
      .addCase(getTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.todoItems.data.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.todoItems.data[index] = action.payload;
        } else {
          console.error("Todo not found with ID:", action.payload.id);
        }
      })
      
      .addCase(editTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload.error) {
          state.error = action.payload.error;
        } else {
          state.response = action.payload;
          state.todoItems.data = state.todoItems.data.filter(
            (todo) => todo.id !== action.payload.id
          );
        }
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      // Note: Don't put a semicolon here. Just continue with the next case.
      .addCase(completeTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(completeTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload.error) {
          state.error = action.payload.error;
        } else {
          state.response = action.payload;
          const index = state.todoItems.data.findIndex(
            (todo) => todo.id === action.meta.arg
          );
          if (index !== -1) {
            state.todoItems.data[index].completed =
              !state.todoItems.data[index].completed;
          }
        }
      })
      .addCase(completeTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const todos = (state) => state.crudTodo;
export default crudOperations.reducer;
