import Express, { Request, Response, NextFunction }  from "express";
import productsModel from "../models/products.model";
import { where } from "sequelize";

const getProductByIDType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id_object } = req.params;
        const producto = await productsModel.findOne({ where: { id_object: id_object } });
        if (producto) {
            return res.status(200).json({ status: true, data: producto });
        } else {
            return res.status(404).json({ status: true, message: 'Productsa not found' });
        }
    } catch (error) {
        console.log((error as Error).message);
        return res.status(500).json({ status: false, message: 'Server internal error' });
    }
}

const editProduct = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { id_object } = req.params;
        const { price, discount, availability, amount, type_object } = req.body;
        
        const product = await productsModel.findOne({ where: { id_object: id_object } });
        if (product) {
            product.price = price;
            product.discount = discount;
            product.availability = availability;
            product.amount = amount;
            await product.save();
            return res.status(201).json({ success: true, data: product });
        }else{
            const newProduct = await productsModel.create({
                price:price,
                discount:discount,
                availability:availability,
                amount:amount,
                type_object:type_object,
                id_object:id_object,
                overall_rating:0
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
        const { id_object } = req.params;
        const { overall_rating } = req.body;
        const product = await productsModel.findOne({ where: { id_object: id_object } });
        if (product) {
            const ratingExist = parseFloat(product.overall_rating!.toString())
            const newRating = parseFloat(overall_rating)
            const overall_rating_prom = (ratingExist! + newRating) / 2;
            product.overall_rating=overall_rating_prom;
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