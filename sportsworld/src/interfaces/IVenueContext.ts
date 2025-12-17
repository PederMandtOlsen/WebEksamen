import type { IVenue } from "./IVenue";
import type { IDefaultResponse } from "./ResponseInterfaces";


// legge til mer senere
export interface IVenueContext {
    venues: IVenue[]
    getVenueQuantity: () => number
    addVenue: (newVenue: IVenue) => Promise<IDefaultResponse>
    deleteVenue: (id: number) => Promise<IDefaultResponse>
    updateVenue: (venue: IVenue) => Promise<IDefaultResponse>
    refreshVenues: () => Promise<void>
}