import { useContext, useState } from "react";
import { VenueContext } from "../../contexts/VenueContext";
import type { IVenueContext } from "../../interfaces/IVenueContext";
import imagePlaceholder from  "../../assets/images/placeholder.png";
import type { IVenue } from "../../interfaces/IVenue";



const VenueItem = ({venue}: {venue: IVenue}) => {

const {deleteVenue, updateVenue} = useContext(VenueContext) as IVenueContext

const [isEditing, setIsEditing] = useState(false)

const [name, setName] = useState(venue.name)
const [capacity, setCapacity] = useState(venue.capacity)
const [image, setImage] = useState(venue.image)

const startEdit = () => {
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

updateVenue({
        ...venue,
        name,
        capacity,
        image
    })

    setIsEditing(false)
}



const handleDelete = async () => {
    await deleteVenue(venue.id!)
}

    return (
        <article className="
        p-4 border rounded-xl
        flex flex-col items-center text-center
        ">

        {!isEditing ? ( 
            <>
                <img 
                src={venue.image} 
                alt={venue.name}
                className="h-40 w-60 shadow-ms rounded-xl m-4"
                onError={(e) => {
                    e.currentTarget.src = imagePlaceholder
                }}
                />
                <h3 className="text-lg font-semibold"> {venue.name}</h3>
                <p>ID: {venue.id}</p>
                <p >Capacity {venue.capacity}</p>
                <div className="flex justify-center gap-3 mt-4">
                    <button
                    onClick={startEdit}
                    className="
                    m-1
                    rounded-lg border 
                    px-4 py-2 
                    text-sm font-medium 
                    hover:bg-gray-100
                    cursor-pointer
                ">
                    Edit</button>
                <button 
                    onClick={handleDelete}
                    className="
                    m-1
                    bg-red-500
                    rounded-lg border border-red-500
                    px-4 py-2 
                    text-sm font-medium text-white
                    hover:bg-red-600
                    cursor-pointer
                ">
                    Delete</button>
                </div>
        </>
      ) : (

        <form onSubmit={saveEdit} className="w-full max-w-[300px] mx-auto" >

            <img 
                src={venue.image} 
                alt={venue.name}
                className="h-40 w-60 rounded-xl m-4"
                onError={(e) => {
                    e.currentTarget.src = imagePlaceholder
                }}
                />
                <div className="w-full max-w-[320px] grid gap-3">
                    <div className="grid grid-cols-[110px_1fr] items-center gap-2">
                        <label>Name: </label>
                        <input 
                        value={name}
                        onChange={(e) => setName(e.target.value)}  
                        className="border rounded px-2 py-1 w-40"
                        />
                    </div>
                    <div className="grid grid-cols-[110px_1fr] items-center gap-2">
                        <label>Capacity </label>
                        <input
                        value={capacity}
                        onChange={(e) => setCapacity(Number(e.target.value))} 
                        className="border rounded px-2 py-1 w-40" 
                       />
                    </div>
                    <div className="grid grid-cols-[110px_1fr] w-full items-center gap-2    ">
                        <label>Image URL: </label>
                        <input 
                        value={image}
                        onChange={(e) => setImage(e.target.value)}  
                        className="border rounded px-2 py-1 w-40"
                        />
                    </div>
                </div>
            
            

            <div className="flex justify-center gap-2 mt-4">
                <button
                type="submit"
                className="border rounded p-2 bg-green-500"
                >Save</button>
                <button
                type="button"
                className="border rounded p-2"
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