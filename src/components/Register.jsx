import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    login({ id: 1, name: fullName || "New User", email });
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white flex items-center justify-center">
      <div className="w-full max-w-md px-6 md:px-0 md:mr-auto md:ml-32">
        <h1 className="text-3xl md:text-4xl font-semibold mb-2">
          Create account
        </h1>
        <p className="text-sm text-slate-400 mb-8">Sign up to get started</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="fullName"
              className="text-xs font-medium tracking-wide text-slate-300"
            >
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-transparent border-b border-slate-700 py-2 text-sm outline-none focus:border-slate-300 placeholder:text-slate-500"
              required
            />
          </div>

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

          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-xs font-medium tracking-wide text-slate-300"
            >
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-transparent border-b border-slate-700 py-2 text-sm outline-none focus:border-slate-300 placeholder:text-slate-500"
            />
          </div>

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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-slate-700 py-2 text-sm outline-none focus:border-slate-300 placeholder:text-slate-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black text-sm font-medium py-2.5 rounded-md mt-2 hover:bg-slate-100 transition-colors"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-xs text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="text-slate-100 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
