import VenueList from "../../components/venues/VenueList"

const VenuePage = () => {
    return (
        <>
            <h1>List over venues</h1>
            <section className="flex justify-center">
            <VenueList allowEdit={false}/>
            </section>
        </>
    )
}

export default VenuePage