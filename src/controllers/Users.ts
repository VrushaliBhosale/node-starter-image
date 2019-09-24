import UserModel from '../models/UserModel';
import * as express from 'express';
import Auth from "../services/JwtToken";
class UserController {

    public getAllUsers(req: express.Request, res: express.Response, next: express.NextFunction): void {
			UserModel
				.find({})
				.then((data)=> {
					res.status(200).json({data});
				})
				.catch((error: Error) => {
					res.status(500).json({
						error: error.message,
						errorStack: error.stack
					});
					next(error);
				});
    }

    public getUser(req: express.Request, res: express.Response, next: express.NextFunction): void {
			UserModel
				.findOne(
					req.params,
				)
				.then((data) => {
						res.status(200).json({ data });
				})
				.catch((error: Error) => {
						res.status(500).json({
								error: error.message,
								errorStack: error.stack
						});
						next(error);
				});
    }
    public updateUser(req: express.Request, res: express.Response, next: express.NextFunction): void {
        let updatePayload: any = {};
        UserModel.update(req.params,updatePayload)
        .then((update) => {
            res.status(200).json({ success: true });
        })
        .catch((error: Error) => {
            res.status(500).json({
                error: error.message,
                errorStack: error.stack
            });
            next(error);
        });
    }
}

export default new UserController();
