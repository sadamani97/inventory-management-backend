



import type { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // Check if it's a foreign key error from Sequelize
    if (err.name === "SequelizeForeignKeyConstraintError") {
        return res.status(400).json({
            success: false,
            message: `Invalid foreign key: The referenced ${err.table || 'record'} (ID: ${err.value}) does not exist.`
        });
    }

    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal server error";

    if (status >= 500) {
        console.error(err);
    }

    res.status(status).json({
        success: false,
        message: message,
    });
};












// import type { Request,Response, NextFunction } from "express";

// export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
// }