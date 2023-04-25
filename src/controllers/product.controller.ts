import Express, { Request, Response, NextFunction }  from "express";
import productsModel from "../models/products.model";
import { where } from "sequelize";

const getProductByIDType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id_product } = req.params;
        const producto = await productsModel.findByPk(id_product);
        if (producto) {
            return res.status(200).json({ status: true, data: producto });
        } else {
            return res.status(404).json({ status: true, message: 'Product not found' });
        }
    } catch (error) {
        console.log((error as Error).message);
        return res.status(500).json({ status: false, message: 'Server internal error' });
    }
}

const editProduct = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { id_product } = req.params;
        const { price, discount, availability, amount, type } = req.body;
        
        const product = await productsModel.findByPk(id_product);
        if (product) {
            product.price = price || product.save;
            product.discount = discount || product.discount;
            product.availability = availability || product.availability;
            product.amount = amount || product.amount;
            await product.save();
            return res.status(201).json({ success: true, data: product });
        }else{
            const newProduct = await productsModel.create({
                price, discount, availability, 
                amount, type, overall_rating: 0, amount_people_rate: 0
            });
            return res.status(201).json({ success: true, data: newProduct });
        }
    }catch(err){
        console.error(err);
        return res.status(500).json({ success: false, error: 'Server error' });
    }
}

const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const products = await productsModel.findAll();
        return res.status(201).json({ success: true, data: products });
    }catch(err){
        console.log(err);
        return res.status(500).json({ error: 'Error al obtener los productos' });
    }
}

const editProductRating = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id_product } = req.params;
        const { rating } = req.body;
        const product = await productsModel.findByPk(id_product);
        if (product) {
            const oldRating = product.overall_rating;
            const newRating = parseFloat(rating);
            const amount_ratings = product.amount_people_rate + 1;
            const overall_rating_prom = (oldRating + newRating) / amount_ratings;
            product.overall_rating = overall_rating_prom;
            product.amount_people_rate += 1;
            await product.save();
            return res.status(201).json({ success: true, data: product });
        }else{
            return res.status(401).json({ success: false, message: "no se encontro el producto" });
        }
    } catch (error) {
        return res.status(501).json({ success: false, message: "falla en el servidor" });
    }
}

export default {
    getProductByIDType,
    editProduct,
    getAllProducts,
    editProductRating
}