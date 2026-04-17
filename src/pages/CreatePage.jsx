import { useNavigate } from "react-router";
import ProductForm from "../components/ProductForm";

export default function CreatePage() {
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_SUPABASE_URL;
  const APIKEY = import.meta.env.VITE_SUPABASE_APIKEY;

  async function handleSubmit(productData) {
    console.log("CreatePage productData:", productData);
    await fetch(URL, {
      method: "POST",
      headers: {
        apikey: APIKEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(productData)
    });

    navigate("/");
  }

  return (
    <main className="app">
      <h1 className="page-title">Create Product</h1>
      <ProductForm onSubmit={handleSubmit} />
    </main>
  );
}
