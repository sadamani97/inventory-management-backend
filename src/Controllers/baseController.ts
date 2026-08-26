import type { Request, Response, NextFunction } from "express";

export class BaseController<T> {
    constructor(private service:any, private entrieName:string){}

    create = async (req:Request, res: Response, next:NextFunction): Promise<void> =>{
        try{
        const data = await this.service.create(req?.body)
        res.status(201).json({success:true,message:`created ${this.entrieName}`, data})
        }catch(error){
            next(error)
        }
    }
    findAll = async (req:Request, res: Response,next:NextFunction): Promise<void> =>{
        try{
        const data = await this.service.findAll()
        res.status(200).json({success:true,message:`${this.entrieName}s`, data})
        }catch(error){
            next(error)
        }
    }
     FindById = async (req:Request, res: Response, next:NextFunction): Promise<void> =>{
        try{
        const id = Number(req?.params?.id);
        if (isNaN(id) || id <= 0) {
            res.status(400).json({
                success: false,
                message: `Invalid ID parameter provided for ${this.entrieName}`
            });
            return;
        }
        const data = await this.service.FindById(id)
        if (!data) {
            res.status(404).json({
                success: false,
                message: `${this.entrieName} not found`
            });
            return;
        }
        res.status(200).json({success:true,message:`${this.entrieName}`, data})
        }catch(error){
            next(error)
        }
    }
    Update = async (req:Request, res: Response, next:NextFunction): Promise<void> =>{
        try{
        const id = Number(req?.params?.id);
        if (isNaN(id) || id <= 0) {
            res.status(400).json({
                success: false,
                message: `Invalid ID parameter provided for ${this.entrieName}`
            });
            return;
        }
        const data = await this.service.Update(id,req?.body)
        res.status(200).json({success:true,message:`${this.entrieName} updated`, data})
            }catch(error){
            next(error)
        }
    }
    Delete = async (req:Request, res: Response, next:NextFunction): Promise<void> =>{
        try{
        const id = Number(req?.params?.id);
        if (isNaN(id) || id <= 0) {
            res.status(400).json({
                success: false,
                message: `Invalid ID parameter provided for ${this.entrieName}`
            });
            return;
        }
        const data = await this.service.Delete(id)
        res.status(200).json({success:true,message:`${this.entrieName} deleted`, data})
        }catch(error){
            next(error)
        }
    }
}