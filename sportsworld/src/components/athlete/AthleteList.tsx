import type { IAthlete } from "../../interfaces/IAthlete";
import { useContext } from "react";
import AthleteItem from "./AtheleteItem";
import type { IAthleteContext } from "../../interfaces/IAthleteContext";
import { AthleteContext } from "../../contexts/AthleteContext";


const AthleteList = () => {

    const {athletes} = useContext(AthleteContext) as IAthleteContext

    const getAthleteJSX = () => {
        const athleteJSX = athletes.map( (athlete, index) => {
            return (
                <AthleteItem
                key={"athlete" + index}
                athlete={athlete}
                /> 
            ) 
        }); 
        return athleteJSX;
    }

    return (
        <section className="mx-auto max-w-6xl p-6">
             <section className="
        grid gap-8
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        ">
                {getAthleteJSX()}
            </section>
        </section>
    )

}

export default AthleteList;




