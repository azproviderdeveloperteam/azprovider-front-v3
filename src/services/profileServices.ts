import instance from "@/services/instance";
import {getJWT} from "@/utils/helpers";
const jwt = getJWT('from getMeService')

export async function  getBInfo(){
    return await  instance.get('business-information/get-data/' ,{
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'Authorization': `Bearer ${jwt}`
        }
    })
}

export async function  postBInfo(data : any){
    return await  instance.post('business-information/update-info/' ,data ,{
        headers:{
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            // 'Authorization': `Bearer ${jwt}`
        }})
}

export async function  getContact(){
    return await  instance.get('contact-information/get-data/' ,{
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'Authorization': `Bearer ${jwt}`
        }
    })
}

export async function  postContact(data : any){
    return await  instance.post('contact-information/update-info/' ,data  ,{
        headers:{
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            // 'Authorization': `Bearer ${jwt}`
        }})}



export async function  getCertificate(){
    return await  instance.get('certificates/get-data/' ,{
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'Authorization': `Bearer ${jwt}`
        }
    })
}

export async function  postCertificate(data : any){
    return await  instance.post('certificates/create/' ,data ,{
        headers:{
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            // 'Authorization': `Bearer ${jwt}`
        }})}


export async function  getProjects(){
    return await  instance.get('projects/get-user-projects/' ,{
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'Authorization': `Bearer ${jwt}`
        }
    })
}

export async function  postProjects(data : any){
    return await  instance.post('projects/create/' ,data ,{
        headers:{
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            'Authorization': `Bearer ${jwt}`}})
}


export async function  getMembership(){
    return await  instance.get('membership/get-data/' ,{
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }
    })
}

export async function  postMembership(data : any){
    return await  instance.post('membership/update-info/' ,data ,{
        headers:{
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            'Authorization': `Bearer ${jwt}`}})
}

