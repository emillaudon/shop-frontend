import { AppError } from "../../core/http/models/app-error";

export interface Vm<T> {
    loading: boolean;
    data?: T;
    error?: AppError;
};