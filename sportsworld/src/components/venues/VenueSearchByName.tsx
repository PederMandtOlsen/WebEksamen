import { useState } from "react";
import VenueService from "../../services/VenueService";
import type { IVenue } from "../../interfaces/IVenue";

const VenueSearchByName = () => {
    const [name, setName] = useState ("")
    const [statusMessage, setStatusMessage] = useState ("")
    const [venues, setVenues] = useState<IVenue[]>([])


    const handleSearch = async () => {

       if (!name.trim()) {
        setStatusMessage("Enter atleast one letter")
        setVenues([])
        return
       } 
       
       try {
        const result = await VenueService.searchByName(name)
        if (!result.success || !result.data || result.data.length === 0 ) {
            setStatusMessage("No Venues matching your search")
            setVenues([])
        } 

        else {
            setStatusMessage("")
            setVenues(result.data)

        }

       } catch (error) {
         console.error("Venue search failed:", error)
         setStatusMessage("Something went wrong trying to search")
         setVenues([])
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
                <button className="btn" onClick={handleSearch}>Search</button>
            <div>
                <p>{statusMessage}</p>
                <ul>
                    {venues.map((venue) => (
                        <div key={venue.id}>
                            <li>Name: {venue?.name}</li>
                            <li>Capacity: {venue?.capacity}</li>
                        </div>
                    ) )}
                </ul>
            </div>
        </section>
    )
}

export default VenueSearchByName