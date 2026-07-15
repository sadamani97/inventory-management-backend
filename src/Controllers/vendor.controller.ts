import type { Request, Response } from "express";
import vendorService from "../Services/vendor.service.js";
import { success } from "zod";

export const createVendor = async(req:Request, res:Response) => {
    const vendor = await vendorService.create(req.body)
    res.status(201).json({success:true,message:"vendor created", data:vendor})
}
export const getVendors = async(req:Request, res:Response) => {
    const vendors = await vendorService.findAll()
    res.status(200).json({success:true,message:"vendors", data:vendors})
}
export const getVendor = async(req:Request, res:Response) => {
    const vendor = await vendorService.FindById(Number(req.params.id))
    res.status(200).json({success:true,message:"vendor", data:vendor})
}
export const updateVendor = async(req:Request, res:Response) => {
    const vendor = await vendorService.Update(Number(req.params.id), req.body)
    res.status(200).json({success:true,message:"vendor updated", data:vendor})
}
export const deleteVendor = async(req:Request, res:Response) => {
    const vendor = await vendorService.Delete(Number(req.params.id))
    res.status(200).json({success:true,message:"vendor deleted", data:vendor})
}
