import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { todoSlice } from "./redux/Todos/todoSlice.js";
// import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApiProvider api={todoSlice}>
      <App />
    </ApiProvider>
  </React.StrictMode>
);
