import AthleteList from "../../components/athlete/AthleteList"
import AthleteSearchByName from "../../components/athlete/AthleteSearchByName"
import AthleteSearchById from "../../components/athlete/AthleteSearchById"



const AthletePage = () => {
    return (
        <>
            <header>
                <h1 className="text-4xl p-8 mb-8 flex flex-col items-center">List of all football players</h1>
            </header>
            <div className="flex gap-4 px-8">
                <section className="w-1/4 flex flex-col gap-2 bg-gray-100 rounded-lg p-4 h-fit">
                    <h2 className="text-lg">Search for Athletes</h2>
                    <div><AthleteSearchByName /></div>
                    <div><AthleteSearchById /></div>
                </section>
                <section className="w-3/4 flex flex-col gap-6">
                    <AthleteList />
                </section>
            </div>
        </>
    )
}

export default AthletePage