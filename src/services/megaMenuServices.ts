import instance from "@/services/instance";

export async function  getMegaMenu(params : any){
    return await  instance.get('v2/product/mega-menu/',{params})
}

export async function getCategories(){
    return await instance.get('v2/hscode/categories/')
}