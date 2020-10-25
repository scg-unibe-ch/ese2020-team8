import { Response, NextFunction } from 'express';

export interface IOwnRequest extends Request {
    product: any;
    isOwner: boolean;
}

export function checkIsOwner(req: IOwnRequest, res: Response, next: NextFunction) {
    if (req.product) {
        req.product.isOwner = 'true'
        next();
        
    } else {
        res.status(403).send({ message: 'Unauthorized' });
    }
}
