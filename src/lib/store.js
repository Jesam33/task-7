import { configureStore } from "@reduxjs/toolkit";
import crudOperations from "./features/crudOperations";

export const store = configureStore({
  reducer: {
    crudTodo: crudOperations,
  },
});
