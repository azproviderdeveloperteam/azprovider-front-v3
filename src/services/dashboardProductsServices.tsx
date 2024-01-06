import instance from "@/services/instance";

export async function  getDashboardProducts(){
    return await  instance.get('products/get-user-products/')
}

// export async function  getDashboardProducts(){
//     return await  instance.get('products/get-user-products/')
// }
