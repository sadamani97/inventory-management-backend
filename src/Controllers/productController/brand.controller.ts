import { BaseController } from "../baseController.js";
import { brandService } from "../../Services/producr.service/brand.service.js";

export default new BaseController(brandService, "brand");