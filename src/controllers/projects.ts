import ProjectModel from '../models/projects';
import * as express from 'express';
import Auth from "../services/JwtToken";
class ProjectController {

	public getAllProjects(req: express.Request, res: express.Response, next: express.NextFunction): void {
		ProjectModel
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

    public getProject(req: express.Request, res: express.Response, next: express.NextFunction): void {
			ProjectModel
				.findOne(
					{title: req.body.title},
				)
				.then(async (data) => {
					if(data) {
						res.status(200).json({ data });
					} else {
						let result = await ProjectModel.create({title: req.body.title});
						console.log(' CREATING PROJECT :', result);
						res.status(200).json({ result });
					}
				})
				.catch((error: Error) => {
						res.status(500).json({
								error: error.message,
								errorStack: error.stack
						});
						next(error);
				});
    }
    public updateProject(req: express.Request, res: express.Response, next: express.NextFunction): void {
				let updatePayload: any = {};
				updatePayload = req.body;
				ProjectModel.update(
					req.params,
					{$push: {reports: updatePayload} }
					)
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

export default new ProjectController();
