import axios from "axios";
import type { IVenue } from "../interfaces/IVenue";
import type { IDefaultResponse, IVenuesResponse, IVenueResponse } from "../interfaces/ResponseInterfaces";

const endpoint = "http://localhost:5180/api/venue";

const getAllVenues = async (): Promise<IVenuesResponse> => {
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

const getVenueById = async (id: number): Promise<IVenueResponse> => {
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

const searchByName = async (name: string): Promise<IVenuesResponse> => {
    try {

        const response = await axios.get(`${endpoint}/get-by-name/${name}`); // nevne hvor jeg fant encodeURICOmp
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



const postVenue = async (venue: IVenue): Promise<IVenueResponse> => {
    try {
        const response = await axios.post(endpoint, venue);

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


const deleteVenue = async (id: number): Promise<IDefaultResponse> => {
    try {
        await axios.delete(`${endpoint}/${id}`)

        return {
            success: true
        }
    } catch {
        return {
            success: false
        }
    }
}

const putVenue = async (editedVenue: IVenue): Promise<IVenueResponse> => {
    try {
        const response = await axios.put(`${endpoint}/${editedVenue.id}`, editedVenue);

        return {
            success: true,
            data: response.data ?? editedVenue
        }

    } catch {
        return {
            success: false,
            data: null
        }
    }
}

export default {
    getAllVenues,
    getVenueById,
    searchByName,
    postVenue,
    deleteVenue,
    putVenue
}