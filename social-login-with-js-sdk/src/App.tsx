import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./views/pages/LoginPage";
import { HomePage } from "./views/pages/HomePage";
import { authService } from "./services/auth.service";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return authService.isLoggedIn() ? (
    <>{children}</>
  ) : (
    <Navigate to="/" replace />
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
