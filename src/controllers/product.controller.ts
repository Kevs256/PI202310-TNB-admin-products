import Express, { Request, Response, NextFunction }  from "express";
import productsModel from "../models/products.model";

const getProductById = async (req: Request, res: Response, next: NextFunction) => {
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

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { id_card, price, discount, availability, stock, type } = req.body;
        
        const newProduct = await productsModel.create({
            id_product: id_card,
            price, discount, availability, 
            stock, type, acu_ratings: 0, cont_ratings: 0
        });

        return res.status(200).json({ success: true, data: newProduct });
    }catch(err){
        console.error(err);
        return res.status(500).json({ success: false, error: 'Server error' });
    }
}

const editProduct = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { id_product } = req.params;
        const { price, discount, availability } = req.body;
        
        const product = await productsModel.findByPk(id_product);
        if (product) {
            product.price = price || product.price;
            product.discount = discount || product.discount;
            product.availability = availability || product.availability;
            await product.save();
            return res.status(200).json({ success: true, data: product });
        }else{
            return res.status(404).json({ success: true, error: "product not found" });
        }
    }catch(err){
        console.error(err);
        return res.status(500).json({ success: false, error: 'Server error' });
    }
}

const getProductsByPage = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {page} = req.query;
        let _page:number = 1;
        let _offset:number;
        if(page && typeof(page) === 'string'){
            if(/^\d+$/.test(page)){
                _page = parseInt(page);
            }else{
                return res.status(401).json({ success: true, message: "Invalid page" });
            }
        }
        _offset = (_page - 1) * 6; 
        const products = await productsModel.findAll({
            limit: 6,
            offset: _offset,
        });
        const products_count = await productsModel.count();
        return res.status(201).json({ success: true, data: {products, pages: Math.ceil(products_count/6)} });
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
            product.acu_ratings += rating;
            product.cont_ratings += 1;
            await product.save();
            return res.status(201).json({ success: true, data: product });
        }else{
            return res.status(401).json({ success: false, message: "no se encontro el producto" });
        }
    } catch (error) {
        return res.status(501).json({ success: false, message: "falla en el servidor" });
    }
}

const editProductStock = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id_product } = req.params;
        const { stock } = req.body;
        const product = await productsModel.findByPk(id_product);
        if (product) {
            product.stock += stock;
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
    getProductById,
    editProduct,
    createProduct,
    getProductsByPage,
    editProductRating,
    editProductStock
}