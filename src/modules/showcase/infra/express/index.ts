import express, { Router, Express } from "express";
import { getShowcaseController, searchShowcasesController } from "./controllers";


const router = Router();

router.get('/', express.json(), searchShowcasesController);

router.get('/:showcaseId', express.json(), getShowcaseController);


export function addShowcaseRouter(app: Express){
    app.use('/showcases', router);
}