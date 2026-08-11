import { BaseService } from "../baseService.js";
import { createPO } from "../../models/transctionModel/index.js";

class CreatePOService extends BaseService<any> {
    constructor() {
        super(createPO, "poNumber", undefined, "Create PO Entry");
    }
}

export default new CreatePOService();
