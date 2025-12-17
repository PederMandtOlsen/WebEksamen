import type { IVenue } from "./IVenue";
import type { IDefaultResponse } from "./ResponseInterfaces";


export interface IVenueContext {
    venues: IVenue[]
    getVenueQuantity: () => number
    addVenue: (newVenue: IVenue) => Promise<IDefaultResponse>
    deleteVenue: (id: number) => Promise<IDefaultResponse>
    updateVenue: (venue: IVenue) => Promise<IDefaultResponse>
    refreshVenues: () => Promise<void>
}