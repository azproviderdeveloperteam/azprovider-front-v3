import instance from "@/services/instance";

export async function  registerSendOtp(data : any){
    return await  instance.post('user/send-verification-code/' ,data)
}
export async function  registerVerify(data : any){
    return await  instance.post('user/verify-account/' ,data )
}

export async function  checkAuthUser(){
    return await  instance.post('user/check-auth/' ,{token:'s'})
}

export async function  registerCompleteProfile(data : any){
    return await  instance.post('user-profile/update-info/' ,data )
}

export async function  registerSetPassword(data : any){
    return await  instance.post('user/change-password/' ,data )
}

export async function  loginUser(data : any){
    return await  instance.post('user/login/' ,data )
}

export async function getHsCodes(){
    return await instance.get('hscodes/get-data/')
}