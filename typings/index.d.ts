export { Document, Schema } from 'mongoose';
export { Route as route, Controller, Model, Password, Auth } from './core';
export { view, response, download } from './core/responses';
export { SpikitRequest as Request } from './interfaces';
import { Ajax, Auth, Locale, UserAuth } from './middleware';
export declare const middleware: {
    ajax: typeof Ajax;
    auth: typeof Auth;
    locale: typeof Locale;
    userAuth: typeof UserAuth;
};
export declare const run: (projectRoot: string, appRoot: string) => void;
