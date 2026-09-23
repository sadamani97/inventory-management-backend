import { z } from "zod";

export const createCountrySchema = z.object({
    countryName: z.string().min(2).max(50),
    countryCode: z.string().min(2).max(3),
});

export const createStateSchema = z.object({
    stateName: z.string().min(2).max(50),
    countryId: z.number(),
});

export const createCitySchema = z.object({
    cityName: z.string().min(2).max(50),
    stateId: z.number(),
});

export const createVendorTypeSchema = z.object({
    typeName: z.string().min(2).max(50),
});

export const createVendorSchema = z.object({
    vendorName: z.string().min(2).max(100),
    companyName: z.string().min(2).max(100),
    vendorTypeId: z.number(),
    website: z.string().optional(),
    gstin: z.string().min(5),
    status: z.enum(["active", "inactive"]).optional(),
});
