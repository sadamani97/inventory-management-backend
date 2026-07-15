import {z} from "zod";

export const createVendorSchema= z.object({
    vendorId:z.number(),
    vendorName:z.string(),
    companyName:z.string(),
    vendorType:z.string(),
    contactPersonName:z.string(),
    phoneNumber:z.number(),
    emailAddress:z.string(),
    website:z.string(),
    addressLine:z.string(),
    city:z.string(),
    state:z.string(),
    country:z.string(),
    pincode:z.number()
});