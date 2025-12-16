import VenueSearchById from "../../components/venues/AthleteSearchById"
import VenueSearchByName from "../../components/venues/AthleteSearchByName"
import VenueList from "../../components/venues/VenueList"

const VenuePage = () => {
    return (
        <>
            <h1 className="text-3xl mb-6 text-center">List over venues</h1>

            <section className="grid grid-cols-12 gap-6 max-w-7xl mx-auto px-6">

                <section className="col-span-12 lg:col-span-3 bg-gray-100 rounded-lg p-4 h-fit">
                    <div>
                        <VenueSearchById/>
                    </div>
                    <div>
                        <VenueSearchByName/>
                    </div>
                </section>

                <section className="col-span-12 lg:col-span-9">
                <VenueList allowEdit={false}/>
                </section>

            </section>
        </>
    )
}

export default VenuePage