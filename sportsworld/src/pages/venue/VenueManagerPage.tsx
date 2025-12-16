import VenueList from "../../components/venues/VenueList"
import VenueForm from "../../components/venues/VenueForm"

const VenueManagerPage = () => {
    return (
        <>
            <h1 className="text-3xl mb-6 text-center" >Manage venues</h1>
            <section className="mx-auto max-w-6xl p-6 grid gap-8 grid-cols-1 lg:grid-cols-[360px_1fr]">
                <section>
                    <VenueForm/>
                </section>
                <section className="rounded bg-gray-200 shadow-lg p-6">
                    <VenueList allowEdit/>
                </section>  
            </section>
        </>
    )
}

export default VenueManagerPage
