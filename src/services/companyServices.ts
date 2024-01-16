import instance from "@/services/instance";
export async function  getAllCompanies(params : any){
    return await  instance.get('user/get-all-users/',{params : params})
}

export async function  getCompanyDetails(id : any){
    return await  instance.get(`user/get-user-details/${id}`, )
}