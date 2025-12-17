import { useContext, useRef, useState } from "react"
import { VenueContext } from "../../contexts/VenueContext"
import type { IVenueContext } from "../../interfaces/IVenueContext"
import type { IVenue } from "../../interfaces/IVenue"

const VenueManager = () => {
    const [statusMessage, setStatusMessage] = useState<string>("")
    const [isOk, setIsOk] = useState<boolean | null>(null)


    const { addVenue } = useContext(VenueContext) as IVenueContext


    const nameInput = useRef<HTMLInputElement | null>(null)
    const capacityInput = useRef<HTMLInputElement | null>(null)
    const imageInput = useRef<HTMLInputElement | null>(null)

    const updateStatusMessage = (message: string, ok: boolean) => {
        setStatusMessage(message)
        setIsOk(ok)

        setTimeout(() => {
            setStatusMessage("")
            setIsOk(null)
        }, 5000)
    }

    const handleAddVenue = async () => {
        if (
            nameInput.current &&
            capacityInput.current &&
            imageInput.current &&
            nameInput.current.value.trim() !== "" &&
            capacityInput.current.value.trim() !== "" &&
            imageInput.current.value.trim() !== ""
        ) {
            const newVenue: IVenue = {
                name: nameInput.current.value,
                capacity: Number(capacityInput.current.value),
                image: imageInput.current.value,
            };

            const response = await addVenue(newVenue)

            if (response.success) {
                updateStatusMessage("Venue saved", true)

                nameInput.current.value = ""
                capacityInput.current.value = ""
                imageInput.current.value = ""
            } else {
                updateStatusMessage("Something went wrong trying to save the venue", false)
            }
        }
        else {
            updateStatusMessage("You need to fill all fields", false)
        }
    }

    return (
        <section className="p-4 border rounded w-88">
            <h2 className="text-lg mb-4">Register a new venue</h2>
            <div className="grid gap-2 ">
                <label>Name</label>
                <input ref={nameInput} type="text" className="border rounded p-1" placeholder="Name" />
                <label>Capacity</label>
                <input ref={capacityInput} type="number" className="border rounded p-1" placeholder="Capacity" />
                <label>Image URL</label>
                <input ref={imageInput} type="text" className="border rounded p-1" placeholder="Image url" />
            </div>

            <button
                onClick={handleAddVenue}
                className="btn mt-4"
            >
                Lagre
            </button>
            <p className={isOk === null ? "" : isOk ? "text-green-500" : "text-red-500"}>
                {statusMessage}
            </p>
        </section>
    )

}


export default VenueManager

