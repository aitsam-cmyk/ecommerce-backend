import express from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "./setup";
import authRouter from "./routes/auth";
import productsRouter from "./routes/products";
import categoriesRouter from "./routes/categories";
import bannersRouter from "./routes/banners";
import ordersRouter from "./routes/orders";
import reviewsRouter from "./routes/reviews";
import paymentsRouter from "./routes/payments";
import bankDetailsRouter from "./routes/bank-details";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

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

app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/banners", bannersRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/payments", paymentsRouter);
app.use("/api/bank-details", bankDetailsRouter);

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

config
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
