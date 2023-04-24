import { Router } from "express";
import productsController from "../controllers/product.controller.js";

class ProductsRouter {

    router:Router;

    constructor(){
        this.router = Router();
        this.config();
    }

    private config(){
        //get id
        this.router.route('/product/:id_object').get(productsController.getProductByIDType);
        //get all
        this.router.route('/products').get(productsController.getAllProducts);
        //edit-sino está que se cree
        this.router.route('/product/edit/:id_object').put(productsController.editProduct);
        //edit el rating
        this.router.route('/product/edit/rating/:id_object').put(productsController.editProductRating);
    }
}

export default new ProductsRouter();