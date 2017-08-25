export declare class Translation {
    private locale;
    constructor(locale: string);
    get(key: string, fallback?: string): any;
}
