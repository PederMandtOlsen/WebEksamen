import { useState } from "react";
import VenueService from "../../services/VenueService";
import type { IVenue } from "../../interfaces/IVenue";

const VenueSearchById = () => {
    const [id, setId] = useState<number | null> (null)
    const [statusMessage, setStatusMessage] = useState ("")
    const [venue, setVenue] = useState<IVenue | null>(null) 


    const handleSearch = async () => { 

       if (id === null || id <= 0) {
        setStatusMessage("Enter a valid id")
        setVenue(null)
        return
       } 
       
       try {
        const result = await VenueService.getVenueById(id)
        if (!result.success || !result.data) {
            setStatusMessage("No venues matching your search")
            setVenue(null)
        } 

        else {
            setStatusMessage("")
            setVenue(result.data)

        }

       } catch (error) {
         console.error("Venue search failed:", error)
         setStatusMessage("Something went wrong trying to search")
         setVenue(null)
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
                {venue &&
                <ul>
                    <li>Name: {venue?.name}</li>
                    <li>Capacity: {venue?.capacity}</li>
                </ul>
                }
            </div>
        </section>
    )


}

export default VenueSearchById; 