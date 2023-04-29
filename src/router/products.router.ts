import { Router } from "express";
import productsController from "../controllers/product.controller.js";

class ProductsRouter {

    router:Router;

    constructor(){
        this.router = Router();
        this.config();
    }

    private config(){
        this.router.route('/').get(productsController.getProductsByPage);
        this.router.route('/').post(productsController.createProduct);
        this.router.route('/:id_product').get(productsController.getProductById);
        this.router.route('/:id_product').put(productsController.editProduct);
        this.router.route('/:id_product/rating').put(productsController.editProductRating);
    }
}

export default new ProductsRouter();