import { BaseController } from "../baseController.js";
import { countriesService } from "../../Services/vendorService/countries.service.js";

export default new BaseController(countriesService, "country");
