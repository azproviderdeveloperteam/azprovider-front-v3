import instance from "@/services/instance";
// export async function  sendChatReq(data : any){
//     return await  instance.post('chat/chat-request/' ,data )
// }
export async function  sendChatReq(data : any){
    return await  instance.post('v2/product/request/' ,data )
}


export async function  sendChatReqPreInvoice(data : any){
    return await  instance.post('v2/product/pre-invoice/request/' ,data )
}


export async function  sendChatMessage(data : any){
    return await  instance.post('chat/start-chat/' ,data )
}

// export async function  getUserChats() {
//     return await instance.get('chat/get-user-chats/')
// }

export async function  getUserChats() {
    return await instance.get('v2/product/request/')
}
