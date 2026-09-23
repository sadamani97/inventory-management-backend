import { Router } from "express";
import { alertController } from "../../Controllers/alertControllers/alert.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createAlertSchema, updateAlertSchema } from "../../Valitations/alertValidation/alert.validation.js";

const alertRouter = Router();

alertRouter.get("/summary", alertController.getSummary);
alertRouter.get("/critical", alertController.getCritical);
alertRouter.get("/", alertController.findAllFiltered);
alertRouter.get("/:id", alertController.FindById);
alertRouter.post("/", validate(createAlertSchema), alertController.create);
alertRouter.put("/:id", validate(updateAlertSchema), alertController.Update);
alertRouter.delete("/:id", alertController.Delete);

export default alertRouter;
