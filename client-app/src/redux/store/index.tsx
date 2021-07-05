import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../rootReducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export default store;
