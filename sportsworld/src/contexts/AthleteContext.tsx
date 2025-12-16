import { useState, useEffect, createContext, type ReactNode } from "react";
import type { IAthlete } from "../interfaces/IAthlete";
import type { IAthleteContext } from "../interfaces/IAthleteContext";
import AthleteService from "../services/AthleteService";
import type { IDefaultResponse } from "../interfaces/ResponseInterfaces";


// gå over litt kode her

export const AthleteContext = createContext<IAthleteContext | null>(null)


interface Props {children: ReactNode}


export const AthleteProvider = ({children} : Props) => {

    const [athletes, setAthletes] = useState<IAthlete[]>([])

    useEffect( () => {
        setAthletesFromService(); 

    }, [] ); //Hindrer http spam


    const setAthletesFromService = async () => {
    const response = await AthleteService.getAllAthletes();

    if (response.success === true && response.data != null) {
        setAthletes(response.data);

    } else {
        console.warn("Klarte ikke å hente atleter");
    }
};


    const getAthleteQuantity = () : number => {
        return athletes.length;
    }

    const addAthlete = async (newAthlete: IAthlete) : Promise<IDefaultResponse> => {

        const response = await AthleteService.postAthlete(newAthlete);

        if(response.success === true && response.data != null) {
            
            const newAthleteWithId : IAthlete = response.data; 

            setAthletes(
                prev => [newAthleteWithId, ...prev] 
            );
        } 

        return response

    };


    const deleteAthlete = async (id: number): Promise<IDefaultResponse> => {
        const response = await AthleteService.deleteAthlete(id);

        if(response.success === true) {
            setAthletes(prev => prev.filter(athlete => athlete.id !== id))
        }

        return response
    };

    const updateAthlete = async (updated: IAthlete): Promise<IDefaultResponse> => {
        const response = await AthleteService.putAthlete(updated)

        if(response.success === true) {
            await refreshAthletes()

            /*
            const saved: IAthlete = response.data ?? updated

            setAthletes(prev => 
                prev.map(athlete => athlete.id === saved.id ? saved: athlete ) 
            ) */

            return {success: true}
        }

        return {success: false}
    };
    

    const refreshAthletes = async () => {
        await setAthletesFromService();
    };



        return (
            <AthleteContext.Provider value =  {{
                athletes,
                getAthleteQuantity,
                addAthlete,
                deleteAthlete,
                updateAthlete,
                refreshAthletes
            }}> 
            {children}
        </AthleteContext.Provider>
        )
};
