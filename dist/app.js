import express from "express";
import cors from "cors";
import authRoutes from "./Routes/auth.route.js";
import { errorHandler } from "./middlewares/error.middleware.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", authRoutes);
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map