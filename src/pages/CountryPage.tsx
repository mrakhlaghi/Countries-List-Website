import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import IButton from "../components/IButton";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { UseGetOneCountry } from "../hooks/UseGetCountries";
import { useEffect } from "react";
import Loading from "../components/Loading";
import { CountryData } from "../types";

function CountryPage() {
  const location = useLocation();
  const params = location.state;
  const [searchParams, setSearchParams] = useSearchParams();
  // const [country, setCountry] = useState<any>();
  console.log("🚀 ~ CountryPage ~ searchParams:", searchParams);
  const { countryData, isLoadingOneCountry, failureReason } =
    UseGetOneCountry() as {
      countryData: CountryData | undefined;
      isLoadingOneCountry: boolean;
      failureReason: any;
    };
  console.log("🚀 ~ CountryPage ~ countryData:", countryData);
  // countryData.name.nativeName

  const error = failureReason as any;
  const navigate = useNavigate();

  const nativeName = countryData?.name.nativeName
    ? Object.values(countryData.name.nativeName)[0].common
    : "";
  const languages = countryData?.languages
    ? Object.values(countryData.languages).join(", ")
    : "";
  const currency = countryData?.currencies
    ? Object.values(countryData.currencies)[0].name
    : "";

  // if (countryData && countryData) {
  //   console.log(
  //     "🚀 ~ CountryPage ~ countryData.name.nativeName:",
  //     Object.values(countryData.name.nativeName)[0].common
  //   );
  // }
  useEffect(() => {
    if (params && params.countryName) {
      searchParams.set("countryName", params?.countryName);
      setSearchParams(searchParams);
    } else {
      // console.log(window.location);
      // navigate("/countries");
    }
  }, []);

  //   const { countryName } = useParams<{ countryName: string }>();

  return (
    <div className="w-full h-full  mx-auto 2xl:max-w-7xl ">
      <div className="min-h-screen pt-20 h-full  flex flex-col items-start justify-start gap-y-4  px-5  md:px-6 lg:px-16 xl:px-36">
        <div className=" w-full h-full  flex flex-col justify-center items-start  gap-y-10 pt-5 md:pt-16  pb-8">
          <div className="flex justify-start items-center ml-3  ">
            <IButton
              title={"Back"}
              onclick={() => navigate(-3)}
              //   onclick={() => navigate("/countries")}
              className="bg-[#FAFAFA] dark:!bg-[#2B3743] !rounded-[4px]    !text-secondary-500 px-5 sm:px-6 !text-sm gap-x-3 "
              children={
                <MdOutlineKeyboardBackspace
                  className="text-secondary-800"
                  size={15}
                />
              }
            />
          </div>
          <div className="w-full h-full min-w-screen min-h-[70vh]   flex-1 p-4  sm:pt-6 md:pt-14 flex justify-center items-start md:text-lg whitespace-pre-line ">
            {failureReason ? (
              error?.response?.data.message
            ) : isLoadingOneCountry ? (
              <div className="w-full h-full min-w-screen min-h-96  flex-1 flex justify-center items-center">
                <Loading />
              </div>
            ) : (
              countryData &&
              countryData && (
                <div className="w-full h-full flex flex-col sm:flex-row justify-center items-center sm:gap-x-10 md:gap-x-14 lg:gap-x-36 gap-y-10 ">
                  <div className="w-full sm:w-1/2 h-full flex justify-center items-start sm:-mt-10 md:-mt-10 lg:mt-0 ">
                    <div className=" w-full  aspect-[4/3] flex justify-center items-start  shadow-2xl ">
                      <img
                        src={countryData?.flags?.png}
                        alt={`${countryData?.name.common} flag`}
                        className="w-full h-full min-h-full max-h-full object-fill"
                        loading="lazy"
                        draggable="false"
                      />
                    </div>
                  </div>
                  <div className=" w-full sm:w-1/2 flex  justify-start items-start flex-col   gap-y-10 ">
                    <h3 className="  text-secondary-800 text-2xl font-bold text-nowrap  -mb-3">
                      {countryData.name.common}
                    </h3>
                    <div className=" w-full flex flex-col sm:flex-row justify-between items-start  gap-x-5 gap-y-10  ">
                      <div className=" flex flex-col justify-center items-start gap-y-3  ">
                        <div className="flex flex-col items-start justify-center gap-y-2.5 sm:gap-y-2">
                          <p className="text-secondary-700 text-sm ">
                            Native Name:
                            <span className="ml-1 text-secondary-600/85 text-[13px] ">
                              {nativeName}
                            </span>
                          </p>

                          <p className="text-secondary-700 text-sm  ">
                            Population:
                            <span className="ml-1 text-secondary-600/85 text-[13px] ">
                              {countryData.population.toLocaleString()}
                            </span>
                          </p>

                          <p className="text-secondary-700 text-sm  ">
                            Region:
                            <span className="ml-1 text-secondary-600/85 text-[13px] ">
                              {countryData.region}
                            </span>
                          </p>

                          <p className="text-secondary-700 text-sm  ">
                            Sub Region:
                            <span className="ml-1 text-secondary-600/85 text-[13px] ">
                              {countryData.subregion}
                            </span>
                          </p>

                          <p className="text-secondary-700 text-sm  ">
                            Capital:
                            <span className="ml-1 text-secondary-600/85 text-[13px]">
                              {countryData.capital[0]}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className=" flex flex-col justify-center items-start gap-y-3">
                        <div className="flex flex-col items-start justify-center gap-y-2.5 sm:gap-y-2">
                          <p className="text-secondary-700 text-sm  ">
                            Top Level Domain:
                            <span className="ml-1 text-secondary-600/85 text-[13px] ">
                              {countryData.tld.join(", ")}
                            </span>
                          </p>
                          <p className="text-secondary-700 text-sm  ">
                            Currencies:
                            <span className="ml-1 text-secondary-600/85 text-[13px] ">
                              {currency}
                            </span>
                          </p>
                          <p className="text-secondary-700 text-sm  ">
                            Languages:
                            <span className="ml-1 text-secondary-600/85 text-[13px] ">
                              {languages}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className=" flex flex-col sm:flex-row justify-start items-start gap-x-3  gap-y-5">
                      <span className="text-secondary-700 text-sm  ">
                        Border Countries:
                        {countryData.borders === undefined ? (
                          <span className=" ml-2 text-secondary-600/85 text-sm">
                            No Border Countries
                          </span>
                        ) : (
                          ""
                        )}
                      </span>
                      <div className="flex flex-wrap justify-start items-center gap-x-3  gap-y-3 ">
                        {countryData?.borders?.map((border: string) => (
                          <span
                            key={border}
                            className="bg-white dark:bg-[#2B3743] text-secondary-500 px-7 py-1 text-xs shadow-md  rounded-sm"
                          >
                            {border}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* {country?.name?.common} */}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryPage;
