import type { IFinance } from "./IFinance";

export interface IFinanceContext {
    finance: IFinance | null
    message: string | null
    setMessage: (message: string | null) => void
    loadFinance: () => Promise<void>
    addLoan: (amount: number) => Promise<void>
    purchaseAthlete: (athleteId: number) => Promise<void>
}