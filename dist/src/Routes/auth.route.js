import { SignupController, LoginController, GetUsersController, GetUserByIdController, CreateUserController, UpdateUserController, DeleteUserController } from "../Controllers/auth.controller.js";
import { Router } from "express";
const router = Router();
router.post("/signup", SignupController);
router.post("/login", LoginController);
// User CRUD routes
router.get("/users", GetUsersController);
router.get("/users/:id", GetUserByIdController);
router.post("/users", CreateUserController);
router.put("/users/:id", UpdateUserController);
router.delete("/users/:id", DeleteUserController);
export default router;
//# sourceMappingURL=auth.route.js.map