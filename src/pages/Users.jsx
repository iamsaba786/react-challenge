import { useState, useMemo, useEffect } from "react";
import { users as usersData, userRatings } from "../data/Data";

const Users = () => {
  const [filters, setFilters] = useState({
    rating: userRatings[0],
    minOrders: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredUsers = useMemo(() => {
    return usersData.filter((user) => {
      const ratingMatch =
        user.rating >= filters.rating.min && user.rating <= filters.rating.max;

      const ordersMatch =
        !filters.minOrders ||
        user.totalOrders >= Number(filters.minOrders || 0);

      return ratingMatch && ordersMatch;
    });
  }, [filters]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const currentUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-[#050816] text-gray-100 px-6 py-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold">Users</h1>
        <p className="text-sm md:text-base text-gray-400 mt-1">
          Manage and filter users ({filteredUsers.length} users)
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Filters */}
        <div className="bg-[#0b1020] border border-white/5 rounded-2xl px-6 py-5 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
          <h2 className="text-sm font-medium text-gray-300 mb-4">Filters</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Rating filter */}
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                User Rating
              </label>
              <select
                value={filters.rating.label}
                onChange={(e) => {
                  const selected = userRatings.find(
                    (r) => r.label === e.target.value
                  );
                  setFilters({ ...filters, rating: selected });
                }}
                className="w-full bg-[#050816] border border-white/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/60"
              >
                {userRatings.map((r) => (
                  <option key={r.label} value={r.label}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Users cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {currentUsers.map((user) => (
            <div
              key={user.id}
              className="bg-[#050816] border border-white/5 rounded-2xl p-5 flex gap-4 shadow-[0_0_30px_rgba(0,0,0,0.6)] hover:border-blue-500/40 hover:shadow-[0_0_40px_rgba(37,99,235,0.35)] transition"
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full overflow-hidden border border-white/10">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-sm md:text-base">
                    {user.name}
                  </h3>
                  <span className="flex items-center text-xs text-yellow-400">
                    <span className="mr-1">★</span>
                    {user.rating}
                  </span>
                </div>

                <div className="mt-2 space-y-1.5 text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500/70" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500/70" />
                    <span>{user.totalOrders} orders</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-pink-500/70" />
                    <span>Joined {user.joinedDate}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {currentUsers.length === 0 && (
            <p className="text-sm text-gray-400 col-span-full">
              No users found with current filters.
            </p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-40"
              disabled={currentPage === 1}
            >
              Prev
            </button>

            <span className="text-xs text-gray-400">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-40"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
