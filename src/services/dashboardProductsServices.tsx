import instance from "@/services/instance";

export async function  getDashboardProducts(){
    return await  instance.get('products/get-user-products/')
}

export async function  createProduct(data : any){
    return await  instance.post('products/create/',data)
}

export async function  createProductUploadImage(data : any){
    return await  instance.post('products/upload-image/',data , {headers:{"Content-Type":"multipart/form-data"}})
}