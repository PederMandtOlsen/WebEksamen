import { useContext, useEffect, useState } from "react";
import { AthleteContext } from "../../contexts/AthleteContext";
import type { IAthlete } from "../../interfaces/IAthlete";
import type { IAthleteContext } from "../../interfaces/IAthleteContext";
import imagePlaceholder from  "../../assets/images/placeholder.png";



const AthleteItem = ({athlete}: {athlete: IAthlete}) => {

const {deleteAthlete, updateAthlete} = useContext(AthleteContext) as IAthleteContext

const [isEditing, setIsEditing] = useState(false)

const [name, setName] = useState(athlete.name)
const [gender, setGender] = useState(athlete.gender)
const [price, setPrice] = useState(athlete.price)
const [image, setImage] = useState(athlete.image)

useEffect(() => {
    setName(athlete.name)
    setGender(athlete.gender)
    setPrice(athlete.price)
    setImage(athlete.image)
}, [athlete])

const startEdit = () => { setIsEditing(true) }

const cancelEdit = () => {
    setIsEditing(false)
}

const saveEdit = async (e: React.FormEvent) => {
    e.preventDefault()

 const result = await updateAthlete({
        ...athlete,
        name,
        gender,
        price,
        image
    })

    if(result.success) {
        setIsEditing(false)
    } else {
        alert("Could not update athlete")
    }
}



const handleDelete = async () => {
    if (athlete.id == null) return
    await deleteAthlete(athlete.id)
}

    return (
        <article className="
        p-4 border rounded-xl
        flex flex-col items-center text-center
        ">

        {!isEditing ? ( 
            <>
                <img 
                src={athlete.image} 
                alt={athlete.name}
                className="img-styling"
                onError={(e) => {
                    e.currentTarget.src = imagePlaceholder
                }}
                />
                <h3 className="text-lg font-semibold"> {athlete.name}</h3>
                <p>ID: {athlete.id}</p>
                <p >Gender: {athlete.gender}</p>
                <p>Price: {athlete.price}</p>
                <p>Purchase status: {athlete.purchasedStatus === true ? "Purchased" : "Not purchased"}</p> 
                <div className="flex justify-center gap-3 mt-4">
                    <button
                    onClick={startEdit}
                    className="btn">
                    Edit</button>
                <button 
                    onClick={handleDelete}
                    className="btn">
                    Delete</button>
                </div>
        </>
      ) : (

        <form onSubmit={saveEdit} className="w-full max-w-[300px] mx-auto" >

            <img 
                src={athlete.image} 
                alt={athlete.name}
                className="img-styling"
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
                        <label>Gender: </label>
                        <select 
                        value={gender}
                        onChange={(e) => setGender(e.target.value)} 
                        className="border rounded px-2 py-1 w-40" 
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-[110px_1fr] items-center gap-2">
                        <label>Price: </label>
                        <input 
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}  
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
                className="btn"
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

export default AthleteItem