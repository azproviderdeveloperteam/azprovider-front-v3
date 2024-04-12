import instance from "@/services/instance";
export async function  getAllHsCodes(){
    return await  instance.get('hscodes/get-data/')
}


export async function  getRandomHsCodes(){
    return await  instance.get('hscodes-third-level/get-random-data/')
}

export async function  getSearchInThirdLevel(search : string){
    return await  instance.get('hscodes-third-level/search/',{params:{'query' : search}})
}

export async function  getSearchInFourthLevel(search : string){
    return await  instance.get('hscodes-fourth-level/search/',{params:{'query' : search}})
}

export async function  getSearchInHsCodesNew(params : string){
    let a = 'code'
    if(params === ''){
    }else if(parseInt(params) > 0){
    }else {
        a = 'title'
    }
    const b = a === 'code' ? {code : params, limit:100} : {title:params , limit:100}
    return await  instance.get('v2/hscode/search/',{params : b})
}

