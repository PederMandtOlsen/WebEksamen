import AthleteList from "../../components/athlete/AthleteList"
import AthleteSearchByName from "../../components/athlete/AthleteSearchByName"
import AthleteSearchById from "../../components/athlete/AthleteSearchById"



const AthletePage = () => {
    return (
        <>
            <header>
                <h1>Administering athletes</h1>
            </header>
            <AthleteSearchByName/>
            <AthleteSearchById/>
            <AthleteList/>
        </>
    )
}

export default AthletePage