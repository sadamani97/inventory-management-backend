import { BaseController } from "../baseController.js";
import { addressService } from "../../Services/vendorService/address.service.js";

export default new BaseController(addressService, "address");
