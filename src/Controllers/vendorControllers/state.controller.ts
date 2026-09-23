import { BaseController } from "../baseController.js";
import { stateService } from "../../Services/vendorService/state.service.js";

export default new BaseController(stateService, "state");
