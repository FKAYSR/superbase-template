import { useParams, useNavigate } from "react-router";
import ProductForm from "../components/ProductForm";
import { useEffect, useState } from "react";

export default function UpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_SUPABASE_URL;
  const APIKEY = import.meta.env.VITE_SUPABASE_APIKEY;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      const response = await fetch(`${URL}?id=eq.${id}`, {
        headers: {
        apikey: APIKEY,
        "Content-Type": "application/json"
      }
    });
      const data = await response.json();
      setProduct(data[0] || null);
      }
      loadProduct();
    }, [id, URL, APIKEY]);

  async function handleSubmit(productData) {
    console.log("UpdatePage productData:", productData);
    await fetch(`${URL}?id=eq.${id}`, {
      method: "PATCH",
      headers: {
        apikey: APIKEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(productData)
    });
    navigate(`/products/${id}`);
  }

    if (!product) {
      return (
        <main>
          <h1 className="page-title">Product details</h1>
          <p className="status-msg">Loading product...</p>
        </main>
      );
    }

  return (
    <main className="app">
      <h1 className="page-title">Update Product</h1>
      <p className="status-msg">
        TODO (Trin 4): Implementer GET til prefill af form data.
      </p>
      <ProductForm onSubmit={handleSubmit} productToUpdate={product} />
    </main>
  );
}
