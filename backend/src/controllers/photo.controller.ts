import express, { Request, Response, NextFunction, Router } from 'express';
import { config } from '../config';

import multer from 'multer';
import {verifyToken, IAuthRequest} from '../middlewares/checkAuth';
import {checkProductAuthorization} from '../middlewares/checkProductAuthorization';
import {photoService} from '../services/photo.service';
import path from 'path';

const upload = multer({
    dest: config.uploadPath
});

const photoController = express.Router();
photoController.post(
    '/:productId',
    verifyToken,
    checkProductAuthorization,
    upload.array('images', 5),
    // upload.array('images[]', 5),
    async (req: AuthFileRequest, res: Response, next: NextFunction) => {
        try {
            const files = req.files as any[];

            const uploadPromises = files.map( file => {
                const image = {
                    UserId: req.user.userId,
                    ProductId: req.params.productId,
                    fileName: file.filename
                };
                return photoService.create(image);
            });
            await Promise.all(uploadPromises);
            res.send({ sucess: true });
        } catch (err) {
            return next(err);
        }
    }
);
photoController.get(
    '/:fileName',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const fileName = req.params.fileName;
            res.sendFile(path.join(process.cwd(), config.uploadPath + `/${fileName}`));
        } catch (err) {
            next(err);
        }
    }
);

interface AuthFileRequest extends Request, IAuthRequest {
    file: any;
}

export const PhotoController: Router = photoController;
