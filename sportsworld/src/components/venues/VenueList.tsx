import { useContext } from "react";
import VenueItem from "./VenueItem";
import type { IVenueContext } from "../../interfaces/IVenueContext";
import { VenueContext } from "../../contexts/VenueContext";


const VenueList = () => {

    const {venues} = useContext(VenueContext) as IVenueContext

    const getVenueJSX = () => {
        const venueJSX = venues.map( (venue, index) => {
            return (
                <VenueItem
                key={"venue" + index}
                venue={venue}
                /> 
            ) 
        }); 
        return venueJSX;
    }

    return (
        <section className="mx-auto max-w-6xl p-6">
             <section className="
        grid gap-8
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        ">
                {getVenueJSX()}
            </section>
        </section>
    )

}

export default VenueList;