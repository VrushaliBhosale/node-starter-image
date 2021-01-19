import { InfluxDB } from 'influx';
import * as mongoose from 'mongoose';
import { default as config } from '../env/index';
const Influx = require("influx");

/**
 * @interface IConnectOptions
 */
interface IConnectOptions {
    autoReconnect: boolean;
    reconnectTries: number; // Never stop trying to reconnect
    reconnectInterval: number;
    loggerLevel?: string;
}
const connectOptions: IConnectOptions = {
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
};

const MONGO_URI: string = `${config.envConfig.database.MONGODB_URI}${config.envConfig.database.MONGODB_DB_MAIN}`;

export const db: mongoose.Connection = mongoose.createConnection("mongodb://mongo:27017/f_meter_db", connectOptions);
console.log("db string is :",MONGO_URI);
export const influx: InfluxDB = new Influx.InfluxDB({
    host: "influxdb",
    database: "express_response_db",
    schema: [
      {
        measurement: "response_times",
        fields: {
          path: Influx.FieldType.STRING,
          duration: Influx.FieldType.INTEGER,
        },
        tags: ["host"],
      },
    ],
  });

  influx
  .getDatabaseNames()
  .then((names) => {
    if (!names.includes("express_response_db")) {
      return influx.createDatabase("express_response_db");
    }
  })
  .then(() => {
    console.log("influx database exits..");
  })
  .catch((err) => {
    console.error(`Error creating Influx database!`);
  });

// handlers
db.on('connecting', () => {
    console.log('\x1b[32m', 'MongoDB :: connecting');
});

db.on('error', (error) => {
    console.log('\x1b[31m', `MongoDB :: connection ${error}`);
    mongoose.disconnect();
});

db.on('connected', () => {
    console.log('\x1b[32m', 'MongoDB :: connected');
});

db.once('open', () => {
    console.log('\x1b[32m', 'MongoDB :: connection opened');
});

db.on('reconnected', () => {
    // console.log('\x1b[33m"', 'MongoDB :: reconnected');
});

db.on('reconnectFailed', () => {
    console.log('\x1b[31m', 'MongoDB :: reconnectFailed');
});

db.on('disconnected', () => {
    console.log('\x1b[31m', 'MongoDB :: disconnected');
});

db.on('fullsetup', () => {
    console.log('\x1b[33m"', 'MongoDB :: reconnecting... %d');
});
