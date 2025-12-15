import type { IAthlete } from "../../interfaces/IAthlete";

interface PurchaseSectionProps {
    unpurchasedAthletes: IAthlete[];
    onPurchaseAthlete: (athleteId: number) => Promise<void>;
}

const PurchaseSection = ({ unpurchasedAthletes, onPurchaseAthlete }: PurchaseSectionProps) => {
    return (
        <section>
            <h2>Purchase Athletes</h2>
            {unpurchasedAthletes.length === 0 ? (
                <p>All athletes have been purchased!</p>
            ) : (
                <div>
                    {unpurchasedAthletes.map((athlete) => (
                        <div key={athlete.id}>
                            <img src={athlete.image} alt={athlete.name} />
                            <p>{athlete.name} - {athlete.gender} - ${athlete.price}</p>
                            <button onClick={() => onPurchaseAthlete(athlete.id!)}>Purchase</button>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default PurchaseSection;
