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