import { Vendor } from "../../models/vendor/vendor.model.js";

class vendorService {
    async create(data: any) {
        return await Vendor.create(data);
    }
    async findAll() {
        return await Vendor.findAll();
    }
    async FindById(id: number) {
        const vendor = await Vendor.findByPk(id)
        if (!vendor) {
            throw new Error("Vendor Not Found");
        }
        return vendor
    }
    async Update(id: number, data: any) {
        const vendor = await Vendor.findByPk(id)
        if (!vendor) {
            throw new Error("Vendor not found")
        }
        await vendor.update(data)
        return vendor
    }
    async Delete(id: number) {
        const vendor = await Vendor.findByPk(id)
        if (!vendor) {
            throw new Error("vendor not found")
        }
        return vendor.destroy()
    }

}
export default new vendorService();