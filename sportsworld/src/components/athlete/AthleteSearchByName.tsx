import { useState } from "react";
import AthleteService from "../../services/AthleteService";

const AthleteSearchByName = () => {
    const [name, setName] = useState ("")
    const [statusMessage, setStatusMessage] = useState ("")
    const [athletes, setAthletes] = useState<any[]>([])


    const handleSearch = async () => {

       if (!name.trim()) {
        setStatusMessage("Enter atleast one letter")
        setAthletes([])
        return
       } 
       
       try {
        const result = await AthleteService.searchByName(name)
        if (!result.success || !result.data || result.data.length === 0 ) {
            setStatusMessage("No athletes matching your search")
            setAthletes([])
        } 

        else {
            setStatusMessage("")
            setAthletes(result.data)

        }

       } catch (result) {
        console.log("searchResult:", result)
       }
    }

    return (
        <section>
                <input 
                type="text" 
                className="rounded-lg bg-white p-2"
                placeholder="Search by name" 
                onChange={(e) => setName(e.target.value)}
                />
                <button className="border-black rounded-lg p-2.5 m-1 bg-black text-white text-sm" onClick={handleSearch}>Search</button>
            <div>
                <p>{statusMessage}</p>
                <ul>
                    {athletes.map((athlete) => (
                        <div key={athlete.id}>
                            <li>Name: {athlete?.name}</li>
                            <li>Gender: {athlete?.gender}</li>
                            <li>Price: {athlete?.price}</li>
                            <li>Purchase status: {athlete?.purchasedStatus}</li>
                        </div>
                    ) )}
                </ul>
            </div>
        </section>
    )
}

export default AthleteSearchByName