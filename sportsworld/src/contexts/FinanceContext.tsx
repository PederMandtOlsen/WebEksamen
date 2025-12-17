import { useState, useEffect, createContext, type ReactNode } from "react";
import type { IFinance } from "../interfaces/IFinance";
import type { IFinanceContext } from "../interfaces/IFinanceContext";
import * as FinanceService from "../services/FinanceService";

export const FinanceContext = createContext<IFinanceContext | null>(null);

interface Props {
    children: ReactNode;
}

export const FinanceProvider = ({ children }: Props) => {
    const [finance, setFinance] = useState<IFinance | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        loadFinance();
    }, []); //hindrer http spam

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
            const response = await FinanceService.addLoan(amount);
            if (response.success) {
                setMessage(`Loan added: $${amount}`);
                loadFinance();
            }
        } catch (error) {
            console.error("Error adding loan:", error);
            setMessage("En feil oppstod ved lån.");
        }
    };

    const purchaseAthlete = async (athleteId: number): Promise<void> => {
        try {
            const response = await FinanceService.purchaseAthlete(athleteId);
            if (response.success) {
                loadFinance();
            } else {
                setMessage("Not enough money!");
            }
        } catch (error) {
            console.error("Error purchasing athlete:", error);
            setMessage("En feil oppstod ved kjøp.");
        }
    };

    return (
        <FinanceContext.Provider value={{
            finance,
            message,
            setMessage,
            loadFinance,
            addLoan,
            purchaseAthlete
        }}>
            {children}
        </FinanceContext.Provider>
    );
};