import instance from "@/services/instance";

export async function getCountries () {
    return await instance.get('v2/metric/country/?limit=290')
};

export const getCities = async (countryName: string, page: number = 1, limit: number = 50 ,cityName : undefined | string) => {
    return countryName != undefined ?  await instance.get(`v2/metric/city?country_name=${countryName}&page=${page}&limit=${limit}${cityName ? '&city_name='+cityName :''}`) : undefined;

};
