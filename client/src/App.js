import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages
import { MyPCs } from "./pages/mypcs/MyPCs";
import { MyLogs } from "./pages/mylogs/MyLogs";
import { Login } from "./pages/login/Login";
import { Error404 } from "./pages/error404/Error404";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { PublicRoute } from "./components/PublicRoute/PublicRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MyPCs />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/logs/:id"
          element={
            <PrivateRoute>
              <MyLogs />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
