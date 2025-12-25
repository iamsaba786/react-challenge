import { useState, useMemo, useEffect } from "react";
import { products, brands, categories, priceRanges } from "../data/Data";

const Products = () => {
  const [filters, setFilters] = useState({
    brand: "",
    category: "",
    priceRange: priceRanges[0],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const brandMatch = !filters.brand || product.brand === filters.brand;

      const categoryMatch =
        !filters.category || product.category === filters.category;

      const priceMatch =
        product.price >= filters.priceRange.min &&
        product.price <= filters.priceRange.max;

      return brandMatch && categoryMatch && priceMatch;
    });
  }, [filters]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-[#050816] text-gray-100 px-6 py-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold">Products</h1>
        <p className="text-sm md:text-base text-gray-400 mt-1">
          Browse and filter products ({filteredProducts.length} products)
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Filters panel */}
        <div className="bg-[#0b1020] border border-white/5 rounded-2xl px-6 py-5 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
          <h2 className="text-sm font-medium text-gray-300 mb-4">Filters</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Brand */}
            <div>
              <label className="block text-xs text-gray-400 mb-1">Brand</label>
              <select
                value={filters.brand}
                onChange={(e) =>
                  setFilters({ ...filters, brand: e.target.value })
                }
                className="w-full bg-[#050816] border border-white/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/60"
              >
                <option value="">All Brands</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
                className="w-full bg-[#050816] border border-white/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/60"
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Price range */}
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                Price Range
              </label>
              <select
                value={filters.priceRange.label}
                onChange={(e) => {
                  const selected = priceRanges.find(
                    (r) => r.label === e.target.value
                  );
                  setFilters({ ...filters, priceRange: selected });
                }}
                className="w-full bg-[#050816] border border-white/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/60"
              >
                {priceRanges.map((r) => (
                  <option key={r.label} value={r.label}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#050816] border border-white/5 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.6)] hover:border-blue-500/40 hover:shadow-[0_0_40px_rgba(37,99,235,0.35)] transition flex flex-col"
            >
              {/* Image */}
              <div className="relative h-44 md:h-48 w-full overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-black/70 text-xs px-2 py-1 rounded-full border border-white/10">
                  {product.brand}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 px-5 py-4 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-gray-400 mb-1">
                    {product.category}
                  </p>
                  <h3 className="text-sm md:text-base font-semibold text-white">
                    {product.name}
                  </h3>
                </div>

                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Price</p>
                    <p className="text-lg font-semibold text-white">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className="flex items-center text-xs text-yellow-400">
                    <span className="mr-1">★</span>
                    {product.rating}
                  </div>
                </div>
              </div>

              {/* CTA bar */}
              <div className="px-5 pb-4">
                <button
                  className="w-full bg-white text-black text-sm font-medium py-2.5 rounded-xl hover:bg-gray-100 transition disabled:opacity-60"
                  disabled={!product.inStock}
                >
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            </div>
          ))}

          {currentProducts.length === 0 && (
            <p className="text-sm text-gray-400 col-span-full">
              No products found with current filters.
            </p>
          )}
        </div>

        {/*Pagination*/}
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

export default Products;
