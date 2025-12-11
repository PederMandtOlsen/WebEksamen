import type { IAthlete } from "./IAthlete";
import type { IDefaultResponse } from "./ResponseInterfaces";


// legge til mer senere
export interface IAthleteContext {
    athletes: IAthlete[]
    getAthleteQuantity: () => number
    saveAthlete: (newAthlete: IAthlete) => Promise<IDefaultResponse>
}
