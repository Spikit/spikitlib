export declare class Password {
    static hash(password: string): string;
    static verify(password: string, hash: string): boolean;
}
