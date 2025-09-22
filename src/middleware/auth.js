import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";
import dotenv from "dotenv";

dotenv.config();

// Protect routes → check JWT
export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!req.user) {
      return res.status(401).json({ message: "User not found, invalid token" });
    }

    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Admin only middleware
export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized, user not found" });
  }

  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Access denied, admin only" });
  }

  next();
};
