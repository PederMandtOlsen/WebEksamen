import type { IAthlete } from "../../interfaces/IAthlete";

const AthleteItem = ({athlete}: {athlete: IAthlete}) => {
    return (
        <article>
            <h3> {athlete.name} {athlete.id}</h3>
            <p>Gender: {athlete.gender}</p>
            <p>Price: {athlete.price}</p>
            <p>{athlete.purchasedStatus ? "Purchased" : "Not purchased"}</p> 
        </article>
    )
} //purchasestatus litt sus?

export default AthleteItem