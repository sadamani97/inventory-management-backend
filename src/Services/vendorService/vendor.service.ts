import { Op } from "sequelize";
import { Vendor, VendorType, Address, VendorContact, VendorBankDetails, Country, State, City } from "../../models/vendor/index.js";
import { PurchaseOrder } from "../../models/transctionModel/index.js";

class vendorService {
    async create(data: any) {
        return await Vendor.create(data);
    }
    async findAll(options: any = {}) {
        const { page, limit, search, status, category, starredOnly, ...otherOptions } = options;

        const where: any = { ...(otherOptions.where || {}) };
        if (status && status !== "All") {
            where.status = status.toLowerCase();
        }
        if (starredOnly === true || starredOnly === "true") {
            where.isStarred = true;
        }
        if (search && typeof search === "string" && search.trim()) {
            const term = `%${search.trim()}%`;
            where[Op.or] = [
                { vendorName: { [Op.like]: term } },
                { companyName: { [Op.like]: term } },
                { vendorCode: { [Op.like]: term } },
                { email: { [Op.like]: term } },
                { phone: { [Op.like]: term } },
            ];
        }

        const vendorTypeInclude: any = { model: VendorType, as: "vendorType" };
        if (category && category !== "All") {
            vendorTypeInclude.where = { typeName: category };
        }

        const queryOptions: any = {
            include: [
                vendorTypeInclude,
                { model: VendorContact, as: "contacts" },
                { 
                    model: Address, 
                    as: "addresses",
                    include: [
                        { model: Country, as: "country" },
                        { model: State, as: "state" },
                        { model: City, as: "city" }
                    ]
                },
                { model: VendorBankDetails, as: "bankDetails" }
            ],
            where,
            order: [["vendorId", "DESC"]],
            ...otherOptions,
        };

        if (page !== undefined || limit !== undefined) {
            const pageNum = Math.max(1, parseInt(page || 1, 10));
            const limitNum = Math.max(1, parseInt(limit || 10, 10));
            queryOptions.limit = limitNum;
            queryOptions.offset = (pageNum - 1) * limitNum;
            queryOptions.distinct = true;

            const { count, rows } = await Vendor.findAndCountAll(queryOptions);
            return { count, rows };
        }

        return await Vendor.findAll(queryOptions);
    }
    async FindById(id: number) {
        const vendor = await Vendor.findByPk(id, {
            include: [
                { model: VendorType, as: "vendorType" },
                { 
                    model: Address, 
                    as: "addresses",
                    include: [
                        { model: Country, as: "country" },
                        { model: State, as: "state" },
                        { model: City, as: "city" }
                    ]
                },
                { model: VendorContact, as: "contacts" },
                { model: VendorBankDetails, as: "bankDetails" }
            ]
        });
        if (!vendor) {
            throw new Error("Vendor Not Found");
        }
        return vendor;
    }
    async Update(id: number, data: any) {
        const vendor = await Vendor.findByPk(id)
        if (!vendor) {
            throw new Error("Vendor not found")
        }
        await vendor.update(data)
        return vendor
    }
    async setStarred(id: number, isStarred: boolean) {
        const vendor = await Vendor.findByPk(id);
        if (!vendor) {
            throw new Error("Vendor not found");
        }
        await vendor.update({ isStarred });
        return vendor;
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