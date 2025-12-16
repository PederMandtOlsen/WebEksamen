import { useState, useEffect, createContext, type ReactNode } from "react";
import type { IVenue } from "../interfaces/IVenue";
import type { IVenueContext } from "../interfaces/IVenueContext";
import VenueService from "../services/VenueService";
import type { IDefaultResponse } from "../interfaces/ResponseInterfaces";


// gå over litt kode her

export const VenueContext = createContext<IVenueContext | null>(null)


interface Props {children: ReactNode}


export const VenueProvider = ({children} : Props) => {

    const [venues, setVenues] = useState<IVenue[]>([])

    useEffect( () => {
        setVenuesFromService(); 

    }, [] ); //Hindrer http spam


    const setVenuesFromService = async () => {
    const response = await VenueService.getAllVenues();
    console.log("Response from VenueService:", response);

    if (response.success === true && response.data != null) {
        console.log("Data from API:", response.data);
        setVenues(response.data);
    } else {
        console.warn("Couldnt get athletes");
    }
};


    const getVenueQuantity = () : number => {
        return venues.length;
    }

    const addVenue = async (newVenue: IVenue) : Promise<IDefaultResponse> => {

        const response = await VenueService.postVenue(newVenue);

        if(response.success === true && response.data != null) {
            
            const newVenueWithId : IVenue = response.data; 

            setVenues(
                prev => [newVenueWithId, ...prev] 
            );
        } 

        return response

    }


    const deleteVenue = async (id: number): Promise<IDefaultResponse> => {
        const response = await VenueService.deleteVenue(id);

        if(response.success === true) {
            setVenues(prev => prev.filter(venue => venue.id !== id))
        }

        return response
    }

    const updateVenue = async (updated: IVenue): Promise<IDefaultResponse> => {
            const response = await VenueService.putVenue(updated)
    
            if(response.success === true) {
                const saved: IVenue = response.data ?? updated
    
                setVenues(prev => 
                    prev.map(venue => venue.id === saved.id ? saved: venue ) 
                )
    
                return {success: true}
            }
    
            return {success: false}
        };


        return (
            <VenueContext.Provider value =  {{
                venues,
                getVenueQuantity,
                addVenue,
                deleteVenue,
                updateVenue
            }}> 
            {children}
        </VenueContext.Provider>
        )
}

