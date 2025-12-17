import { useContext } from "react";
import AthleteItem from "./AthleteItem";
import type { IAthleteContext } from "../../interfaces/IAthleteContext";
import { AthleteContext } from "../../contexts/AthleteContext";


const AthleteList = () => {

    const { athletes } = useContext(AthleteContext) as IAthleteContext

    const getAthleteJSX = () => {
        const athleteJSX = athletes.map((athlete) => {
            return (
                <AthleteItem
                    key={athlete.id}
                    athlete={athlete}
                />
            )
        });
        return athleteJSX;
    }

    return (
        <section className="mx-auto max-w-6xl ">
            <section className=" grid-container">
                {getAthleteJSX()}
            </section>
        </section>
    )

}

export default AthleteList;




