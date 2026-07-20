import { BaseController } from "../baseController.js";
import { brandService } from "../../Services/brand.service.js";

export default new BaseController(brandService, "brand");