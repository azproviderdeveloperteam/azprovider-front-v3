import axios from "axios";
import {baseUrl} from "@/utils/config";
axios.defaults.withCredentials = true
import Cookies from "js-cookie";


import { getCookie } from "cookies-next"; // For server-side cookies
const isServer = typeof window === "undefined";
const cookieToken2 =  Cookies.get('cookieToken')
const cookieToken = isServer ? getCookie("cookieToken") : null



export const app =  axios.create({
    withCredentials:true,
    baseURL:`https://${baseUrl}`,
    headers:{
        accept: 'application/json',
        'Content-Type': 'application/json',
        Accept:'application/json',
        ...(cookieToken2 && { Authorization: `Bearer ${cookieToken2}` }),
    }
})

app.interceptors.request.use(
    (res)=> res,
    (error)=> Promise.reject(error)
)



app.interceptors.response.use(
    (res)=>{return  res},
    async (error)=>{
        const originalConfig = error.config

        // if(error.response.status === 401 && !originalConfig._retry){
        //     originalConfig._retry = true
        //     try{
        //         const data = await axios.post(`https://${baseUrl}/user/refresh-jwt`,
        //             {'refresh':localStorage.getItem('CFRToken')}
        //             ,
        //             {
        //                 withCredentials : true,
        //                 headers:{
        //                     Authorization :`Bearer ${localStorage.getItem('CFAToken')}`,
        //                 }
        //             })
        //         localStorage.setItem('CFAToken' , data?.data?.access)
        //         if(data) return app(originalConfig)
        //     }
        //     catch (err){
        //         if(!originalConfig.url.toString().includes('user')){
        //         }
        //         return Promise.reject(error)
        //     }
        //
        //
        // }
        return Promise.reject(error)
    }

)

const instance = {
    get: app.get ,
    post : app.post ,
    delete : app.delete ,
    put : app.put ,
    patch : app.patch
}
export default instance