import { Router } from "express";
import { createVendor, getVendors, getVendor, updateVendor, deleteVendor } from "../Controllers/vendor.controller.js";

const router = Router();

router.post('/',createVendor)
router.get('/',getVendors)
router.get('/:id',getVendor)
router.put('/:id',updateVendor)
router.delete('/:id',deleteVendor)

export default router