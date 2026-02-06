import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { CookiesProvider } from "react-cookie";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

import '../../node_modules/bootstrap-icons/font/bootstrap-icons.css';
const root = ReactDOM.createRoot(document.getElementById("root"));
import { Provider } from "react-redux";
import store from "../store/index";
import { BrowserRouter } from "react-router-dom";
root.render(
  <React.StrictMode>
    <Provider store={store}>
  <CookiesProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CookiesProvider>
</Provider>

  </React.StrictMode>
);
