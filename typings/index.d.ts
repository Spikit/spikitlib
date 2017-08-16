import { AppOptions } from './interfaces';
export { view, response, Route as route } from './core';
export * from './middleware';
export declare const init: (options: AppOptions) => void;
export declare const start: () => void;
