import instance from "@/services/instance";

export async function getBenefits(){
    return await instance.get('benefit/get-data/')
}