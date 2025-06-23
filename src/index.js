import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import store from "./store";


// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//       .register('/service-worker.js') // Path relative to the public root
//       .then(registration => {
//         console.log('Service Worker registered with scope: ', registration.scope);
//       })
//       .catch(error => {
//         console.error('Service Worker registration failed: ', error);
//       });
//   });
// }


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
