import ProductForm from "../../components/admin/ProductForm";
import ProductTable from "../../components/admin/ProductTable";
import Sidebar from "../../components/admin/Sidebar";

import { useState } from "react";
import type { Product } from "../../types/Product";

export default function Products() {

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeForm = () => {
    setEditingProduct(null);
    setIsModalOpen(false);
  };


  return (
    <div className="flex min-h-screen bg-[#FAFAF7]">

      <Sidebar />


      <main className="flex-1 p-4 sm:p-6 lg:p-10 pb-24 lg:pb-10">

        <div className="flex justify-between items-center bg-white lg:bg-transparent border-b border-[#E5E5DD] lg:border-none p-4 lg:p-0 mb-6 lg:mb-8 -mx-4 sm:-mx-6 lg:mx-0 sticky top-0 z-30 lg:static">
          
          <h1 className="text-lg sm:text-xl lg:text-3xl font-bold text-[#13160F]">
            Product Management
          </h1>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#AAD10A] text-[#13160F] font-semibold px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg sm:rounded-xl shadow-sm hover:bg-[#C8EE2C] transition-colors text-sm sm:text-base"
          >
            + Add Product
          </button>
        </div>

        {/* Explicit desktop spacer */}
        <div className="hidden lg:block h-8"></div>

        {/* Product Table ALWAYS displayed */}
        <ProductTable
          onEdit={(product) => {
            setEditingProduct(product);
            setIsModalOpen(true);
          }}
        />

        {/* Modal for Product Form */}
        {(isModalOpen || editingProduct) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-6 overflow-y-auto backdrop-blur-sm">
            <div className="bg-[#FAFAF7] rounded-3xl w-full max-w-5xl max-h-[95vh] overflow-y-auto shadow-2xl relative">
              <ProductForm
                editingProduct={editingProduct}
                clearEditing={closeForm}
              />
            </div>
          </div>
        )}


      </main>

    </div>
  );
}