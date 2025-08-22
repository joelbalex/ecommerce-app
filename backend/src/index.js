const express = require("express");
const path = require("path");
const app = express();

// Simple API
app.get("/api/products", (req, res) => {
  res.json([
    { id: 1, name: "Laptop", price: 500 },
    { id: 2, name: "Phone", price: 200 }
  ]);
});

// Health endpoint for smoke test
app.get("/healthz", (req, res) => res.send("ok"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
