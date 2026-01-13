import { HttpErrorResponse } from "@angular/common/http";
import { AppError, AppErrorKind, BackendErrorDto } from "../models/app-error";

export function httpErrorToAppError(err: HttpErrorResponse): AppError {
    if (isNetworkError(err)) {
        return { 
            kind: 'Network', 
            status: 0, 
            message: 'Network error(status 0): backend unreachable',
            cause: err
         };
    } 
    
    const backendError = extractBackendError(err.error);
    const kind = extractKind(err.status, backendError?.error);

    const raw = backendError?.fieldErrors;
    const code = backendError?.error;

    const fieldErrors = 
        code === 'VALIDATION_ERROR' ? toFieldErrors(raw) : undefined;

    const details = 
        code && code !== 'VALIDATION_ERROR' ? toDetails(raw) : undefined;

    return {
        kind,
        status: err.status ?? null,
        message: backendError?.message ?? err.message ?? 'Unknown error',
        code: backendError?.error,
        fieldErrors,
        details,
        cause: err,
  };
}

function isNetworkError(err: HttpErrorResponse): boolean {
    return err.status === 0;
}

function extractBackendError(error: unknown): BackendErrorDto | null {
    if(error === null || typeof error !== 'object') {
        return null;
    }

    const maybeDto = error as Record<string, unknown>;

    if ('error' in maybeDto || 'message' in maybeDto) {
        return {
            error: typeof maybeDto['error'] === 'string' ? maybeDto['error'] : undefined,
            message: typeof maybeDto['message'] === 'string' ? maybeDto['message'] : undefined,
            fieldErrors: 
                (typeof maybeDto['fieldErrors'] === 'object' && maybeDto['fieldErrors'] !== null)
            ? maybeDto['fieldErrors'] as Record<string, unknown>
            : undefined
        }
    }

    return null;
}

function extractKind(status: number | null, code?: string): AppErrorKind {
    if (status === 0) return 'Network';

    if (code === 'VALIDATION_ERROR') return 'Validation';

    switch (status) {
        case 401:
            return 'Unauthorized';
        case 403:
            return 'Forbidden';
        case 404:
            return 'NotFound';
        case 409:
            return 'Conflict';
        case 422: 
            return 'Validation';
        default:
            if (status !== null && status >= 500) {
                return 'Server';
            }
        return 'Unknown';
    }
}

function toDetails(input?: Record<string, unknown>): Record<string, unknown> | undefined {
        if (!input) return undefined;
        return input;
}

    function toFieldErrors(input?: Record<string, unknown>): Record<string, string> | undefined {
        if (!input) return undefined;

        const out: Record<string, string> = {};

        for (const [key, value] of Object.entries(input)) {
            out[key] = value == null ? '' : String(value);
        }
        return out;
}