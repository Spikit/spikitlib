/// <reference types="mongoose" />
import { Document, Schema } from 'mongoose';
import { Model } from '../core/Model';
import { SpikitRequest } from '../interfaces';
export interface UserAuth extends Document {
    email: string;
    password: string;
}
export declare class Auth extends Model<UserAuth> {
    protected collection: string;
    protected name: string;
    protected schema: Schema;
    protected authField: string;
    protected authPassField: string;
    login(auth: any, authPass: string): Promise<UserAuth | null>;
    register(req: SpikitRequest): Promise<UserAuth | null>;
}
