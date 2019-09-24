import ProjectController from '../controllers/projects';
import { Router } from 'express';
/**
 * @export
 * @class ProjectsRouter
 */
export default class ProjectsRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    /**
     * @memberof ProjectsRouter
     */
    public routes(): void {
        this.router.get('/', ProjectController.getAllProjects);
        this.router.post('/', ProjectController.getProject);
        this.router.put('/:_id', ProjectController.updateProject);
    }
}
