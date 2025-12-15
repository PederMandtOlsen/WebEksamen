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
        <div>
            <header>
                <h1>Dashboard for finances and purchase</h1>
                {financeContext.finance && (
                    <h2>Available Money: ${financeContext.finance.moneyLeft}</h2>
                )}
            </header>
            
            <main>
                <FinancialSituation finance={financeContext.finance} />
                <LoanSection onAddLoan={financeContext.addLoan} />
                <PurchaseSection 
                    unpurchasedAthletes={unpurchasedAthletes}
                    onPurchaseAthlete={handlePurchase}
                />
            </main>
        </div>
    );
}

export default DashboardPage