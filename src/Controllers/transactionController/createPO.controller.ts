import { BaseController } from "../baseController.js";
import createPOService from "../../Services/transctionService/createPO.service.js";

class CreatePOController extends BaseController<any> {
    constructor() {
        super(createPOService, "create PO");
    }
}

export default new CreatePOController();
