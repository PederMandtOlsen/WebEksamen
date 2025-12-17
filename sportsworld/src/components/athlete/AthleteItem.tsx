import { useContext, useState, type ChangeEvent } from "react";
import { AthleteContext } from "../../contexts/AthleteContext";
import type { IAthlete } from "../../interfaces/IAthlete";
import type { IAthleteContext } from "../../interfaces/IAthleteContext";
import ImageUploadService from "../../services/ImageUploadService";
import AthleteService from "../../services/AthleteService";
import imagePlaceholder from "../../assets/images/placeholder.png";

const AthleteItem = ({ athlete }: { athlete: IAthlete }) => {
    const { deleteAthlete, updateAthlete } = useContext(AthleteContext) as IAthleteContext;

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(athlete.name);
    const [gender, setGender] = useState(athlete.gender);
    const [price, setPrice] = useState(athlete.price);
    const [image, setImage] = useState(athlete.image);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const imageUrl = AthleteService.getImageEndpoint() + image;

    const startEdit = () => {
        setName(athlete.name); 
        setGender(athlete.gender);
        setPrice(athlete.price);
        setImage(athlete.image);
        setImageFile(null);
        setIsEditing(true);
    };

    const imageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length > 0) {
            setImageFile(files[0]);
        }
    };

    const saveEdit = async (e: React.FormEvent) => {
        e.preventDefault();

        let imagePath = image;

        if (imageFile) {
            const uploadResult = await ImageUploadService.uploadImage(imageFile)    ;
            imagePath = `/images/${uploadResult.filePath}`;

        }

        const result = await updateAthlete({
            ...athlete,
            name,
            gender,
            price,
            image: imagePath,
        });

        if (result.success) {
            setImage(imagePath);
            setIsEditing(false);
        } else {
            alert("Could not update athlete");
        }
    };

    const handleDelete = async () => {
        if (athlete.id != null) {
            await deleteAthlete(athlete.id);
        }
    };

    return (
        <article className="grid-container__item">
            {!isEditing ? (
                <>
                    <img
                        src={imageUrl}
                        alt={athlete.name}
                        className="img-styling"
                        onError={(e) => (e.currentTarget.src = imagePlaceholder)}
                    />

                    <h3 className="text-lg font-bold">{athlete.name}</h3>

                    <div className="text-sm space-y-1">
                        <p>ID: {athlete.id}</p>
                        <p>Gender: {athlete.gender}</p>
                        <p>Price: {athlete.price} $</p>
                    </div>

                    <div className="flex justify-center gap-2 pt-2">
                        <button onClick={startEdit} className="btn">
                            Edit
                        </button>
                        <button onClick={handleDelete} className="btn btn-danger">
                            Delete
                        </button>
                    </div>
                </>
            ) : (
                <form onSubmit={saveEdit} className="space-y-3">
                    <img
                        src={imageUrl}
                        alt={name}
                        className="img-styling"
                        onError={(e) => (e.currentTarget.src = imagePlaceholder)}
                    />

                    <div className="grid gap-2">
                        <label className="text-sm">Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border rounded px-2 py-1 w-full"
                        />

                        <label className="text-sm">Gender</label>
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="border rounded px-2 py-1 w-full"
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>

                        <label className="text-sm">Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            className="border rounded px-2 py-1 w-full"
                        />

                        <label className="text-sm">Image</label>
                        <input
                            type="file"
                            onChange={imageChangeHandler}
                            className="border rounded px-2 py-1 w-full bg-white"
                        />
                    </div>

                    <div className="flex justify-center gap-2 pt-2">
                        <button type="submit" className="btn btn-success">Save</button>
                        <button type="button" onClick={() => setIsEditing(false)} className="btn">Cancel</button>
                    </div>
                </form>

            )}
        </article>
    );
};

export default AthleteItem;
