import express from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "./setup";
import authRouter from "./routes/auth";
import productsRouter from "./routes/products";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);

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
