import type { IFinance } from "../../interfaces/IFinance";

interface FinancialSituationProps {
    finance: IFinance | null;
}

const FinancialSituation = ({ finance }: FinancialSituationProps) => {
    if (!finance) return null;

    return (
        <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Financial Situation</h2>
            <div className="flex flex-col gap-2">
                <p className="text-lg"><span className="font-semibold">Money Left:</span> ${finance.moneyLeft}</p>
                <p className="text-lg"><span className="font-semibold">Athletes Purchased:</span> {finance.numberOfPurchases}</p>
                <p className="text-lg"><span className="font-semibold">Total Spending:</span> ${finance.moneySpent}</p>
            </div>
        </section>
    );
};

export default FinancialSituation;