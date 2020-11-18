import express, { Router, Request, Response, NextFunction } from 'express';
import {IAuthRequest} from '../middlewares/checkAuth';
import {notificationService} from '../services/notification.service';

const notificationController: Router = express.Router();

notificationController.get(
    '/me',
    async (req: IAuthRequest, res: Response, next: NextFunction) => {
        try {
          const notifications = await notificationService.getMyNotifications(req.user.userId);
          res.send(notifications);
        } catch (err) {
          next(err);
        }
    }
);

notificationController.post(
    '/:notificationId/seen',
    async (req: IAuthRequest, res: Response, next: NextFunction) => {
        try {
          const notifications = await notificationService.seenNotification(req.params.notificationId);
          res.send(notifications);
        } catch (err) {
          next(err);
        }
    }
);

export const NotificationController = notificationController;
