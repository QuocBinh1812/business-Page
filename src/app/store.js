import counterReducer from "../features/counter/counterSlice";
import userReducer from "../features/Auth/userSlice";
import cartReducer from "../features/Cart/cartSlice";
import { createSlice } from "@reduxjs/toolkit";
const { configureStore } = require("@reduxjs/toolkit");
const rootReducer = {
  counter: counterReducer,
  user: userReducer,
  cart: cartReducer,
};

const store = configureStore({
  reducer: rootReducer,
});
export default store;
