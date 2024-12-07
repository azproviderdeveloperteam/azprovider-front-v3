import instance from "@/services/instance";

export async function  getDashboardProducts(){
    return await  instance.get('v2/product/'  )
}

export async function  createProduct(data : any){
    return await  instance.post('v2/product/',data)
}

export async function  editProduct(data : any){
    return await  instance.put(`products/edit/${data?.id}/`,data?.formData)
}

export async function  onSaleProduct(data : any){
    return await  instance.post(`v2/product/onsale/`,data)
}

export async function  deleteOnSaleProduct(id : any){
    return await  instance.delete(`v2/product/onsale/${id}/`)
}

export async function  updateProduct({data , id} : any){
    return await  instance.patch(`v2/product/${id}/`,data)
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

export async function updateService ({data , id} : any){
    return await instance.patch(`v2/services/${id}/`,data)
}

export async function deleteProductDashboard(id : string) {
    return await instance.delete(`v2/product/${id}/`)
}

export async function deleteServiceDashboard(id : string) {
    return await instance.delete(`v2/services/${id}/`)
}
