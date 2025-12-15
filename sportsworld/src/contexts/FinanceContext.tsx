import { useState, useEffect, createContext, type ReactNode, useContext } from "react";
import type { IFinance } from "../interfaces/IFinance";
import type { IFinanceContext } from "../interfaces/IFinanceContext";
import * as FinanceService from "../services/FinanceService";
import { AthleteContext } from "./AthleteContext"; 



export const FinanceContext = createContext<IFinanceContext | null>(null);

interface Props {
    children: ReactNode;
}

export const FinanceProvider = ({ children }: Props) => {
    const [finance, setFinance] = useState<IFinance | null>(null);
    const athleteContext = useContext(AthleteContext);

    useEffect(() => {
        loadFinance();
    }, []);

    const loadFinance = async () => {
        try {
            const response = await FinanceService.getFinancialSituation();
            if (response.success) {
                setFinance(response.data);
            }
        } catch (error) {
            console.error("Error fetching finance:", error);
        }
    };

    const addLoan = async (amount: number): Promise<void> => {
        try {
            await FinanceService.addLoan(amount);
            loadFinance();
        } catch (error) {
            console.error("Error adding loan:", error);
        }
    };

    const purchaseAthlete = async (athleteId: number): Promise<void> => {
        try {
            await FinanceService.purchaseAthlete(athleteId);
            loadFinance();
            if (athleteContext?.refreshAthletes) {
                await athleteContext.refreshAthletes();
            }
        } catch (error) {
            console.error("Error purchasing athlete:", error);
        }
    };

    return (
        <FinanceContext.Provider value={{
            finance,
            loadFinance,
            addLoan,
            purchaseAthlete
        }}>
            {children}
        </FinanceContext.Provider>
    );
};
