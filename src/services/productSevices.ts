import instance from "@/services/instance";
export async function  getAllProducts(params : any){
    return await  instance.get('products/get-all-products/',{params : params})
}

