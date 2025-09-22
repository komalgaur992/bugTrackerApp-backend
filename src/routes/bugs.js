import express from "express";
import prisma from "../prismaClient.js";
import { validateBugInput, validateStatus } from "../utils/validate.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

// Create bug
router.post("/", protect, async (req, res) => {
  try {
    const { title, description, severity } = req.body;
    const error = validateBugInput(title, description, severity);
    if (error) return res.status(400).json({ success: false, message: error });

    const bug = await prisma.bug.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        severity: severity || "LOW",
        reporterId: req.user.id,
      },
      include: { reporter: { select: { id: true, name: true, email: true } } },
    });

    res.status(201).json({ success: true, data: bug });
  } catch (error) {
    console.error("Create bug error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// List bugs
router.get("/", protect, async (req, res) => {
  try {
    const { status, severity, title } = req.query;

    let filter = {};
    if (status) filter.status = status.toUpperCase();
    if (severity) filter.severity = severity.toUpperCase();
    if (title) filter.title = { contains: title, mode: "insensitive" };

    if (req.user.role === "REPORTER") {
      filter.reporterId = req.user.id;
    }

    const bugs = await prisma.bug.findMany({
      where: filter,
      include: { reporter: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ success: true, data: bugs });
  } catch (error) {
    console.error("List bugs error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Update bug status
router.put("/:id/status", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const statusError = validateStatus(status);
    if (statusError) return res.status(400).json({ message: statusError });

    const bug = await prisma.bug.findUnique({ where: { id: parseInt(id) } });
    if (!bug) return res.status(404).json({ message: "Bug not found" });

    if (req.user.role !== "ADMIN" && bug.reporterId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this bug" });
    }

    const updated = await prisma.bug.update({
      where: { id: parseInt(id) },
      data: { status: status.toUpperCase() },
      include: { reporter: { select: { id: true, name: true, email: true } } },
    });

    res.json(updated);
  } catch (error) {
    console.error("Update bug error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
