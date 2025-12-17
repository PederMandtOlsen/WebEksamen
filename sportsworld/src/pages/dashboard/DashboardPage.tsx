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

  const unpurchasedAthletes = athleteContext.athletes.filter(
    athlete => !athlete.purchasedStatus
  );

  return (
    <>
      <header className="text-center py-8">
        <h2 className="text-4xl font-bold">
          Dashboard for finances and purchase
        </h2>
      </header>

      {financeContext.message && (
        <div className="px-8 mb-4 flex items-center gap-2">
          <p>{financeContext.message}</p>
          <button
            onClick={() => financeContext.setMessage(null)}
            className="text-blue-900"
          >
            ✕
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 px-8">
        <section className="lg:col-span-1 flex flex-col gap-6">
          <FinancialSituation finance={financeContext.finance} />
          <LoanSection onAddLoan={financeContext.addLoan} />
        </section>

        <section className="lg:col-span-3">
          <PurchaseSection
            unpurchasedAthletes={unpurchasedAthletes}
            onPurchaseAthlete={handlePurchase}
          />
        </section>
      </div>
    </>
  );
};

export default DashboardPage;
