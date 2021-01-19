import * as express from 'express';
import {influx} from '../config/connection';
const Influx = require("influx");
const os = require("os");

class InfluxDbData {
  public getData(req: express.Request, res: express.Response, next: express.NextFunction): void {
  influx
    .query(
      `
    select * from response_times
    where host = ${Influx.escape.stringLit(os.hostname())}
    order by time desc
    limit 10
  `
    )
    .then((result) => {
      console.log("res");
      res.json(result);
    })
    .catch((err) => {
      res.status(500).send(err.stack);
    });
  } 
}

export default new InfluxDbData();