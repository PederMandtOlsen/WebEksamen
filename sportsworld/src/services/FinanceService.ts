import axios from "axios";
import type { IFinanceResponse } from "../interfaces/ResponseInterfaces";

const endpoint = "http://localhost:5180/api/finance";

const getFinancialSituation = async (): Promise<IFinanceResponse> => {
    try {
        const response = await axios.get(endpoint);
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        console.error("Error fetching financial situation:", error);
        return {
            success: false,
            data: null
        };
    }
}

const addLoan = async (amount: number): Promise<IFinanceResponse> => {
    try {
        const response = await axios.post(`${endpoint}/add-loan/${amount}`);
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        console.error("Error adding loan:", error);
        return {
            success: false,
            data: null
        };
    }
}

const purchaseAthlete = async (athleteId: number): Promise<IFinanceResponse> => {
    try {
        const response = await axios.post(`${endpoint}/purchase-athlete/${athleteId}`);
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        console.error("Purchase failed:", error);
        return {
            success: false,
            data: null
        };
    }
}

export { getFinancialSituation, addLoan, purchaseAthlete };
