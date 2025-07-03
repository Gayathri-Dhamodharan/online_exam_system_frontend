import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resultDetails: [],
};

const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    setResultDetails: (state, action) => {
      state.resultDetails = action.payload;
    },
  },
});

export const { setResultDetails } = resultSlice.actions;

export default resultSlice.reducer;
