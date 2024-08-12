import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk for creating a new todo
export const createTodo = createAsyncThunk(
  "todoOperations/create",
  async (todo) => {
    try {
      // Validate that `todo` is a non-empty string
      if (typeof todo !== 'string' || !todo.trim()) {
        throw new Error("Invalid input: 'todo' is required and should be a non-empty string");
        console.log(todo);
      }

      const response = await axios.post(
        "/api/todo",
        { todo }, // Ensure that the API expects `{ todo }`
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 20000,
        }
      );
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }
);

// Thunk for fetching todos
export const getTodo = createAsyncThunk("todoOperations/get", async () => {
  try {
    const response = await axios.get("/api/todos");
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
});

// Thunk for editing a todo
export const editTodo = createAsyncThunk(
  "todoOperations/edit",
  async (change) => {
    try {
      const response = await axios.patch(
        `/api/todos/${change.editId}`,
        { todo: change.editedValue }, // Ensure this matches your API's expected payload
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 20000,
        }
      );
      return response.data;
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
      const response = await axios.delete(`/api/todo/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 20000,
      });
      return response.data;
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
      const response = await axios.patch(`/api/complete/${id}`, {}, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
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
        if (action.payload.error) {
          state.error = action.payload.error;
        } else {
          state.response = action.payload;
          // Update todoItems after successful edit:
          const index = state.todoItems.data.findIndex(
            (todo) => todo._id === action.meta.arg.editId
          );
          if (index !== -1) {
            state.todoItems.data[index].todo = action.meta.arg.editedValue;
          }
        }
      })
      .addCase(editTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
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
          // Update todoItems after successful delete:
          state.todoItems.data = state.todoItems.data.filter(
            (todo) => todo._id !== action.meta.arg
          );
        }
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(completeTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(completeTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload.error) {
          state.error = action.payload.error;
        } else {
          state.response = action.payload;
          // Update todoItems after successful completion:
          const index = state.todoItems.data.findIndex(
            (todo) => todo._id === action.meta.arg
          );
          if (index !== -1) {
            state.todoItems.data[index].completed =
              !state.todoItems.data[index].completed;
          }
        }
      })
      .addCase(completeTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const todos = (state) => state.crudTodo;
export default crudOperations.reducer;
