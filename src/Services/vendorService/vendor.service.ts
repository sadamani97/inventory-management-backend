import { Op } from "sequelize";
import { Vendor } from "../../models/vendor/vendor.model.js";
import { PurchaseOrder } from "../../models/transctionModel/index.js";

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

    async getVendorStats() {
        const totalCount = await Vendor.count();
        const activeCount = await Vendor.count({ where: { status: "active" } });

        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const newVendorsCount = await Vendor.count({
            where: {
                createdAt: {
                    [Op.gte]: startOfMonth,
                },
            },
        });

        const activePOCount = await PurchaseOrder.count({
            where: {
                status: ["Pending", "Draft", "Approved", "Shipped"],
            },
        });

        return {
            totalVendors: totalCount,
            activeVendors: activeCount,
            newVendors: newVendorsCount,
            activePurchaseOrders: activePOCount,
        };
    }
}
export default new vendorService();