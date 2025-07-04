import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import React from 'react'
import { Provider } from "react-redux";
import { store } from "./redux/store";
function App() {

  return (
    <>
      {" "}
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App
