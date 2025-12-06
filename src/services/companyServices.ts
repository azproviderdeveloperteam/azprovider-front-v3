import instance from "@/services/instance";
export async function  getAllCompanies(params : any){
    return await  instance.get('v2/user/',{params : params})
}

export async function  getCompanyDetails(id : any){
    return await  instance.get(`v2/user/${id}/`, {
        headers:{
            accept: 'application/json',
            'Content-Type': 'application/json',
            Accept:'application/json',
            // Authorization:'Bearer '+token
        }
    } )
}