export { Document, Schema } from 'mongoose';
export { Route as route, Controller, Model } from './core';
export { view, response, download } from './core/responses';
import { Ajax, Auth, Locale } from './middleware';
export declare const middleware: {
    ajax: typeof Ajax;
    auth: typeof Auth;
    locale: typeof Locale;
};
export declare const run: (projectRoot: string, appRoot: string) => void;
