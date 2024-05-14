import instance from "@/services/instance";

export async function getBenefits(){
    return await instance.get('benefit/get-data/')
}

export  async function getTestimonial (){
    return await instance.get('testimonial/get-data/')
}

