import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/style.css";
import { Main } from "./page/Main";
import LoginForm from "./components/Login";
import SignupForm from "./components/SignUp";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/task" element={<Main />} />
          <Route path="/" element={<LoginForm />} />
          <Route path="/SignupForm" element={<SignupForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
