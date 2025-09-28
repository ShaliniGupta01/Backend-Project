import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import WorkoutContext from "./Context/WorkoutContext"; 
import { AuthContextProvider } from "./Context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutContext>
        <App />
      </WorkoutContext>
    </AuthContextProvider>
  </React.StrictMode>
);



