import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import { createStateSchema } from "../../Valitations/vendorValidation/vendor.validation.js";
import stateController from "../../Controllers/vendorControllers/state.controller.js";

const router = Router();

router.post("/", validate(createStateSchema), stateController.create);
router.get("/", stateController.findAll);
router.get("/:id", stateController.FindById);
router.put("/:id", stateController.Update);
router.delete("/:id", stateController.Delete);

export default router;
