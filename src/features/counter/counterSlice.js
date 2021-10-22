import { createSlice } from "@reduxjs/toolkit";

const couterSlice = createSlice({
  name: "couter123",
  initialState: 0,
  reducers: {
    increase(state, action) {
      return state + 1;
    },
    decrease(state, action) {
      return state - 1;
    },
  },
});
const { actions, reducer } = couterSlice;
export const { increase, decrease } = actions;
export default reducer;
