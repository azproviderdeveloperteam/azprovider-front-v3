import instance from "@/services/instance";

export async function  getBInfo(){
    return await  instance.get('advanced-business-information/get-data/')
}

export async function  postBInfo(data : any){
    return await  instance.post('advanced-business-information/update-info/' ,data)
}

export async function  getContact(){
    return await  instance.get('contact-information/get-data/')
}

export async function  postContact(data : any){
    return await  instance.post('contact-information/update-info/' ,data)
}



export async function  getCertificate(){
    return await  instance.get('certificates/get-data/')
}

export async function  postCertificate(data : any){
    return await  instance.post('certificates/create/' ,data)
}


export async function  getProjects(){
    return await  instance.get('projects/get-data/')
}

export async function  postProjects(data : any){
    return await  instance.post('projects/create/' ,data)
}


export async function  getMembership(){
    return await  instance.get('membership/get-data/')
}

export async function  postMembership(data : any){
    return await  instance.post('membership/update-info/' ,data)
}

