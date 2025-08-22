import { useEffect, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => { setProducts(data); setLoading(false); })
      .catch((e) => { setError(String(e)); setLoading(false); });
  }, []);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Failed: {error}</p>;

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 24 }}>
      <h1>E-Commerce Store</h1>
      <ul>
        {products.map(p => (
          <li key={p.id}>{p.name} - ${p.price}</li>
        ))}
      </ul>
    </div>
  );
}
