import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./App.css";
import AuthPage from "./pages/AuthPage";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import Todos from "./pages/Todos";

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex items-center justify-center">
          <div className="w-32 h-32 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/todos" /> : <AuthPage />} />
        <Route path="/todos" element={!user ? <Navigate to="/" /> : <Todos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

