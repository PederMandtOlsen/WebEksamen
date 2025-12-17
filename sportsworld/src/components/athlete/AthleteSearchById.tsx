import { useState } from "react";
import AthleteService from "../../services/AthleteService";
import type { IAthlete } from "../../interfaces/IAthlete";

const AthleteSearchById = () => {
    const [id, setId] = useState<number | null>(null)
    const [statusMessage, setStatusMessage] = useState("")
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

        } catch (error) {
            console.error("Athlete search failed:", error)
            setStatusMessage("Something went wrong trying to search")
            setAthlete(null)
        }
    }

    return (
        <section>
            <input
                type="number"
                className="bg-white rounded-lg p-2"
                placeholder="Search by ID"
                onChange={(e) => setId(Number(e.target.value))}
            />
            <button className="btn" onClick={handleSearch}>Search</button>

            <div>
                <p>{statusMessage}</p>
                {athlete &&
                    <ul>
                        <li>Name: {athlete?.name}</li>
                        <li>Gender: {athlete?.gender}</li>
                        <li>Price: {athlete?.price}</li>
                        <li>Purchase status: {athlete?.purchasedStatus ? "Purchased" : "Not purchased"}</li>
                    </ul>
                }
            </div>
        </section>
    )


}

export default AthleteSearchById; 