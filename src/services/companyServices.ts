import instance from "@/services/instance";
export async function  getAllCompanies(params : any){
    return await  instance.get('v2/user/all-users-profile/',{params : params})
}

export async function  getCompanyDetails(id : any){
    return await  instance.get(`v2/user/${id}/`, )
}