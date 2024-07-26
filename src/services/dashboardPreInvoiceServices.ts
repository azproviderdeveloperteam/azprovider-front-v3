import instance from "@/services/instance";

export async function  getDashboardPreInvoice(){
    return await  instance.get('v2/product/pre-invoice/' )
}

export async function  cretePreInvoice(data : any){
    return await  instance.post('v2/product/pre-invoice/',data)
}


export async function  cretePreInvoiceUploadImage(data : any){
    return await  instance.post('pre-invoices/create/',data , {headers:{"Content-Type":"multipart/form-data"}})
}

export async function deletePreInvoiceDashboard(id : string) {
    return await instance.delete(`v2/product/pre-invoice/${id}/`)
}