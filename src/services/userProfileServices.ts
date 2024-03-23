import instance from "@/services/instance";
import {getJWT} from "@/utils/helpers";
const jwt = getJWT('from getMeService')

export async function getProfile(){
    return await instance.get('user/get-data/',{
        headers:{
            accept: 'application/json',
            'Content-Type': 'application/json',
            Accept:'application/json',
            // Authorization: `Bearer ${jwt}`
        }
    })
}