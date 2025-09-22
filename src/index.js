import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import bugRoutes from "./routes/bugs.js";

dotenv.config();
const app = express();


// ✅ Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// ✅ CORS configuration
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "https://bug-tracker-app-frontend-m44azk76b-komalgaur992s-projects.vercel.app", // Vercel frontend
  "http://localhost:5173" // local dev
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ✅ Body parser
app.use(express.json({ limit: "10mb" }));

// ✅ Log incoming requests (debugging)
app.use((req, res, next) => {
  console.log(`📩 Incoming request: ${req.method} ${req.url}`);
  next();
});

// ✅ Root route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Bug Tracker API 🚀" });
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/bugs", bugRoutes);

// ✅ 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Error handler
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// ✅ Server start
export default app;
