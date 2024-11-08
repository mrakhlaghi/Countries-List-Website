import { Link } from "react-router-dom";
import truncateText from "../utils/truncateText";
import { CountryData } from "../types";

function CountryCard({
  country,
}: {
  country: CountryData;
}) {
  // const navigate = useNavigate();
  // const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Link
      to={"/country"}
      state={{ countryName: country.name.common }}
      // params={"countryName", country.name.common}

      // onClick={() => {
      //   navigate("/country");
      //   searchParams.set("countryName", country.name.common as string);
      //   setSearchParams(searchParams);
      // }}
      className="w-full   h-[360px] flex flex-col justify-start items-start mx-3 gap-x-4 gap-y-4 bg-[#FAFAFA] dark:bg-[#2B3743] rounded-lg shadow-lg  overflow-hidden  hover:cursor-pointer  hover:scale-[1.006] transition-all duration-300 hover:shadow-2xl"
      // style={{ maxWidth: "260px" }}
    >
      <div className="w-full  flex justify-center items-center min-h-40 h-40 max-h-40  ">
        <img
          src={country.flags.png}
          alt={`${country.name.common} flag`}
          className="w-full    min-h-full h-full max-h-full object-fill"
          loading="lazy"
          draggable="false"
        />
      </div>
      <div className="px-6 pt-3 pb-10 flex flex-col justify-center items-start gap-y-3">
        <h3 className=" text-secondary-800 text-lg font-bold text-nowrap">
          {truncateText(country.name.common as string, 17)}
        </h3>
        <div className="flex flex-col items-start justify-center gap-y-1.5">
          <p className="text-secondary-700 text-sm  ">
            Population:
            <span className="ml-1 text-secondary-600/85 text-[13px] ">
              {country.population.toLocaleString()}
            </span>
          </p>
          <p className="text-secondary-700 text-sm  ">
            Region:
            <span className="ml-1 text-secondary-600/85 text-[13px] ">
              {country.region}
            </span>
          </p>
          <p className="text-secondary-700 text-sm  ">
            Capital:
            <span className="ml-1 text-secondary-600/85 text-[13px] ">
              {country.capital}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default CountryCard;
