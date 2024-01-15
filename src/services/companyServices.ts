import instance from "@/services/instance";
export async function  getAllCompanies(params : any){
    return await  instance.get('user/get-all-users/',{params : params})
}

