import { Routes, Route, Navigate, Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Products from "./pages/Products";

function Navbar() {
  const { user, logout } = useAuth();
  // return (
  //   <nav className="bg-white shadow-lg">
  //     <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
  //       <Link
  //         to="/"
  //         className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
  //       >
  //         E-Shop Dashboard
  //       </Link>
  //       {user && (
  //         <div className="flex space-x-4 items-center">
  //           <Link to="/" className="hover:text-blue-600">
  //             Home
  //           </Link>
  //           <Link to="/users" className="hover:text-blue-600">
  //             Users
  //           </Link>
  //           <Link to="/products" className="hover:text-blue-600">
  //             Products
  //           </Link>
  //           <button
  //             onClick={logout}
  //             className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
  //           >
  //             Logout
  //           </button>
  //         </div>
  //       )}
  //     </div>
  //   </nav>
  // );
}

function AppContent() {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
