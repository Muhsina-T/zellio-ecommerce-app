import { useState, useEffect } from "react";
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
    price: String(variant.price),
    image: variant.image || "",
  }))
);
  } else {
    setVariants([
  {
    id: Date.now(),
    storage: "",
    color: "",
    price: "",
    image: "",
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
  e: React.ChangeEvent<HTMLInputElement>
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
    price: "",
    image: "",
  },
]);
  }

 function updateVariant(
  id: number,
  field: "storage" | "color" | "price" | "image",
  value: string
) {
  setVariants((prev) =>
    prev.map((variant) =>
      variant.id === id
        ? { ...variant, [field]: value }
        : variant
    )
  );
}

  function removeVariant(id: number) {
    setVariants(variants.filter((variant) => variant.id !== id));
  }

  function submit() {
  if (
    !name ||
    !brand ||
    !description ||
    !stock ||
    variants.length === 0
  ) {
    alert("Please fill all fields.");
    return;
  }

  for (const variant of variants) {
    if (
      !variant.storage ||
      !variant.color ||
      !variant.price ||
      !variant.image
    ) {
      alert("Please complete every variant.");
      return;
    }
  }

  const product: Product = {
    id: editingProduct ? editingProduct.id : Date.now(),

    name,
    brand,

    image: variants[0].image,
    images: variants.map((v) => v.image),

    rating: Number(rating),

    storage: variants[0].storage,
    color: variants[0].color,
    price: Number(variants[0].price),

    description,
    stock: Number(stock),

    reviews: [],

    variants: variants.map((v) => ({
      id: v.id,
      storage: v.storage,
      color: v.color,
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
      price: "",
      image: "",
    },
  ]);
}

  return (
    <div className="max-w-7xl mx-auto px-1 py-10">
      <h2 className="text-4xl font-bold text-[#13160F] mb-10">
        {editingProduct ? "Update Product" : "Add New Product"}
      </h2>

    

      {/* ================= BASIC DETAILS ================= */}

      <div
        className="bg-white
border
border-[#E5E5DD]
rounded-3xl
shadow-sm p-8 mb-8"
      >
        <h3
          className="text-xl font-semibold text-[#13160F]
font-semibold mb-6"
        >
          Basic Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8 gap-6">
          <div>
            <label className="block text-sm font-semibold text-[#3F443A] mb-2">
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
            <label className="block text-sm font-semibold text-[#3F443A] mb-2">
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

      {/* ================= PRODUCT DETAILS ================= */}

      <div
        className="bg-white
border
border-[#E5E5DD]
rounded-3xl
shadow-sm p-8 mb-8"
      >
        <h3
          className="text-xl font-semibold text-[#13160F]
font-semibold mb-6"
        >
          Product Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <div>
            <label className="block text-sm font-semibold text-[#3F443A] mb-2">
              Rating
            </label>

            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#3F443A] mb-2">
              Stock
            </label>

            <input
              type="number"
              value={stock}
      onChange={(e) => setStock(e.target.value)}
              placeholder="20"
              className="input"
            />
          </div>
        </div>
      </div>

      <div
        className="bg-white
border
border-[#E5E5DD]
rounded-3xl
shadow-sm p-8 mb-8"
      >
        <h3 className="text-xl font-semibold text-[#13160F]
font-semibold mb-6">
          Product Variants
        </h3>

        <div className="space-y-4">
          {variants.map((variant) => (
            <div
              key={variant.id}
              className="grid md:grid-cols-4 gap-4 items-center"
            >
             <select
  className="input"
  value={variant.storage}
  onChange={(e) =>
    updateVariant(variant.id, "storage", e.target.value)
  }
>
  <option value="">Select Storage</option>
  <option value="64 GB">128 GB</option>
  <option value="128 GB">128 GB</option>
  <option value="256 GB">256 GB</option>
  <option value="512 GB">512 GB</option>
  <option value="1 TB">1 TB</option>
</select>

              <input
                className="input"
                placeholder="Colour"
                value={variant.color}
                onChange={(e) =>
                  updateVariant(variant.id, "color", e.target.value)
                }
              />

              <input
                className="input"
                type="number"
                placeholder="Price"
                value={variant.price}
                onChange={(e) =>
                  updateVariant(variant.id, "price", e.target.value)
                }
              />

              <input
    type="file"
    accept="image/*"
    onChange={(e) => handleVariantImage(variant.id, e)}
    className="input"
  />

  {variant.image && (
    <img
      src={variant.image}
      alt=""
      className="mt-2 h-24 w-24 rounded-lg object-cover border"
    />
  )}

              <button
                type="button"
                onClick={() => removeVariant(variant.id)}
                className="btn-primary"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
<br/>
        <button
          type="button"
          onClick={addVariant}
          className="btn-primary"
        >
          + Add Variant
        </button>
      </div>

      {/* ================= DESCRIPTION ================= */}

      <div
        className="bg-white
border
border-[#E5E5DD]
rounded-3xl
shadow-sm
 p-8 mb-8"
      >
        <h3 className="text-xl font-semibold text-[#13160F]
font-semibold mb-6">
          Product Description
        </h3>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write product description..."
          className="input h-40 resize-none"
        />
      </div>
      <br/>

      {/* ================= BUTTON ================= */}

      <div className="flex justify-end">
        <button
          onClick={submit}
         className="btn-primary"
        >
          {editingProduct ? "Update Product" : "Add Product"}
        </button>
      </div>
    </div>
  );
}
