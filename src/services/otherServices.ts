import instance from "@/services/instance";
export async function  postSubscriber(data : any){
    return await  instance.post('subscriber/create/' ,data )
}