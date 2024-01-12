import instance from "@/services/instance";
export async function  getAllMeasure(){
    return await  instance.get('measurement/get-all-data/')
}
