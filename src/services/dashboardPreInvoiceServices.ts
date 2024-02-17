import instance from "@/services/instance";

export async function  getDashboardPreInvoice(){
    return await  instance.get('pre-invoices/all_pre_invoices/' ,{params:{page_size:1000} })
}

export async function  cretePreInvoice(data : any){
    return await  instance.post('pre-invoices/create/',data)
}


export async function  cretePreInvoiceUploadImage(data : any){
    return await  instance.post('pre-invoices/create/',data , {headers:{"Content-Type":"multipart/form-data"}})
}