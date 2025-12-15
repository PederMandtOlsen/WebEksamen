import type { IFinance } from "../../interfaces/IFinance";

interface FinancialSituationProps {
    finance: IFinance | null;
}

const FinancialSituation = ({ finance }: FinancialSituationProps) => {
    if (!finance) return null;

    return (
        <section>
            <h2>Financial Situation</h2>
            <div>
                <p>Money Left: ${finance.moneyLeft}</p>
                <p>Athletes Purchased: {finance.numberOfPurchases}</p>
                <p>Total Spending: ${finance.moneySpent}</p>
            </div>
        </section>
    );
};

export default FinancialSituation;
