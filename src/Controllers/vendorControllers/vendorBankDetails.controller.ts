import { BaseController } from "../baseController.js";
import { vendorBankDetailsService } from "../../Services/vendorService/vendorBankDetails.service.js";

export default new BaseController(vendorBankDetailsService, "vendor bank details");
