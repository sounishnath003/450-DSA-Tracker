import {Router} from "express";
import {Next , RequestInterface , ResponseInterface , SUCCESS} from "../utils";

import AuthController from "./AuthController";

const router = Router ();

router.get ("/data" , async (req: RequestInterface , res: ResponseInterface , next: Next) => {
    try {
        return res.status (200).send ({
            ...SUCCESS ,
            msg :"server is running" ,
            ip :req.ip ,
            timestamp :new Date()
        });
    } catch (error) {
        next (error);
    }
    next ();
});

// Controllers

router.use('/auth', AuthController);

export default router;
