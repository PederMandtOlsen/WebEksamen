import axios from "axios";
import type { IAthlete } from "../interfaces/IAthlete";
import type { IDefaultResponse, IAthletesResponse, IAthleteResponse } from "../interfaces/ResponseInterfaces";

const endpoint = "http://localhost:5180/api/athlete";

const getAllAthletes = async () : Promise<IAthletesResponse> => {
    try {
        const response = await axios.get(endpoint);
        return {
            success: true,
            data: response.data
        }
        
    } catch {
        return {
            success: false,
            data: null
        }
    }
}

const getAthleteById = async (id: number) : Promise<IAthleteResponse> => {
    try {
        const response = await axios.get(`${endpoint}/${id}`);
        return {
            success: true,
            data: response.data
        }
        
    } catch {
        return {
            success: false,
            data: null
        }
    }
}

const searchByName = async (name: string) : Promise<IAthletesResponse> => {
    try {

        const response = await axios.get(`${endpoint}/get-by-name/${name}`);
        return {
            success: true,
            data: response.data 
        }

    } catch (error) {
        console.error("searchByName failed:", error)
        return {
            success: false,
            data: null
        }
    }
}



const postAthlete = async (athlete: IAthlete) : Promise<IAthleteResponse> => {
    try {
        const response = await axios.post(endpoint, athlete);


        return {
            success: true,
            data: response.data
        }
        
    } catch {
        return {
            success: false,
            data: null
        }
    }
}


const deleteAthlete = async (id: number) : Promise<IDefaultResponse>=> {
    try {
       const response = await axios.delete(`${endpoint}/${id}`)


        return {
            success: true
        }
    } catch {
        return {
            success: false
        }
    }
}

const putAthlete = async (editedAthlete: IAthlete) : Promise<IAthleteResponse> => {
    try {
        const response = await axios.put(`${endpoint}/${editedAthlete.id}`,editedAthlete);

        return {
            success: true,
            data: response.data ?? editedAthlete
        }
        
    } catch {
        return {
            success: false,
            data: null
        }
    }
}

export default {
    getAllAthletes,
    getAthleteById,
    searchByName,
    postAthlete,
    deleteAthlete,
    putAthlete
}