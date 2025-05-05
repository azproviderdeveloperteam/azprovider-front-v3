import instance from "@/services/instance";
export async function  getAllProducts(params : any){
    return await  instance.get('v2/product/list/',{params : params})
}



export async function  getNewestHotDealProducts(){
    return await  instance.get('products/get-newest-hot-deals/')
}

export async function  getNewestOnSaleProducts(){
    return await  instance.get('products/get-newest-on-sales/')
}

export async function  getProductDetails(id : any){
    return await  instance.get(`v2/product/${id}/`, )
}


export async function  getAllHotDeals(params : any){
    return await  instance.get('v2/product/hotdeal/list/',{params : params})
}


export async function  getAllOnSales(params : any){
    return await  instance.get('v2/product/onsale/list/',{params : params})
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



export async function  getAllPreInvoices(params : any){
    return await  instance.get('v2/product/pre-invoice/list/',{params : params})
}

export async function getPreInvoiceDetails(id : any){
    return await  instance.get(`v2/product/pre-invoice/${id}`, )
}

export async function sendComment({payload , id} : any){
    return await instance.post(`v2/product/${id}/comment/` ,payload )
}

export async function getProductComments(id:string){
    return await instance.get(`v2/product/${id}/comment?limit=500` )
}


export async function sendCommentService({payload , id} : any){
    return await instance.post(`v2/service/${id}/comment/` ,payload )
}

export async function getServiceComments(id:string){
    return await instance.get(`v2/service/${id}/comment?limit=500` )
}