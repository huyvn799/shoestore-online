import { createSlice } from "@reduxjs/toolkit";
const customerSlice = createSlice({
  name: "customer",
  initialState: {
    content: "account",
  },
  reducers: {
    changePage: (state, action) => {
      state.content = action.payload;
    },
  },
});

export const { changePage } = customerSlice.actions;

export default customerSlice.reducer;
