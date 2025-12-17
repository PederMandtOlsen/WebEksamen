import { useState, useEffect, createContext, type ReactNode } from "react";
import type { IVenue } from "../interfaces/IVenue";
import type { IVenueContext } from "../interfaces/IVenueContext";
import VenueService from "../services/VenueService";
import type { IDefaultResponse } from "../interfaces/ResponseInterfaces";



export const VenueContext = createContext<IVenueContext | null>(null)


interface Props { children: ReactNode }


export const VenueProvider = ({ children }: Props) => {

    const [venues, setVenues] = useState<IVenue[]>([])

    useEffect(() => {
        setVenuesFromService();

    }, []); //Hindrer http spam


    const setVenuesFromService = async () => {
        const response = await VenueService.getAllVenues();

        if (response.success === true && response.data != null) {
            setVenues(response.data);
        } else {
            console.warn("Couldnt get venues");
        }
    };


    const getVenueQuantity = (): number => {
        return venues.length;
    }

    const addVenue = async (newVenue: IVenue): Promise<IDefaultResponse> => {

        const response = await VenueService.postVenue(newVenue);

        if (response.success === true && response.data != null) {

            const newVenueWithId: IVenue = response.data;

            setVenues(
                prev => [newVenueWithId, ...prev]
            );
        }

        return response

    }


    const deleteVenue = async (id: number): Promise<IDefaultResponse> => {
        const response = await VenueService.deleteVenue(id);

        if (response.success === true) {
            setVenues(prev => prev.filter(venue => venue.id !== id))
        }

        return response
    }

    const updateVenue = async (updated: IVenue): Promise<IDefaultResponse> => {
        const response = await VenueService.putVenue(updated)

        if (response.success === true) {
            await refreshVenues();

            return { success: true }
        }

        return { success: false }
    };

    const refreshVenues = async () => {
        await setVenuesFromService();

    };



    return (
        <VenueContext.Provider value={{
            venues,
            getVenueQuantity,
            addVenue,
            deleteVenue,
            updateVenue,
            refreshVenues

        }}>
            {children}
        </VenueContext.Provider>
    )
}

