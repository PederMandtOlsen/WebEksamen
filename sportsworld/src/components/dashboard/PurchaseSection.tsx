import type { IAthlete } from "../../interfaces/IAthlete";
import AthleteService from "../../services/AthleteService";
import imagePlaceholder from "../../assets/images/placeholder.png";

interface PurchaseSectionProps {
    unpurchasedAthletes: IAthlete[];
    onPurchaseAthlete: (athleteId: number) => Promise<void>;
}

const PurchaseSection = ({ unpurchasedAthletes, onPurchaseAthlete }: PurchaseSectionProps) => {
    return (
        <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Purchase Athletes</h2>

            <ul className="grid-container">
                {unpurchasedAthletes.map((athlete) => (
                    <li key={athlete.id} className="grid-container__item">
                        <img
                            src={AthleteService.getImageEndpoint() + athlete.image}
                            alt={athlete.name}
                            className="img-styling"
                            onError={(e) => (e.currentTarget.src = imagePlaceholder)}
                        />

                        <h3>{athlete.name}</h3>
                        <p>{athlete.gender} – ${athlete.price}</p>

                        <button
                            onClick={() => onPurchaseAthlete(athlete.id!)}
                            className="btn bg-green-400"
                        >
                            Purchase
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default PurchaseSection;
