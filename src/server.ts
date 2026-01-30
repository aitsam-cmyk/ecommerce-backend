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

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// 1. Home Route (Professional Look)
app.get("/", (_req, res) => {
  res.status(200).send(`
    <html>
      <head>
        <title>E‑commerce API | Backend</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; line-height: 1.6; color: #333; }
          .container { max-width: 800px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
          .status { color: #27ae60; font-weight: bold; }
          .methods { background: #f9f9f9; padding: 15px; border-left: 5px solid #3498db; margin: 20px 0; }
          ul { list-style: none; padding: 0; }
          li { margin-bottom: 10px; }
          a { color: #3498db; text-decoration: none; font-weight: bold; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🚀 E‑commerce API is Live</h1>
          <p>Status: <span class="status">Running Smoothly (Express 5.x)</span></p>
          
          <div class="methods">
            <h3>Supported Payment Ways:</h3>
            <ul>
              <li>📱 <strong>Easypaisa / JazzCash:</strong> Manual Verification</li>
              <li>🏦 <strong>Bank Transfer:</strong> Direct Deposit</li>
              <li>🚚 <strong>COD:</strong> Cash on Delivery</li>
            </ul>
          </div>

          <p>Available Endpoints:</p>
          <ul>
            <li>🔗 <a href="/health">/health</a> – Service Health Check</li>
            <li>🔗 <a href="/api/products">/api/products</a> – View All Products</li>
          </ul>
        </div>
      </body>
    </html>
  `);
});

// 2. Health Check
app.get("/health", (_req, res) => {
  res.json({ 
    status: "ok", 
    version: "1.0.0",
    engine: "Express 5.x",
    timestamp: new Date().toISOString() 
  });
});

// 3. API Routes
app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/banners", bannersRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/payments", paymentsRouter);
app.use("/api/bank-details", bankDetailsRouter);

// 4. FIX: Express 5 Wildcard (Catch-all for 404)
// PathError ko khatam karne ke liye humne '/*any' use kiya hai
app.all('/*any', (_req, res) => {
  res.status(404).send(`
    <div style="text-align: center; padding: 50px; font-family: sans-serif;">
      <h2 style="color: #e74c3c;">404 - Endpoint Not Found</h2>
      <p>Sorry, the route you are looking for does not exist.</p>
      <a href="/">Return to Dashboard</a>
    </div>
  `);
});

const port = Number(process.env.PORT || 4000);

// 5. Database Connection & Server Startup
config
  .connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log("------------------------------------------");
      console.log(`📡 Server: http://localhost:${port}`);
      console.log(`✅ DB: Connected Successfully`);
      console.log(`🚀 Mode: Express 5 Compatible`);
      console.log("------------------------------------------");
    });
  })
  .catch((err) => {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  });