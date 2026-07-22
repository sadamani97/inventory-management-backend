import { BaseController } from "../baseController.js";
import { cityService } from "../../Services/vendorService/city.service.js";

export default new BaseController(cityService, "city");
