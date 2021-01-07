declare interface httpArgument {
    params?: Record<string, any>;// eslint-disable-line @typescript-eslint/no-explicit-any
    data?: Record<string, unknown>;
    headers?: Record<string, string | string[] | undefined>;
}

declare interface exceptionError {
    info: string;
    [key: string]: unknown;
}

declare interface httpException {
    httpInfo: string;
    status: number;
    type?: string;
    error: exceptionError;
}

declare interface apiResult {
    data?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    error?: httpException;
}
