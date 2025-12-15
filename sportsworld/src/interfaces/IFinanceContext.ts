import type { IFinance } from "./IFinance";

export interface IFinanceContext {
    finance: IFinance | null
    loadFinance: () => Promise<void>
    addLoan: (amount: number) => Promise<void>
    purchaseAthlete: (athleteId: number) => Promise<void>
}
