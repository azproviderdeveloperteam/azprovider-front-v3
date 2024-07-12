import instance from "@/services/instance";
export async function  getAllProducts(params : any){
    return await  instance.get('products/get-all-products/',{params : params})
}

export async function  getNewestHotDealProducts(){
    return await  instance.get('products/get-newest-hot-deals/')
}

export async function  getNewestOnSaleProducts(){
    return await  instance.get('products/get-newest-on-sales/')
}

export async function  getProductDetails(id : any){
    return await  instance.get(`products/get-product-details/${id}`, )
}


export async function  getAllHotDeals(params : any){
    return await  instance.get('products/get-all-hot-deals/',{params : params})
}

export async function  getAllOnSales(params : any){
    return await  instance.get('products/get-all-on-sales/',{params : params})
}

export async function  getAllServicesV2(params : any){
    return await  instance.get('v2/services/list/',{params : params})
}

export async function  getLastTenService(params : any){
    return await  instance.get('v2/services/list/',{params : params})
}


export async function  getServiceDetails(id : any){
    return await  instance.get(`v2/services/${id}`, )
}