import instance from "@/services/instance";
import {getJWT} from "@/utils/helpers";
import axios from "axios";
const jwt = getJWT('from getMeService')

export async function  getBInfo(){
    return await  instance.get('v2/user/profile/' ,{
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'Authorization': `Bearer ${jwt}`
        }
    })
}

export async function  postBInfo(data : any){
    return await  instance.patch('v2/user/profile/' ,data?.data ,{
        headers:{
            ...data?.headers,
            'Accept': 'application/json',
            // 'Authorization': `Bearer ${jwt}`
        }})
}


export async function  postBInfoWithoutFOrmData(data : any){
    return await  instance.patch('v2/user/profile/' ,data ,{
        headers:{
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            // 'Authorization': `Bearer ${jwt}`
        }})
}

export async function  getContact(){
    return await  instance.get('v2/user/contact/' ,{
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'Authorization': `Bearer ${jwt}`
        }
    })
}

export async function  postContact(data : any){
    return await  instance.post('v2/user/contact/' ,data  ,{
        headers:{
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            // 'Authorization': `Bearer ${jwt}`
        }})}
export async function  patchContact({data  , id}:any){
    return await  instance.patch('v2/user/contact/'+id+'/' ,data  ,{
        headers:{
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            // 'Authorization': `Bearer ${jwt}`
        }})}


export async function  getCertificate(){
    return await  instance.get('v2/user/certificate/?limit=100' ,{
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'Authorization': `Bearer ${jwt}`
        }
    })
}

export async function  postCertificate(data : any){
    return await  instance.post('v2/user/certificate/' ,data ,{
        headers:{
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            // 'Authorization': `Bearer ${jwt}`
        }
    })
}

export async function  getMembership(){
    return await  instance.get('v2/user/membership/?limit=100' ,{
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'Authorization': `Bearer ${jwt}`
        }
    })
}

export async function  getEmployees(){
    return await  instance.get('v2/user/employees/' ,{
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
}
export async function  postMembership(data : any){
    return await  instance.post('v2/user/membership/' ,data ,{
        headers:{
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            'Authorization': `Bearer ${jwt}`}})
}

export async function postAddress(data: any){
    return await  instance.post('v2/user/user-address/',data)
}

export async function  getAddresses(){
    return await  instance.get('v2/user/user-address/' ,)
}



export async function  getSocials(){
    return await  instance.get('v2/user/social-contact/' ,{
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'Authorization': `Bearer ${jwt}`
        }
    })
}
export async function  postSocials(data : any){
    return await  instance.post('v2/user/social-contact/' ,data  ,{
        headers:{
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            // 'Authorization': `Bearer ${jwt}`
        }})
}
export async function  patchSocials({data  , id}:any){
    return await  instance.patch('v2/user/social-contact/'+id+'/' ,data  ,{
        headers:{
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            // 'Authorization': `Bearer ${jwt}`
        }})
}

export async function postEmployee (data : any){
    return await instance.post('v2/user/employees/' ,data )
}

export async function  getProjects(){
    return await instance.get('v2/user/project/?limit=100')
}

export async function postProjects (data : any){
    return await instance.post('v2/user/project/' ,data ,{
        headers:{
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            // 'Authorization': `Bearer ${jwt}`
        }
    })
}

export async function updateProjects ({data , id} : any){
    return await instance.patch(`v2/user/project/${id}` ,data )
}

export async function deleteProjects ({data , id} : any){
    return await instance.delete(`v2/user/project/${id}` ,data )
}

export async function getAllBlogs(){
    return await axios.get('https://api.azprovider.com/api/blog/get-all-posts/')
}

export async function getSiteStatistics(){
    return await instance.get('v2/statistics/site-stats/')
}
