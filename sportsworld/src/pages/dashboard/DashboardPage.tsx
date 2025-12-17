import { useContext } from "react";
import { FinanceContext } from "../../contexts/FinanceContext";
import { AthleteContext } from "../../contexts/AthleteContext";
import FinancialSituation from "../../components/dashboard/FinancialSituation";
import LoanSection from "../../components/dashboard/LoanSection";
import PurchaseSection from "../../components/dashboard/PurchaseSection";

const DashboardPage = () => {
    const financeContext = useContext(FinanceContext);
    const athleteContext = useContext(AthleteContext);

    if (!financeContext || !athleteContext) return null;

    const handlePurchase = async (athleteId: number) => {
        await financeContext.purchaseAthlete(athleteId);
        await athleteContext.refreshAthletes();
    };

    const unpurchasedAthletes = athleteContext.athletes.filter(athlete => !athlete.purchasedStatus);

    return (
        <>
            <header>
                <h2 className="text-4xl p-8 mb-8 flex flex-col items-center">Dashboard for finances and purchase</h2>
            </header>
            {financeContext.message && (
                <div>
                    {financeContext.message}
                    <button 
                        onClick={() => financeContext.setMessage(null)} 
                        className="ml-4 text-blue-900"
                    >
                    </button>
                </div>
            )}
            <div className="flex gap-6 px-8">
                <section className="w-1/4 flex flex-col gap-6">
                    <FinancialSituation finance={financeContext.finance} />
                    <LoanSection onAddLoan={financeContext.addLoan} />
                </section>
                <section className="w-3/4">
                    <PurchaseSection 
                        unpurchasedAthletes={unpurchasedAthletes}
                        onPurchaseAthlete={handlePurchase} 
                    />
                </section>
            </div>
        </>
    );
}

export default DashboardPage