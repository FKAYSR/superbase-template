import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";

const URL = import.meta.env.VITE_SUPABASE_URL;
const APIKEY = import.meta.env.VITE_SUPABASE_APIKEY;

export default function HomePage() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function loadProdukter() {
      const response = await fetch(URL, {
        headers: {
          apikey: APIKEY,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setProducts(data);
    }
    loadProdukter();
  }, []);
  
  return (
    <main className="app">
      <h1 className="page-title">All Products</h1>
      <section className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}