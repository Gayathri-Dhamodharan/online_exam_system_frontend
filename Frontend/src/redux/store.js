import { configureStore } from "@reduxjs/toolkit";

import resultReducer from "../redux/Slice/resultSlice"

export const store = configureStore({
  reducer: {
    result: resultReducer,
  },
});
