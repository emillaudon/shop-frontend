export type AppErrorKind = 
    | 'Network'
    | 'Unauthorized'
    | 'Forbidden'
    | 'NotFound'
    | 'Conflict'
    | 'Validation'
    | 'Server'
    | 'Unknown';

export interface AppError {
    kind: AppErrorKind;
    status: number | null;
    message: string;
    code?: string;
    details?: Record<string, unknown>;
    fieldErrors?: Record<string, string>;
    cause?: unknown;
}

export interface BackendErrorDto {
    error?: string;
    message?: string;
    fieldErrors?: Record<string, unknown>;
}