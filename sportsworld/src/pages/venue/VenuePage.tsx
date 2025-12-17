import VenueSearchById from "../../components/venues/VenueSearchById"
import VenueSearchByName from "../../components/venues/VenueSearchByName"
import VenueList from "../../components/venues/VenueList"

const VenuePage = () => {
    return (
        <>
            <h1 className="text-3xl mb-6 text-center">List over venues</h1>

            <section className="">

                <section className=" p-4 rounded-lg mb-6">
                    <div className="flex justify-center gap-4">
                        <VenueSearchById />
                        <VenueSearchByName />
                    </div>
                </section>

                <section className="grid grid-cols-12 gap-6 bg-gray-100 p-4">
                    <section className="col-span-12">
                        <VenueList allowEdit={false} />
                    </section>
                </section>

            </section>
        </>
    )
}

export default VenuePage