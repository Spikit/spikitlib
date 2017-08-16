export declare class Urls {
    static url(path: string): string;
    static route(name: string, ...args: any[]): string;
    private static replaceRouteParams(route, args);
}
