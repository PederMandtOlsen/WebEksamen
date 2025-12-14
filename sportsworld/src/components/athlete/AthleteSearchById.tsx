import { useState } from "react";
import AthleteService from "../../services/AthleteService";
import type { IAthlete } from "../../interfaces/IAthlete";

const AthleteSearchById = () => {
    const [id, setId] = useState<number | null> (null)
    const [statusMessage, setStatusMessage] = useState ("")
    const [athlete, setAthlete] = useState<IAthlete | null>(null) 


    const handleSearch = async () => { 

       if (id === null || id <= 0) {
        setStatusMessage("Enter a valid id")
        setAthlete(null)
        return
       } 
       
       try {
        const result = await AthleteService.getAthleteById(id)
        if (!result.success || !result.data) {
            setStatusMessage("No athletes matching your search")
            setAthlete(null)
        } 

        else {
            setStatusMessage("")
            setAthlete(result.data)

        }

       } catch (e) {
        console.log(e)
       }
    }

    return (
      <section>
            <div>
                <input 
                type="number" 
                placeholder="Search by ID" 
                onChange={(e) => setId(Number(e.target.value))}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div>
                <p>{statusMessage}</p>
                {athlete &&
                <ul>
                    <li>Name: {athlete?.name}</li>
                    <li>Gender: {athlete?.gender}</li>
                    <li>Price: {athlete?.price}</li>
                    <li>Purchase status: {athlete?.purchasedStatus}</li>
                </ul>
                }
            </div>
        </section>
    )


}

export default AthleteSearchById; 