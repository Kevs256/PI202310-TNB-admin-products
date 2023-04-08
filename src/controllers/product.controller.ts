import Express, { Request, Response, NextFunction }  from "express";
import productsModel from "../models/products.model";
import { where } from "sequelize";



const getProductByID = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id_carta } = req.params;
        const producto = await productsModel.findOne({ where: { id_carta: id_carta } });
        if (producto) {
            res.status(200).json({ status: true, data: producto });
        } else {
            res.status(404).json({ status: true, message: 'Product not found' });
        }
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({ status: false, message: 'Server internal error' });
    }
}

const editProduct = async (req: Request, res: Response, next: NextFunction) => {
    try{

    }catch(err){

    }
}


export default {
    getProductByID,
    editProduct,
}