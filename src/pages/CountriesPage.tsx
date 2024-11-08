import { useEffect, useRef, useState } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import Loading from "../components/Loading";
import CountryCard from "../components/CountryCard";
import useResponsiveWidth from "../hooks/UseResponsiveWidth";
import ISearchInput from "../components/ISearchInput";
import RHFSelect from "../components/RHFSelect";
import { useSearchParams } from "react-router-dom";
import { UseGetCountries } from "../hooks/UseGetCountries";

export default function CountriesPage() {
  const { allCountriesData, isLoadingAllCountries, failureReason } =
    UseGetCountries();
  const error = failureReason as any;
  console.log("🚀 ~ CountriesPage ~ failureReason:", failureReason);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchParams] = useSearchParams();
  const region = searchParams.get("region");
  const name = searchParams.get("name");
  console.log("🚀 ~ CountriesPage ~ name:", name);
  // const { search } = useLocation();
  // console.log("🚀 ~ CountriesPage ~ search:", search)
  const inputRef = useRef<HTMLInputElement>(null);

  const { sm, md, lg, xl, _2xl, _3xl } = useResponsiveWidth();

  const itemsPerRow = sm
    ? 1
    : md
    ? 2
    : lg
    ? 2
    : xl
    ? 3
    : _2xl
    ? 4
    : _3xl
    ? 4
    : 1;
  // const itemsPerRow = 4;
  const itemHeight = 400;
  const regionOptions = [
    { label: "Filter by Region", value: "all" },
    { label: "Africa", value: "africa" },
    { label: "America", value: "america" },
    { label: "Asia", value: "asia" },
    { label: "Europe", value: "europe" },
    { label: "Oceania", value: "oceania" },
  ];

  useEffect(() => {
    if (!allCountriesData) {
      setFilteredCountries(allCountriesData);
    }
  }, []);

  useEffect(() => {
    // searched name  ????   just name
    // searched region  ????   just region
    // searched  name & region  ????   search name and filter result by region

    if ((name && !region) || (region && !name)) {
      setFilteredCountries(allCountriesData);
    }

    if (name && region) {
      setFilteredCountries(
        allCountriesData?.filter((country: any) => {
          console.log(
            "🚀 ~ CountriesPage ~ country.region:",
            country.region.toLowerCase()
          );
          console.log("🚀 ~ CountriesPage ~ region:", region);
          if (country.region.toLowerCase() === region) {
            console.log(true);
          }
          return country.region.toLowerCase() === region;
        })
      );
    }

    console.log("🚀 ~ CountriesPage ~ allCountriesData", allCountriesData);
  }, [name, region, allCountriesData]);

  return (
    <div className="w-full h-full  mx-auto 2xl:max-w-7xl pt-20">
      <div className="min-h-[calc(100vh-80px)] h-full   ">
        {/* <div className="min-h-screen h-full "> */}
        {/* <SearchInput className="w-52" /> */}

        <div className="w-full  flex flex-col justify-between items-start  gap-y-7 gap-x-3 sm:flex-row sm:justify-between sm:items-center px-14 py-9   ">
          <ISearchInput
            wrapperClassName=" order-1"
            className=" sm:!w-96 !h-14 !text-md"
            focusOnMounting={true}
            ref={inputRef}
          />
          {/* <div className="text-base text-secondary-800 font-bold flex justify-start gap-x-2 items-center text-nowrap  order-3 sm:order-2">
            filtered countries :{" "}
            <span className=" w-7 h-7 flex justify-center items-center text-white rounded-full p-1 bg-primary-800  text-sm">
              {filteredCountries?.length}
            </span>{" "}
          </div> */}
          <RHFSelect
            name="region"
            options={regionOptions}
            searchParamsLabel="region"
            wrapperClass=" order-2 sm:order-3"
            selectClass=""
          />
        </div>

        {failureReason ? (
          <div className="w-full h-full flex-1 p-4 flex justify-center items-start md:text-lg whitespace-pre-line ">
            {/* {failureReason?.response?.data.message} */}
            {error?.response?.data.message}
          </div>
        ) : isLoadingAllCountries ? (
          <div className="w-full h-full min-h-screen flex justify-center items-center">
            <Loading />
          </div>
        ) : filteredCountries?.length === 0 ? (
          <div className="w-full h-full p-4 flex justify-center items-start md:text-lg whitespace-pre-line ">
            not found any countries with ' {name} ' name in {region} to show 🤗
          </div>
        ) : (
          allCountriesData && (
            <AutoSizer>
              {({ height, width }) => {
                const itemWidth = width / itemsPerRow;
                const rowCount = Math.ceil(
                  allCountriesData.length / itemsPerRow
                );

                return (
                  <List
                    height={sm ? height - 220 : height - 132}
                    itemCount={rowCount}
                    itemSize={itemHeight}
                    width={width}
                    // style={{ padding  :" 20rem  0  "  ,backgroundColor: "red   " }}
                  >
                    {({ index, style }: { index: number; style: any }) => {
                      const startIndex = index * itemsPerRow;
                      const items = filteredCountries
                        ? filteredCountries.slice(
                            startIndex,
                            startIndex + itemsPerRow
                          )
                        : allCountriesData.slice(
                            startIndex,
                            startIndex + itemsPerRow
                          );

                      return (
                        <div
                          style={{
                            ...style,
                            display: "flex",
                            justifyContent: "start",
                            // padding: " 0  2rem ",
                            padding: " 0  2rem ",
                          }}
                        >
                          {items.map((country: any, subIndex: number) => (
                            <div
                              key={startIndex + subIndex}
                              style={{
                                width: itemWidth,
                                maxWidth: itemWidth,
                                padding: "20px",
                              }}
                            >
                              <CountryCard country={country} />
                            </div>
                          ))}
                        </div>
                      );
                    }}
                  </List>
                );
              }}
            </AutoSizer>
          )
        )}
      </div>
    </div>
  );
}
