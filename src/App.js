import "./App.css";
import Mockman from "mockman-js";
import { Routes, Route } from 'react-router-dom'
import Toast from "./components/Toast/Toast"
import Homepage from "./pages/Homepage/Homepage";
import { SignupPage, LoginPage } from "./pages/AuthPage/index.js"
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import QuizPage from "./pages/QuizPage/QuizPage";
function App() {
  return (
    <div className="app-container">
      <Toast />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/quiz/:id" element={<QuizPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="mockman" element={<Mockman />} />
      </Routes>
    </div>
  );
}

export default App;
