import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import cors from "cors";
import authRouter from "./routes/auth.js";
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/employee.js";
import salaryRouter from "./routes/salary.js";
import leaveRouter from "./routes/leave.js";
import attendanceRouter from "./routes/attendance.js";
import connectToDatabase from "./Database/database.js";

const app = express();

app.use(cors());
app.use(express.json());

// ✅ FIX: Serve ONLY server/public correctly
const publicDir = path.join(__dirname, "public");
app.use("/public", express.static(publicDir));

// Debug: return a JSON list of files in uploads (helps verify filenames and paths)
app.get("/debug/uploads", (req, res) => {
  const uploadsPath = path.join(__dirname, "public", "uploads");
  try {
    const files = fs.readdirSync(uploadsPath);
    return res.json({ success: true, files });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

connectToDatabase();
app.use("/api/auth", authRouter);
app.use("/api/department", departmentRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/leave", leaveRouter);
app.use('/api/attendance', attendanceRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is Running on port ${PORT}`));
