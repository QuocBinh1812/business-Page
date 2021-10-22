import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./app/store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack"; //show thong bao
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <SnackbarProvider
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
