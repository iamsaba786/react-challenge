import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "bg-slate-700 text-white"
      : "text-slate-300 hover:bg-slate-800";

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 text-slate-100 flex">
      <aside className="w-64 bg-slate-950/95 border-r border-slate-800 flex flex-col justify-between p-5">
        <div>
          <h1 className="text-xl font-semibold mb-6">Ecom</h1>

          <div className="mb-6 rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs">
            <p className="text-slate-400 mb-1">Logged in as:</p>
            <p className="truncate">{user?.email || "Guest"}</p>
          </div>

          <nav className="space-y-2 text-sm">
            <Link
              to="/"
              className={`block rounded-lg px-3 py-2 ${isActive("/")}`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`block rounded-lg px-3 py-2 ${isActive("/products")}`}
            >
              Products
            </Link>
            <Link
              to="/users"
              className={`block rounded-lg px-3 py-2 ${isActive("/users")}`}
            >
              Users
            </Link>
          </nav>
        </div>

        <div className="mt-6">
          <button
            onClick={logout}
            className="w-full rounded-xl bg-white text-slate-900 text-sm font-medium py-2.5 hover:bg-slate-100 transition-colors"
          >
            Logout
          </button>
          <p className="mt-3 text-[10px] text-slate-500">© Ecom App</p>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
