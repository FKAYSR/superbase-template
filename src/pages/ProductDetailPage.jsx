import { useParams, useNavigate, Link } from "react-router";
import { useEffect, useState } from "react";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const URL = import.meta.env.VITE_SUPABASE_URL;
  const APIKEY = import.meta.env.VITE_SUPABASE_APIKEY;

   const [product, setProducts] = useState(null);
    useEffect(() => {
      async function loadProdukter() {
        const response = await fetch(`${URL}?id=eq.${id}`, {
          headers: {
            apikey: APIKEY,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setProducts(data[0] || null);
      }
      loadProdukter();
    }, [id, URL, APIKEY]);

  async function handleDelete() {
    const confirmed = window.confirm("Delete this product?");
    if (!confirmed) return;

      await fetch(`${URL}?id=eq.${id}`, {
        method: "DELETE",
        headers: {
          apikey: APIKEY,
          "Content-Type": "application/json"
      },
    });
    navigate("/");
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
      <h1 className="page-title">Product Details</h1>
      
      <article className="product-detail">
        {product.image ? (
          <img src={product.image} alt={product.title} />
        ) : (
          <div className="image-placeholder large">?</div>
        )}
        <div className="product-detail-body">
          <h2 className="product-detail-title">{product.title}</h2>
          <p className="product-detail-price">DKK {product.price}</p>
          <div className="product-detail-actions">
            <Link to={`/products/${id}/update`} className="btn btn-primary">
              ✏️ Edit
            </Link>
            <button className="btn btn-danger" onClick={handleDelete}>
              🗑️ Delete
            </button>
          </div>
        </div>
      </article>
    </main>
  );
}
