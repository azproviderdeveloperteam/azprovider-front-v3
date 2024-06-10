import instance from "@/services/instance";

export async function  getDashboardProducts(){
    return await  instance.get('products/get-user-products/' ,{params:{page_size:1000} })
}

export async function  createProduct(data : any){
    return await  instance.post('products/create/',data)
}

export async function  editProduct(data : any){
    return await  instance.put(`products/edit/${data?.id}/`,data?.formData)
}


export async function  createProductUploadImage(data : any){
    return await  instance.post('products/upload-image/',data , {headers:{"Content-Type":"multipart/form-data"}})
}

export async function getDashboardServices (){
    return await instance.get('v2/services/')
}


export async function addDashboardServices (data : any){
    return await instance.post('products/create/',data)
}

export async function createService (data : any){
    return await instance.post('v2/services/',data)
}