import instance from "@/services/instance";
import {param} from "ts-interface-checker";
export async function  getAllHsCodes(){
    return await  instance.get('hscodes/get-data/')
}


export async function  getRandomHsCodes(){
    return await  instance.get('hscodes-third-level/get-random-data/')
}

export async function  getSearchInThirdLevel(search : string){
    return await  instance.get('hscodes-third-level/search/',{params:{'query' : search}})
}