import { Router } from "express";
import {get, getOne, create, remove, update} from "../controllers/photo.controller"
import multer from "../libs/multer";

const router =  Router();

router.route('/photos')
    .get(get)
    .post(multer.single('image'), create)

router.route('/photos/:id')
    .get(getOne)
    .delete(remove)
    .put(update)

export default router;