import { 
  SignupController, 
  LoginController,
  GetUsersController,
  GetUserByIdController,
  CreateUserController,
  UpdateUserController,
  DeleteUserController
} from "../Controllers/auth.controller.js";
import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = Router();

// Public routes
router.post("/signup", SignupController);
router.post("/login", LoginController);

// Protected User CRUD routes
router.get("/users", authenticateToken, GetUsersController);
router.get("/users/:id", authenticateToken, GetUserByIdController);
router.post("/users", authenticateToken, CreateUserController);
router.put("/users/:id", authenticateToken, UpdateUserController);
router.delete("/users/:id", authenticateToken, DeleteUserController);

export default router;