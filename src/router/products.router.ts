import { Router } from "express";
import productsController from "../controllers/product.controller.js";

class ProductsRouter {

    router:Router;

    constructor(){
        this.router = Router();
        this.config();
    }

    private config(){
        //get all
        this.router.route('/').get(productsController.getAllProducts);
        //get id
        this.router.route('/:id_product').get(productsController.getProductById);
        //edit-sino está que se cree
        this.router.route('/:id_product').post(productsController.createProduct);
        //edit-sino está que se cree
        this.router.route('/:id_product').put(productsController.editProduct);
        //edit el rating
        this.router.route('/:id_product/rating').put(productsController.editProductRating);
    }
}

export default new ProductsRouter();