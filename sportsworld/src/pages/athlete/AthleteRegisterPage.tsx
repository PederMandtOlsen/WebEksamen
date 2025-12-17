import AthleteForm from "../../components/athlete/AthleteForm"

const AthleteRegisterPage = () => {
    return (
        <>
            <section className="grid flex justify-center">
                <section className=" p-6 w-fit">
                    <div className="  mb-4 w-fit">
                        <h1 className="text-3xl text-center mb-4">Register new athletes</h1>
                        <p className="text-center p-4 w-100 rounded bg-gray-200">Here you can register a new athlete.
                            All fields needs to be filled out to be able to save a new athlete</p>
                    </div>

                    <section className="flex justify-center">
                        <AthleteForm />
                    </section>
                </section>
            </section>
        </>
    )
}

export default AthleteRegisterPage