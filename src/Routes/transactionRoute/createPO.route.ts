import { Router } from "express";
import createPOController from "../../Controllers/transactionController/createPO.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
    createCreatePOSchema,
    updateCreatePOSchema,
} from "../../Valitations/transactionValidation/createPO.validation.js";

const router = Router();

router.post("/", validate(createCreatePOSchema), createPOController.create);
router.get("/", createPOController.findAll);
router.get("/:id", createPOController.FindById);
router.put("/:id", validate(updateCreatePOSchema), createPOController.Update);
router.delete("/:id", createPOController.Delete);

export default router;
