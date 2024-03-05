import instance from "@/services/instance";
export async function  uploadV2(data:any){
    return await  instance.post('v2/upload/',
        data?.data , 
        {
            params: {method:data?.method},
            headers:{"Content-Type":"multipart/form-data"}
        })
}

