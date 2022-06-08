import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth-context";
import { ToastProvider } from "./context/toast-context";
import { CategoryProvider } from "./context/category-context"
import { QuizProvider } from "./context/quiz-context";
// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider>
      <BrowserRouter>
        <AuthProvider>
          <CategoryProvider>
            <QuizProvider>
              <App />
            </QuizProvider>
          </CategoryProvider>
        </AuthProvider>
      </BrowserRouter>
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
