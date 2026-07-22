import { BaseController } from "../baseController.js";
import { vendorContactService } from "../../Services/vendorService/vendorContact.service.js";

export default new BaseController(vendorContactService, "vendor contact");
