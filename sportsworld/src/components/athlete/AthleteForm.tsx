import { useContext, useRef, useState, type ChangeEvent } from "react";
import { AthleteContext } from "../../contexts/AthleteContext";
import type { IAthleteContext } from "../../interfaces/IAthleteContext";
import type { IAthlete } from "../../interfaces/IAthlete";
import ImageUploadService from "../../services/ImageUploadService";

const AthleteForm = () => {
    const [statusMessage, setStatusMessage] = useState("");
    const [isOk, setIsOk] = useState<boolean | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const { addAthlete } = useContext(AthleteContext) as IAthleteContext;

    const nameInput = useRef<HTMLInputElement | null>(null);
    const genderInput = useRef<HTMLSelectElement | null>(null);
    const priceInput = useRef<HTMLInputElement | null>(null);

    const updateStatusMessage = (message: string, ok: boolean) => {
        setStatusMessage(message);
        setIsOk(ok);
        setTimeout(() => {
            setStatusMessage("");
            setIsOk(null);
        }, 3000);
    };

    const imageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length > 0) {
            setImageFile(files[0]);
        }
    };

    const handleAddAthlete = async () => {
        if (
            !nameInput.current ||
            !genderInput.current ||
            !priceInput.current ||
            nameInput.current.value.trim() === "" ||
            genderInput.current.value.trim() === "" ||
            priceInput.current.value.trim() === "" ||
            imageFile == null
        ) {
            updateStatusMessage("You need to fill in all fields", false);
            return;
        }

        try {
            const uploadResult = await ImageUploadService.uploadImage(imageFile);
            const imagePath = `/images/${uploadResult.filePath}`;


            const newAthlete: IAthlete = {
                name: nameInput.current.value,
                gender: genderInput.current.value,
                price: Number(priceInput.current.value),
                image: imagePath,
                purchasedStatus: false,
            };

            await addAthlete(newAthlete);

            updateStatusMessage("Newt athlete saved", true);
            nameInput.current.value = "";
            genderInput.current.value = "";
            priceInput.current.value = "";
            setImageFile(null);
        } catch {
            updateStatusMessage("Something went wrong trying to save an athlete", false);
        }
    };

    return (
        <section className="p-4 border rounded-xl w-full">
            <h2 className="text-lg mb-4">Register a new athlete</h2>

            <div className="grid gap-2">
                <label>Name</label>
                <input ref={nameInput} type="text" className="border rounded p-1" />

                <label>Gender</label>
                <select ref={genderInput} className="border rounded p-1">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <label>Price</label>
                <input ref={priceInput} type="number" className="border rounded p-1" />

                <label>Image</label>
                <input type="file" onChange={imageChangeHandler} />
            </div>

            <button onClick={handleAddAthlete} className="btn mt-4 bg-black text-white">
                Lagre
            </button>

            <p className={isOk === null ? "" : isOk ? "text-green-500" : "text-red-500"}>
                {statusMessage}
            </p>
        </section>
    );
};

export default AthleteForm;
