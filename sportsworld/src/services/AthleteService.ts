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

const getAthleteById = async (id: number) : Promise<IAthletesResponse> => {
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



const postAthlete = async (athlete: IAthlete) : Promise<IAthleteResponse> => {
    try {
        const response = await axios.post(endpoint, athlete);

        console.log(response) 

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

/*
const putAthlete = async () : Promise<IAthleteResponse> => {
    const response = await axios.put()
} */

const deleteAthlete = async (id: number) : Promise<IDefaultResponse>=> {
    try {
       const response = await axios.delete(`${endpoint}/${id}`)

        console.log(response)

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
        const response = await axios.put(endpoint, editedAthlete);

        console.log(response) 

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

export default {
    getAllAthletes,
    getAthleteById,
    postAthlete,
    deleteAthlete,
    putAthlete
}