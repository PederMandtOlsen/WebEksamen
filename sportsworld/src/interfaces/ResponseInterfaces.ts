import type { IAthlete } from "./IAthlete";
import type { IFinance } from "./IFinance";

export interface IDefaultResponse {
    success: boolean
}

export interface IAthletesResponse {
    success: boolean
    data: IAthlete [] | null
}

export interface IAthleteResponse {
    success: boolean
    data: IAthlete | null
}

export interface IFinanceResponse {
    success: boolean
    data: IFinance | null
}