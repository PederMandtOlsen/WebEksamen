import AthleteList from "../../components/athlete/AthleteList";
import AthleteSearchByName from "../../components/athlete/AthleteSearchByName";
import AthleteSearchById from "../../components/athlete/AthleteSearchById";

const AthletePage = () => {
  return (
    <>
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold">
          List of all football players
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 px-8">
        <section className="lg:col-span-1 bg-gray-100 rounded-lg p-4 h-fit">
          <h2 className="text-lg font-semibold mb-2">
            Search for Athletes
          </h2>
          <div className="flex flex-col gap-2">
            <AthleteSearchByName />
            <AthleteSearchById />
          </div>
        </section>

        <section className="lg:col-span-3 flex flex-col gap-6">
          <AthleteList />
        </section>
      </div>
    </>
  );
};

export default AthletePage;
