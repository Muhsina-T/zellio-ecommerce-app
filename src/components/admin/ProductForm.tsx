import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import useProducts from "../../hooks/useProducts";

import type { Product } from "../../types/Product";

type Props = {
  editingProduct?: Product | null;
  clearEditing: () => void;
};

export default function ProductForm({ editingProduct, clearEditing }: Props) {
  const { addProduct, updateProduct } = useProducts();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");

  const [rating, setRating] = useState("5");

  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");

  const [variants, setVariants] = useState([
    {
      id: Date.now(),
      storage: "",
      color: "",
      costPrice: "",
      price: "",
      image: "",
    },
  ]);

  useEffect(() => {
    if (!editingProduct) return;

    setName(editingProduct.name);
    setBrand(editingProduct.brand);

    setRating(String(editingProduct.rating));

    setDescription(editingProduct.description);
    setStock(String(editingProduct.stock));

    if (editingProduct.variants?.length) {
      setVariants(
        editingProduct.variants.map((variant) => ({
          id: variant.id,
          storage: variant.storage,
          color: variant.color,
          costPrice: String(variant.costPrice),
          price: String(variant.price),
          image: variant.image || "",
        })),
      );
    } else {
      setVariants([
        {
          id: Date.now(),
          storage: editingProduct.storage || "",
          color: editingProduct.color || "",
          costPrice: "",
          price: editingProduct.price ? String(editingProduct.price) : "",
          image: editingProduct.image || "",
        },
      ]);
    }
  }, [editingProduct]);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result as string);

      reader.onerror = reject;
    });
  };

  const handleVariantImage = async (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const base64 = await fileToBase64(file);

    updateVariant(id, "image", base64);
  };

  function addVariant() {
    setVariants([
      ...variants,
      {
        id: Date.now(),
        storage: "",
        color: "",
        costPrice: "",
        price: "",
        image: "",
      },
    ]);
  }

  function updateVariant(
    id: number,
    field: "storage" | "color" | "costPrice" | "price" | "image",
    value: string,
  ) {
    setVariants((prev) =>
      prev.map((variant) =>
        variant.id === id ? { ...variant, [field]: value } : variant,
      ),
    );
  }

  function removeVariant(id: number) {
    setVariants(variants.filter((variant) => variant.id !== id));
  }

  function submit() {
    if (!name || !brand || !description || !stock || variants.length === 0) {
      alert("Please fill all fields.");
      return;
    }

    for (const variant of variants) {
      if (
        !variant.storage ||
        !variant.color ||
        !variant.costPrice ||
        !variant.price ||
        !variant.image
      ) {
        alert("Please complete every variant.");
        return;
      }
    }

    const product: Product = {
      _id: editingProduct?._id,

      name,
      brand,

      image: variants[0].image,
      images: variants.map((v) => v.image),

      rating: Number(rating),

      storage: variants[0].storage,
      color: variants[0].color,
      price: Number(variants[0].price),
      costPrice:Number(variants[0].costPrice),

      description,
      stock: Number(stock),

      reviews: [],

      variants: variants.map((v) => ({
        id: v.id,
        storage: v.storage,
        color: v.color,
        costPrice: Number(v.costPrice),
        price: Number(v.price),
        image: v.image,
      })),
    };

    if (editingProduct) {
      updateProduct(product);
      clearEditing();
    } else {
      addProduct(product);
    }

    setName("");
    setBrand("");
    setRating("5");
    setDescription("");
    setStock("");

    setVariants([
      {
        id: Date.now(),
        storage: "",
        color: "",
        costPrice: "",
        price: "",
        image: "",
      },
    ]);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={clearEditing}
            className="p-2 rounded-full bg-[#FFFFFF] border border-[#E5E5DD] hover:bg-[#F2F2EC] transition-colors"
          >
            <ArrowLeft size={24} className="text-[#13160F]" />
          </button>
          <h2 className="text-xl lg:text-2xl font-bold text-[#13160F]">
            {editingProduct ? "Update Product" : "Add New Product"}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={clearEditing}
            className="px-4 py-2 lg:px-6 lg:py-3 text-sm lg:text-base border border-[#E5E5DD] rounded-xl lg:rounded-2xl bg-white hover:bg-gray-50 text-[#3F443A] font-semibold transition"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="btn-primary px-4 py-2 lg:px-8 lg:py-3 text-sm lg:text-base"
          >
            {editingProduct ? "Save Changes" : "Save Product"}
          </button>
        </div>
      </div>

      {/* Explicit spacer to guarantee space below the header */}
      <div style={{ height: "16px" }}></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          {/* ================= BASIC DETAILS ================= */}
          <div className="bg-white border border-[#E5E5DD] rounded-2xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-[#13160F] mb-4">
              Basic Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#3F443A] mb-1">
                  Phone Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="iPhone 16 Pro"
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#3F443A] mb-1">
                  Brand
                </label>
                <input
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Apple"
                  className="input"
                />
              </div>
            </div>
          </div>

          {/* Explicit spacer between Basic Information and Product Details */}
          <div style={{ height: "16px" }}></div>

          {/* ================= PRODUCT DETAILS ================= */}
          <div className="bg-white border border-[#E5E5DD] rounded-2xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-[#13160F] mb-4">
              Product Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#3F443A] mb-1">
                  Rating
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  onWheel={(e) => e.currentTarget.blur()}
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#3F443A] mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  onWheel={(e) => e.currentTarget.blur()}
                  placeholder="20"
                  className="input [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>
          </div>

          {/* Explicit spacer between Product Details and Product Description */}
          <div style={{ height: "16px" }}></div>

          {/* ================= DESCRIPTION ================= */}
          <div className="bg-white border border-[#E5E5DD] rounded-2xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-[#13160F] mb-4">
              Product Description
            </h3>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write product description..."
              className="input h-24 resize-none"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* ================= PRODUCT VARIANTS ================= */}
          <div className="bg-white border border-[#E5E5DD] rounded-2xl shadow-sm p-5 flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[#13160F]">
                Product Variants
              </h3>
              <button
                type="button"
                onClick={addVariant}
                className="text-sm font-semibold text-[#AAD10A] hover:underline"
              >
                + Add Variant
              </button>
            </div>

            <div className="space-y-4 max-h-[440px] overflow-y-auto pr-2 flex-1">
              {variants.map((variant) => (
                <div
                  key={variant.id}
                  className="grid grid-cols-2 gap-3 p-4 border border-[#E5E5DD] rounded-xl relative bg-[#FAFAF7]"
                >
                  {variants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVariant(variant.id)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm font-bold bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-sm"
                    >
                      ✕
                    </button>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-[#3F443A] mb-1">
                      Storage
                    </label>
                    <select
                      className="input text-sm py-2"
                      value={variant.storage}
                      onChange={(e) =>
                        updateVariant(variant.id, "storage", e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      <option value="64 GB">64 GB</option>
                      <option value="128 GB">128 GB</option>
                      <option value="256 GB">256 GB</option>
                      <option value="512 GB">512 GB</option>
                      <option value="1 TB">1 TB</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#3F443A] mb-1">
                      Color
                    </label>
                    <input
                      className="input text-sm py-2"
                      placeholder="Color"
                      value={variant.color}
                      onChange={(e) =>
                        updateVariant(variant.id, "color", e.target.value)
                      }
                    />
                  </div>
                  {/* Cost Price */}
                  <div>
                    <label className="block text-xs font-semibold text-[#3F443A] mb-1">
                      Cost Price
                    </label>

                    <input
                      className="input text-sm py-2"
                      type="number"
                      min="0"
                      placeholder="Cost Price"
                      value={variant.costPrice}
                      onChange={(e) =>
                        updateVariant(variant.id, "costPrice", e.target.value)
                      }
                    />
                  </div>

                  {/* Selling Price */}
                  <div>
                    <label className="block text-xs font-semibold text-[#3F443A] mb-1">
                      Selling Price
                    </label>

                    <input
                      className="input text-sm py-2"
                      type="number"
                      min="0"
                      placeholder="Selling Price"
                      value={variant.price}
                      onChange={(e) =>
                        updateVariant(variant.id, "price", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col justify-end">
                    <label className="block text-xs font-semibold text-[#3F443A] mb-1">
                      Image
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleVariantImage(variant.id, e)}
                        className="text-xs w-full overflow-hidden"
                      />
                      {variant.image && (
                        <img
                          src={variant.image}
                          alt=""
                          className="h-8 w-8 rounded object-cover border border-gray-200"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
