import { VendorContact } from "../../models/vendor/vendorContact.model.js";

class VendorContactService {
    async create(data: any) {
        return await VendorContact.create(data);
    }
    async findAll() {
        return await VendorContact.findAll();
    }
    async FindById(id: number) {
        const contact = await VendorContact.findByPk(id);
        if (!contact) throw new Error("Vendor contact not found");
        return contact;
    }
    async Update(id: number, data: any) {
        const contact = await VendorContact.findByPk(id);
        if (!contact) throw new Error("Vendor contact not found");
        await contact.update(data);
        return contact;
    }
    async Delete(id: number) {
        const contact = await VendorContact.findByPk(id);
        if (!contact) throw new Error("Vendor contact not found");
        return contact.destroy();
    }
}

export const vendorContactService = new VendorContactService();
