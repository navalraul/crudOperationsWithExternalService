import express from "express";
import { register } from "../controllers/Usercontroller.js";
import { checksForRegister, sellerMiddleware } from "../middleware/authMiddleware.js";
import { addPrduct, deleteProduct, getAllCategories, getAllProducts, getPoductById, getProductByLimit } from "../controllers/productcontroller.js";


var router = express.Router();


router.post('/register',checksForRegister, register);
router.post('/addProduct', sellerMiddleware, addPrduct);
router.post('/getAllProducts', getAllProducts);
router.post('/getProductById', getPoductById);
router.post('/getProductByLimit', getProductByLimit);
router.post('/getAllCategories', getAllCategories);
router.post('/deleteProduct', deleteProduct)


export default router;