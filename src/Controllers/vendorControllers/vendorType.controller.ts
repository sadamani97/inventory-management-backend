import { BaseController } from "../baseController.js";
import { vendorTypeService } from "../../Services/vendorService/vendorType.service.js";

export default new BaseController(vendorTypeService, "vendor type");
