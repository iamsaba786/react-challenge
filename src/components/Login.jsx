import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ id: 1, name: "Test User", email });
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white flex items-center justify-center">
      <div className="w-full max-w-md px-6 md:px-0 md:mr-auto md:ml-32">
        <h1 className="text-3xl md:text-4xl font-semibold mb-2">
          Welcome back
        </h1>
        <p className="text-sm text-slate-400 mb-8">Sign in to continue</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-xs font-medium tracking-wide text-slate-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-slate-700 py-2 text-sm outline-none focus:border-slate-300 placeholder:text-slate-500"
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-xs font-medium tracking-wide text-slate-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-slate-700 py-2 text-sm outline-none focus:border-slate-300 placeholder:text-slate-500"
              required
            />
          </div>

          {/* forgot password */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="h-3 w-3 rounded border-slate-600 bg-transparent text-slate-200 focus:ring-0"
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              className="hover:text-slate-200 transition-colors"
            >
              Forgot password?
            </button>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-white text-black text-sm font-medium py-2.5 rounded-md mt-2 hover:bg-slate-100 transition-colors"
          >
            Sign In
          </button>
        </form>

        {/* Sign up */}
        <p className="mt-6 text-xs text-slate-400">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-slate-100 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
