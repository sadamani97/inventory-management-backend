import { BaseController } from "../baseController.js";
import { unitService } from "../../Services/producr.service/unit.service.js";

export default new BaseController(unitService, "unit")