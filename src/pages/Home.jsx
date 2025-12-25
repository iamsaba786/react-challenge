import { Link } from "react-router-dom";
import { users, products } from "../data/Data";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 text-slate-100">
      <div className="px-6 py-10 md:px-10 max-w-6xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-semibold mb-8 bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
          Dashboard Overview
        </h1>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="relative rounded-2xl bg-slate-900/70 border border-slate-800 px-6 py-6 shadow-[0_0_0_1px_rgba(15,23,42,0.9)]">
            <p className="text-xs text-slate-400 mb-1">Total Products</p>
            <h3 className="text-3xl font-bold text-blue-400">
              {products.length}
            </h3>
          </div>

          <div className="relative rounded-2xl bg-slate-900/70 border border-slate-800 px-6 py-6 shadow-[0_0_0_1px_rgba(15,23,42,0.9)]">
            <p className="text-xs text-slate-400 mb-1">Total Users</p>
            <h3 className="text-3xl font-bold text-emerald-400">
              {users.length}
            </h3>
          </div>

          <div className="relative rounded-2xl bg-slate-900/70 border border-slate-800 px-6 py-6 shadow-[0_0_0_1px_rgba(15,23,42,0.9)]">
            <p className="text-xs text-slate-400 mb-1">Total Revenue</p>
            <h3 className="text-3xl font-bold text-violet-400">₹2.5M+</h3>
          </div>
        </div>

        {/* CTA cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Link to="/products" className="block group">
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-8">
                <h2 className="text-2xl font-semibold mb-2">
                  View All Products
                </h2>
                <p className="text-sm text-slate-100/90">
                  Manage inventory, stock & pricing
                </p>
              </div>
            </div>
          </Link>

          <Link to="/users" className="block group">
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-8">
                <h2 className="text-2xl font-semibold mb-2">View All Users</h2>
                <p className="text-sm text-slate-100/90">
                  Customer analytics &amp; management
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
