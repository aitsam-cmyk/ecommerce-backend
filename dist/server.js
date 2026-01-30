"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const setup_1 = require("./setup");
const auth_1 = __importDefault(require("./routes/auth"));
const products_1 = __importDefault(require("./routes/products"));
const categories_1 = __importDefault(require("./routes/categories"));
const banners_1 = __importDefault(require("./routes/banners"));
const orders_1 = __importDefault(require("./routes/orders"));
const reviews_1 = __importDefault(require("./routes/reviews"));
const payments_1 = __importDefault(require("./routes/payments"));
const bank_details_1 = __importDefault(require("./routes/bank-details"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.get("/", (_req, res) => {
    res.status(200).send(`
    <html>
      <head><title>E‑commerce API</title></head>
      <body style="font-family: Arial, sans-serif; padding: 20px;">
        <h1>E‑commerce API</h1>
        <p>The backend is running.</p>
        <ul>
          <li><a href="/health">/health</a> – service health check</li>
          <li><a href="/api/products">/api/products</a> – list products</li>
        </ul>
      </body>
    </html>
  `);
});
app.get("/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});
app.use("/api/auth", auth_1.default);
app.use("/api/products", products_1.default);
app.use("/api/categories", categories_1.default);
app.use("/api/banners", banners_1.default);
app.use("/api/orders", orders_1.default);
app.use("/api/reviews", reviews_1.default);
app.use("/api/payments", payments_1.default);
app.use("/api/bank-details", bank_details_1.default);
app.use((_req, res) => {
    res.status(200).send(`
    <html>
      <head><title>E‑commerce API</title></head>
      <body style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Endpoint not found</h2>
        <p>Available endpoints:</p>
        <ul>
          <li><a href="/health">/health</a></li>
          <li><a href="/api/products">/api/products</a></li>
        </ul>
      </body>
    </html>
  `);
});
const port = Number(process.env.PORT || 4000);
setup_1.config
    .connectDB()
    .then(() => {
    app.listen(port, () => {
        console.log(`API server listening on http://localhost:${port}`);
    });
})
    .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
});
