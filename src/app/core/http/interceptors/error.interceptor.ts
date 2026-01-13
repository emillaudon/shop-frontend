import { HttpInterceptorFn, HttpErrorResponse } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { httpErrorToAppError } from "../mappers/http-error.mapper";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req).pipe(
        catchError((err: unknown) => {
            const httpErr = err as HttpErrorResponse;
            const appError = httpErrorToAppError(httpErr);

            console.error('[HTTP]', req.method, req.url, appError);

            return throwError(() => appError);
        })
    );
}