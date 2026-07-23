import { VendorBankDetails } from "../../models/vendor/vendorBankDetails.model.js";

class VendorBankDetailsService {
    async create(data: any) {
        return await VendorBankDetails.create(data);
    }
    async findAll() {
        return await VendorBankDetails.findAll();
    }
    async FindById(id: number) {
        const bankDetails = await VendorBankDetails.findByPk(id);
        if (!bankDetails) throw new Error("Bank details not found");
        return bankDetails;
    }
    async Update(id: number, data: any) {
        const bankDetails = await VendorBankDetails.findByPk(id);
        if (!bankDetails) throw new Error("Bank details not found");
        await bankDetails.update(data);
        return bankDetails;
    }
    async Delete(id: number) {
        const bankDetails = await VendorBankDetails.findByPk(id);
        if (!bankDetails) throw new Error("Bank details not found");
        return bankDetails.destroy();
    }
}

export const vendorBankDetailsService = new VendorBankDetailsService();
