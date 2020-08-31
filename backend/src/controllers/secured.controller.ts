import express, { Router } from "express";
import { verifyToken } from '../middlewares/checkAuth';

const securedEndpoint: Router = express.Router();

securedEndpoint.use(verifyToken);

securedEndpoint.get('/', (req, res) => {

    res.send({message: `This is a secured Endpoint, ${ req.body.tokenPayload.userName }`})
});

export const SecuredController: Router = securedEndpoint;