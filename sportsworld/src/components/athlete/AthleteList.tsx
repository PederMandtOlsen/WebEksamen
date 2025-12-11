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
        <section>
            <header>
                <h2>Liste over alle atleter</h2>
            </header>
            <section>
                {getAthleteJSX()}
            </section>
        </section>
    )

}

export default AthleteList;




