import 'dotenv/config';
import { Sequelize, ModelAttributes, Model } from 'sequelize';
import { ConnectionOptions } from 'tls';

const db_writer_connection_string = process.env.DB_WRITER_CONNECTION as string
const db_writer_connection : ConnectionOptions = JSON.parse(db_writer_connection_string);

const db_reader_connection_string = process.env.DB_READER_CONNECTIONS as string
const db_reader_connections : ConnectionOptions[] = JSON.parse(db_reader_connection_string);

class SearedDatabase {
    declare instance: Sequelize;

    constructor() {
        this.instance = new Sequelize(
            'seared_db', '', '', {
                dialect: 'postgres',
                port: 5432,
                replication: {
                    read: db_reader_connections,
                    write: db_writer_connection
                },
                pool: {
                    max: 20,
                    idle: 30000,
                }
            }
        );
        
        this.instance
        .sync({
            logging: console.log
        })
        .then(() => {
            console.log('Connection to database established successfully.');
        }).catch(err => {
            console.error(`Unable to connect to the database. Error: ${err}`);
        });
    }

    define(name: string, schema: ModelAttributes<Model<any, any>>){
        return this.instance.define(name, schema);
    }
};

export default SearedDatabase;