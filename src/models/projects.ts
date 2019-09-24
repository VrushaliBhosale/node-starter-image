import * as connections from '../config/connection';
import { Schema, Document } from 'mongoose';

/**
 * @export
 * @interface Projects
 * @extends {Document}
 */
export interface Projects extends Document {
    createdAt ? : Date;
    updatedAt ? : Date;
    title: string;
    reports: Array<Object>;
}

const ProjectSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    reports: [],
}, {
    collection: 'Projects',
    versionKey: false,
    timestamps: true
});

export default connections.db.model < Projects >('ProjectModel', ProjectSchema);
