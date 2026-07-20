import { BaseController } from "../baseController.js";
import { unitService } from "../../Services/unit.service.js";

export default new BaseController(unitService, "unit")