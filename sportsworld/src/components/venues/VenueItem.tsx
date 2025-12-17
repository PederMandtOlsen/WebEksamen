import { useContext, useState } from "react";
import { VenueContext } from "../../contexts/VenueContext";
import type { IVenueContext } from "../../interfaces/IVenueContext";
import imagePlaceholder from "../../assets/images/placeholder.png";
import type { IVenue } from "../../interfaces/IVenue";




const VenueItem = ({ venue, allowEdit = false, }: { venue: IVenue; allowEdit?: boolean }) => {


    const { deleteVenue, updateVenue } = useContext(VenueContext) as IVenueContext

    const [isEditing, setIsEditing] = useState(false)

    const [name, setName] = useState(venue.name)
    const [capacity, setCapacity] = useState(venue.capacity)
    const [image, setImage] = useState(venue.image)



    const startEdit = () => {
        if (!allowEdit) return
        setName(venue.name)
        setCapacity(venue.capacity)
        setImage(venue.image)
        setIsEditing(true)
    }


    const cancelEdit = () => {
        setIsEditing(false)
    }

    const saveEdit = async (e: React.FormEvent) => {
        e.preventDefault()

        const result = await updateVenue({
            ...venue,
            name,
            capacity,
            image
        })

        if (result.success) {
            setIsEditing(false)
        } else {
            alert("Could not update Venue")
        }
    }



    const handleDelete = async () => {
        if (!allowEdit) return
        if (venue.id == null) return
        await deleteVenue(venue.id)
    }

    const showEditForm = allowEdit && isEditing

    return (

        <article className="
        grid-container__item
        ">

            {!showEditForm ? (
                <>
                    <img
                        src={image}
                        alt={venue.name}
                        className="img-styling"
                        onError={(e) => {
                            e.currentTarget.src = imagePlaceholder
                        }}
                    />
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold"> {name}</h3>
                        <p>ID: {venue.id}</p>
                        <p>Capacity: {capacity}</p> 
                    </div>

                    {allowEdit && (
                        <div className="flex justify-center gap-3 mt-4">
                            <button
                                onClick={startEdit}
                                className="btn">
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="btn btn-danger">
                                Delete
                            </button>
                        </div>
                    )}
                </>
            ) : (

                <form className="w-full" onSubmit={saveEdit} >

                    <img
                        src={image}
                        alt={venue.name}
                        className="img-styling"
                        onError={(e) => {
                            e.currentTarget.src = imagePlaceholder
                        }}
                    />
                    <div className="w-full max-w-[320px] grid gap-3">
                        <div className="grid items-center gap-2 mt-4">
                            <label>Name: </label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border rounded px-2 py-1 w-full"
                            />
                        </div>
                        <div className="grid items-center gap-2">
                            <label>Capacity: </label>
                            <input
                                type="number"
                                value={capacity}
                                onChange={(e) => setCapacity(Number(e.target.value))}
                                className="border rounded px-2 py-1 w-full"
                            />
                        </div>
                        <div className="grid w-full items-center gap-2">
                            <label>Image URL: </label>
                            <input
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                className="border rounded px-2 py-1 w-full"
                            />
                        </div>
                    </div>



                    <div className="flex justify-center gap-2 mt-4">
                        <button
                            type="submit"
                            className="btn btn-success"
                        >Save</button>
                        <button
                            type="button"
                            className="btn"
                            onClick={cancelEdit}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </article>
    )
}

export default VenueItem