import InfluxDbData from '../controllers/influxData';
import { Router } from 'express';
/**
 * @export
 * @class ProjectsRouter
 */
export default class InfluxDataRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    /**
     * @memberof InfluxDataRouter
     */
    public routes(): void {
        this.router.get('/', InfluxDbData.getData);
    }
}
