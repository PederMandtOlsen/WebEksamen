import { useContext } from "react";
import VenueItem from "./VenueItem";
import type { IVenueContext } from "../../interfaces/IVenueContext";
import { VenueContext } from "../../contexts/VenueContext";


const VenueList = ({ allowEdit = false }: { allowEdit?: boolean; }) => {

    const { venues } = useContext(VenueContext) as IVenueContext


    const getVenueJSX = () => {
        const venueJSX = venues.map((venue) => {
            return (
                <VenueItem
                    key={venue.id}
                    venue={venue}
                    allowEdit={allowEdit}
                />
            )
        });
        return venueJSX;
    };

    if (venues.length === 0) {
        return (
            <p className="text-center">No venues available</p>
        )
    }

    return (
        <section className=" grid-container">
            {getVenueJSX()}
        </section>
    )
}

export default VenueList;