import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import store from "./redux/store.ts";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store.ts";
import { ToastContainer } from "react-toastify";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <ToastContainer
        position="top-right"
        limit={1}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
