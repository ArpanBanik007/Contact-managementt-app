import express from "express";
import cors from "cors";
import path from "path";

const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
}));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.static("public"));

// Routes
import contactRoutes from "./router/contact.router.js";
app.use("/api/v1/contact", contactRoutes);

// Production frontend

// if (process.env.NODE_ENV === "production") {
//     const __dirname = path.resolve();
//     app.use(express.static(path.join(__dirname, "Contact-Frontend", "dist")));

//     // Safe catch-all route
//     app.get(/.*/, (req, res) => {
//         res.sendFile(path.join(__dirname, "Contact-Frontend", "dist", "index.html"));
//     });
// }




if(process.env.NODE_ENV==="production"){
  const dirPath= path.resolve();
  app.use(express.static("Contact-Frontend/dist"))
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(dirPath,'Contact-Frontend/dist','index.html'))
  })
}
export default app;
