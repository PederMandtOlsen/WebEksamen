import type { IAthlete } from "./IAthlete";
import type { IDefaultResponse } from "./ResponseInterfaces";


// legge til mer senere
export interface IAthleteContext {
    athletes: IAthlete[]
    getAthleteQuantity: () => number
    addAthlete: (newAthlete: IAthlete) => Promise<IDefaultResponse>
    deleteAthlete: (id: number) => Promise<IDefaultResponse>
    updateAthlete: (athlete: IAthlete) => Promise<IDefaultResponse>
    refreshAthletes: () => Promise<void>
}
