import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";

import useProducts from "../hooks/useProducts";

export default function Home() {
  const { products, searchProducts } = useProducts();

  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All");
  const [sort, setSort] = useState("");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      searchProducts(search);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  // Brand + sorting
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (brand !== "All") {
      filtered = filtered.filter((item) => item.brand === brand);
    }

    if (sort === "low") {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, brand, sort]);

  

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#13160F]">
      <Navbar search={search} setSearch={setSearch} />

      <div className="bg-[#FAFAF7] min-h-screen">
        <div className="max-w-[1600px] mx-auto flex gap-6 px-6">
          <Sidebar
            brand={brand}
            setBrand={setBrand}
            sort={sort}
            setSort={setSort}
          />

          <motion.div
            className="flex-1 min-h-screen"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
            }}
          >
            <div className="p-6">
              <ProductGrid products={filteredProducts} />
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
