import {z} from "zod";

export const createUnitSchema= z.object({
    unitId: z.number().optional(),
    unitName: z.string(),
    quantity: z.number(),
})
export const updateUnitSchema= createUnitSchema.partial()



