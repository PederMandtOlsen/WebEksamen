import { useContext, useRef, useState } from "react"
import { AthleteContext } from "../../contexts/AthleteContext"
import type { IAthleteContext } from "../../interfaces/IAthleteContext"
import type { IAthlete } from "../../interfaces/IAthlete"

const AthleteForm = () => {
    const [statusMessage, setStatusMessage] = useState<string>("")
    const [isOk, setIsOk] = useState<boolean | null>(null)


const {addAthlete} = useContext(AthleteContext) as IAthleteContext

//Kan være ønskelig å bruke useState for å holde på verdien hvis man går ut av AthleteRegisterPage, men for kode variasjon bruker vi useRef

const nameInput = useRef<HTMLInputElement | null>(null)
const genderInput = useRef<HTMLSelectElement | null>(null)
const priceInput = useRef<HTMLInputElement | null>(null)
const imageInput = useRef<HTMLInputElement | null>(null)

const updateStatusMessage = (message: string, ok: boolean) => {
        setStatusMessage(message)
        setIsOk(ok)

        setTimeout(() => {
            setStatusMessage("")
            setIsOk(null)
        }, 5000)
    }

const handleAddAthlete = async () => {
    if (
        nameInput.current &&
        genderInput.current &&
        priceInput.current &&
        imageInput.current &&
        nameInput.current.value.trim() !== "" &&
        genderInput.current.value.trim() !== "" &&
        priceInput.current.value.trim() !== "" &&
        imageInput.current.value.trim() !== ""
    ) {
        const newAthlete: IAthlete = {
            name: nameInput.current.value,
            gender: genderInput.current.value,
            price: Number(priceInput.current.value),
            image: imageInput.current.value,
            purchasedStatus: false
        };

        const response = await addAthlete(newAthlete)

        if (response.success) {
            updateStatusMessage("Athlete saved", true)

            nameInput.current.value = ""
            genderInput.current.value = ""
            priceInput.current.value = ""
            imageInput.current.value = ""
        } else {
            updateStatusMessage("Something went wrong trying to save athlete", false)
        } 
    }
        else {
            updateStatusMessage("Du må fylle ut navn og kjønn", false)
        }
    }

    return (
    <section className="p-4 border rounded w-100">
        <h2 className="text-lg mb-4">Register a new athlete</h2>
        <div className="grid gap-2 ">
            <label>Name</label>
            <input ref={nameInput} type="text" className="border rounded p-1" placeholder="Name" />
            <label>Gender</label>
            <select ref={genderInput} className="border rounded p-1">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
            <label>Price</label>
            <input ref={priceInput} type="number" className="border rounded p-1" placeholder="Price" />
            <label>Image URL</label>
            <input ref={imageInput} type="text" className="border rounded p-1" placeholder="Image url" />
        </div>

        <button 
        onClick={handleAddAthlete}
        className="border rounded px-2 py-1 mt-4 mb-2"
        >
            Lagre
        </button>
        <p className={isOk === null ? "" : isOk ? "text-green-500" : "text-red-500"}>
            {statusMessage}
        </p>
    </section>
)

}    


export default AthleteForm

