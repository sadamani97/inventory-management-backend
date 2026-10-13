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
    findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const page = req.query.page ? parseInt(req.query.page as string, 10) : undefined;
            const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;

            const result = await this.service.findAll({
                ...req.query,
                page,
                limit,
            });

            if (result && typeof result === "object" && "rows" in result && "count" in result) {
                const pageNum = page ? Math.max(1, page) : 1;
                const limitNum = limit ? Math.max(1, limit) : (result.rows.length || 10);
                res.status(200).json({
                    success: true,
                    message: `${this.entrieName}s`,
                    data: result.rows,
                    totalItems: result.count,
                    page: pageNum,
                    limit: limitNum,
                    totalPages: limitNum > 0 ? Math.ceil(result.count / limitNum) : 1,
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: `${this.entrieName}s`,
                data: result,
                totalItems: Array.isArray(result) ? result.length : 0,
            });
        } catch (error) {
            next(error);
        }
    };
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