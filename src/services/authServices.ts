import instance from "@/services/instance";

export async function  registerSendOtp(data : any){
    return await  instance.post('user/send-verification-code/' ,data)
}
export async function  registerVerify(data:any){
    return await  instance.post('user/verify-account/' ,data?.data  ,{
        headers:{
            accept: 'application/json',
            'Content-Type': 'application/json',
            Accept:'application/json',
            Authorization: `Bearer ${data?.token}`

        }
    })
}

export async function  checkAuthUser(){
    return await  instance.post('user/check-auth/' ,{token:'s'})
}

export async function  registerCompleteProfile(data : any){
    return await  instance.post('user-profile/update-info/' ,data?.data  ,{
        headers:{
            accept: 'application/json',
            'Content-Type': 'application/json',
            Accept:'application/json',
            Authorization: `Bearer ${data?.token}`

        } })
}

export async function  registerSetPassword(data : any){
    return await  instance.post('user/change-password/' ,data?.data  ,{
        headers:{
            accept: 'application/json',
            'Content-Type': 'application/json',
            Accept:'application/json',
            Authorization: `Bearer ${data?.token}`

        } })
}

export async function  loginUser(data : any){
    return await  instance.post('user/login/' ,data )
}
export async function  loginSendOtp(data : any){
    return await  instance.post('user/send-otp/' ,data , {
        headers:{
            accept: 'application/json',
            'Content-Type': 'application/json',
            Accept:'application/json',


        }
    })
}
export async function getHsCodes(){
    return await instance.get('hscodes/get-data/')
}