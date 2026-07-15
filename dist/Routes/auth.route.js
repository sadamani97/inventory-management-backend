import { SignupController, LoginController } from "../Controllers/auth.controller.js";
import { Router } from "express";
const router = Router();
router.post("/signup", SignupController);
router.post("/login", LoginController);
export default router;
//# sourceMappingURL=auth.route.js.map