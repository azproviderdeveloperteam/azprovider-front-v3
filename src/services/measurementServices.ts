import instance from "@/services/instance";
export async function  getAllMeasure(){
    return await  instance.get('measurement/get-all-data/')
}

export async function getMeasureList(){
    return await instance.get('v2/metric/measure-unit/')
}

export async function getGrantedOrganisationList(){
    return await instance.get('v2/metric/granted-organisation/')
}