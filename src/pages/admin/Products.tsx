import ProductForm from "../../components/admin/ProductForm";
import ProductTable from "../../components/admin/ProductTable";
import Sidebar from "../../components/admin/Sidebar";

import { useState } from "react";
import type { Product } from "../../types/Product";

export default function Products() {

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [activeTab, setActiveTab] = useState<"add" | "products">("add");


  return (
    <div className="flex min-h-screen bg-[#FAFAF7]">

      <Sidebar />


      <main className="flex-1 p-10">


        {/* Tabs */}

        <div className="
          bg-white
          border
          border-[#E5E5DD]
          rounded-2xl
          p-2
          flex
          gap-2
          w-fit
          mb-8
        ">

          <button
            onClick={() => setActiveTab("add")}
            className={`
              px-6
              py-3
              rounded-xl
              font-semibold
              transition

              ${
                activeTab === "add"
                ? "bg-[#AAD10A] text-[#13160F]"
                : "text-gray-500 hover:bg-gray-100"
              }
            `}
          >
            Add Product
          </button>



          <button
            onClick={() => setActiveTab("products")}
            className={`
              px-6
              py-3
              rounded-xl
              font-semibold
              transition

              ${
                activeTab === "products"
                ? "bg-[#AAD10A] text-[#13160F]"
                : "text-gray-500 hover:bg-gray-100"
              }
            `}
          >
            Products
          </button>


        </div>



        {/* Add Product Tab */}

        {
          activeTab === "add" && (

            <ProductForm
              editingProduct={editingProduct}
              clearEditing={() => setEditingProduct(null)}
            />

          )
        }




        {/* Product Table Tab */}

        {
          activeTab === "products" && (

            <ProductTable
              onEdit={(product)=>{

                setEditingProduct(product);

                // automatically move to edit form
                setActiveTab("add");

              }}
            />

          )
        }


      </main>

    </div>
  );
}