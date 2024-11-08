import http from "./httpService";
const params=  new URLSearchParams()
console.log("🚀 ~ params:", params)

export  async function  getCountriesData(url:string) {


  return await http
    .get(`${url}`, {})
    // .get(`all`, {})
    .then(({ data }) => {
      return data
    })
}
export  async function  getOneCountryData(countryName:string) {


  return await http
    .get(`name/${countryName}?fullText=true`, {})
    // .get(`all`, {})
    .then(({ data }) => {
      return data[0]
    })
}

