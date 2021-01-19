import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';
import { IServer } from '../interfaces/ServerInterface';
import { renderFile } from 'ejs';
import * as path from 'path';
import {influx} from './connection';
const os = require("os");

/**
 * @export
 * @class Middleware
 */
export default class Middleware {
    /**
     * @static
     * @param {IServer} server
     * @memberof Middleware
     */
    static init(server: IServer): void {
        server.app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
        server.app.use(bodyParser.json({limit: '50mb'}));
        server.app.use(cookieParser());
        server.app.use(compression());
        server.app.use(helmet());
        server.app.use(cors());
        server.app.use('/apidoc', express.static(path.join(__dirname, '../../apidoc')));
        server.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS ');
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With,' +
                ' Content-Type, Accept,' +
                ' Authorization,' +
                ' Access-Control-Allow-Credentials'
            );
            // res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });

    server.app.use((req,res,next) => {
        const start = Date.now();

        res.on("finish", () => {
            const duration = Date.now() - start;
            console.log(`Request to ${req.path} took ${duration}ms`);

            influx
            .writePoints([
                {
                measurement: "response_times",
                tags: { host: os.hostname() },
                fields: { duration, path: req.path },
                },
            ])
            .catch((err) => {
                console.error(`Error saving data to InfluxDB! ${err.stack}`);
            });
        });
        return next();
    })
    }
}
