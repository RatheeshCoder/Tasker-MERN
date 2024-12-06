import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/style.css";
import { Main } from "./page/Main";
import LoginForm from "./components/Login";
import SignupForm from "./components/SignUp";
import { ErrorBoundary } from "react-error-boundary";


function App() {
  return (
    <>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/task" element={<Main />} />
          <Route path="/" element={<LoginForm />} />
          <Route path="/SignupForm" element={<SignupForm />} />
        </Routes>
      </BrowserRouter>
      </ErrorBoundary>
    </>
  );
}

export default App;
