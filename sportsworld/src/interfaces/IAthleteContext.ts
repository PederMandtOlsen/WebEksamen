import type { IAthlete } from "./IAthlete";
import type { IDefaultResponse } from "./ResponseInterfaces";


export interface IAthleteContext {
    athletes: IAthlete[]
    getAthleteQuantity: () => number
    addAthlete: (newAthlete: IAthlete) => Promise<IDefaultResponse>
    deleteAthlete: (id: number) => Promise<IDefaultResponse>
    updateAthlete: (athlete: IAthlete) => Promise<IDefaultResponse>
    refreshAthletes: () => Promise<void>
}
