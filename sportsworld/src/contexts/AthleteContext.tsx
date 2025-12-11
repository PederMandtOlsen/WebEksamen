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
    console.log("Response fra AthleteService:", response);

    if (response.success === true && response.data != null) {
        console.log("Data fra API:", response.data);
        setAthletes(response.data);
    } else {
        console.warn("Klarte ikke å hente atleter");
    }
};


    const getAthleteQuantity = () : number => {
        return athletes.length;
    }

    const saveAthlete = async (newAthlete: IAthlete) : Promise<IDefaultResponse> => {

        const response = await AthleteService.postAthlete(newAthlete);

        if(response.success === true && response.data != null) {
            
            const newAthleteWithId : IAthlete = response.data; 

            setAthletes(
                prev => [newAthleteWithId, ...prev] 
            );
        } 

        return response

    }
        return (
            <AthleteContext.Provider value =  {{
                athletes,
                getAthleteQuantity,
                saveAthlete
            }}> 
            {children}
        </AthleteContext.Provider>
        )

}

