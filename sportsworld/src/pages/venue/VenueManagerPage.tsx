import VenueList from "../../components/venues/VenueList"
import VenueForm from "../../components/venues/VenueForm"

const VenueManagerPage = () => {
    return (
        <>
            <h1 className="text-3xl mb-6 text-center">Manage venues</h1>

            <section className="grid grid-cols-12 gap-8 max-w-7xl mx-auto px-6 items-start">

                <section className="col-span-12 lg:col-span-4 bg-gray-100 rounded-lg p-6 h-fit shadow-md">
                    <VenueForm/>
                </section>

                <section className="col-span-12 lg:col-span-8 bg-gray-100 rounded-lg p-6 shadow-md">
                    <VenueList allowEdit/>
                </section>  

            </section>
        </>
    )
}

export default VenueManagerPage
