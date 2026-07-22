import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import { createVendorSchema } from "../../Valitations/vendorValidation/vendor.validation.js";
import vendorController from "../../Controllers/vendorControllers/vendor.controller.js";

const router = Router();

router.post("/", validate(createVendorSchema), vendorController.create);
router.get("/", vendorController.findAll);
router.get("/:id", vendorController.FindById);
router.put("/:id", vendorController.Update);
router.delete("/:id", vendorController.Delete);

export default router;


















// import { Router } from "express";
// import vendorController from "../../Controllers/vendorControllers/vendor.controller.js";

// const router = Router();

// router.post('/', vendorController.create)
// router.get('/', vendorController.findAll)
// router.get('/:id', vendorController.FindById)
// router.put('/:id', vendorController.Update)
// router.delete('/:id', vendorController.Delete)

// export default router