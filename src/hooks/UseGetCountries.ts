import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getCountriesData, getOneCountryData } from "../services/dataService";

export  function UseGetCountries() {
  const [searchParams] =   useSearchParams()
  const region = searchParams.get("region");
  const name = searchParams.get("name");
  let url =''
if(region){
   url =`region/${region}`
}
if(name ||name && region){
   url =`name/${name}`
}
if(!name && !region){
   url ='all'
}

  
  const  { data: allCountriesData, isLoading:isLoadingAllCountries  , status ,failureReason   } =  useQuery({
    queryKey: ["allCountries",name,region],
    queryFn: () => getCountriesData(url),
  });

  return { allCountriesData, isLoadingAllCountries , status ,failureReason  };

}
export  function UseGetOneCountry() {
  const [searchParams] =   useSearchParams()
const countryName = searchParams.get("countryName")||''
  const  { data: countryData, isLoading:isLoadingOneCountry  , status ,failureReason   } =  useQuery({
    queryKey: [`${countryName}Data`,countryName],
    queryFn: () => getOneCountryData(countryName),
  });

  return { countryData, isLoadingOneCountry , status ,failureReason  };

}



//   const { search } = useLocation();
//   // const queryObject = queryString.parse(search);

//   const queryObject = Object.fromEntries(new URLSearchParams(search));
  
//   // const queryClient = useQueryClient()

//   // queryClient.invalidateQueries({ queryKey: ['tableData'] })

//   const { data: rawData, isLoading } = useQuery<QueryClient | undefined>({
//     queryKey: ["tableData",queryObject],
//     queryFn: () => getSymbolData(search),
//     staleTime: 100,
//     // enabled: false,
//     // behavior:"cache-and-network",
//   });
  

//   // const { data } = data || {};

//   return { isLoading, rawData };
// }


// export default function useProjects() {
//   const { search } = useLocation();
//   // const queryObject = queryString.parse(search);

//   const queryObject = Object.fromEntries(new URLSearchParams(search));

//   const { data, isLoading } = useQuery({
//     queryKey: ["projects", queryObject],
//     queryFn: () => geProjectsApi(search),
//   });

//   const { projects } = data || {};

//   return { isLoading, projects };
// }



// const queryClient =useQueryClient()
//   // const queryObject = Object.fromEntries(new URLSearchParams(search));

//   const { data: tickets, isPending } = useMutation({
//     mutationKey: ["tickets",],
//     mutationFn: () => getTicketsApi(merchantId),
//     onSuccess: (data) => {
//       queryClient.setQueryData('todo', )
//     },
    
//   });