import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <ToastContainer autoClose={1000} />
      <App />
    </Provider>
  </React.StrictMode>
);
