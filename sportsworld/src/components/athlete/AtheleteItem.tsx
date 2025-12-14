import { useContext } from "react";
import { AthleteContext } from "../../contexts/AthleteContext";
import type { IAthlete } from "../../interfaces/IAthlete";
import type { IAthleteContext } from "../../interfaces/IAthleteContext";
import imagePlaceholder from  "../../assets/images/placeholder.png";



const AthleteItem = ({athlete}: {athlete: IAthlete}) => {

const {deleteAthlete} = useContext(AthleteContext) as IAthleteContext

const handleDelete = async () => {
    await deleteAthlete(athlete.id!)
}

    return (
        <article>
            <img 
            src={athlete.image} 
            alt={athlete.name}
            className="h-40 w-40 shadow-ms"
            onError={(e) => {
                e.currentTarget.src = imagePlaceholder
            }}
            />
            <h3> {athlete.name} {athlete.id}</h3>
            <p>Gender: {athlete.gender}</p>
            <p>Price: {athlete.price}</p>
            <p>{athlete.purchasedStatus === true ? "Purchased" : "Not purchased"}</p> 
            <button>Edit</button>
            <button onClick={handleDelete}>Delete Athlete</button>
        </article>
    )
} 

export default AthleteItem