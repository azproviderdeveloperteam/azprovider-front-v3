import instance from "@/services/instance";




export async function getLandingWelcomeVideo(){
    return await instance.get('v2/help/landing')
}

