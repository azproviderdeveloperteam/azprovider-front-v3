'use client'
import {createContext, useContext, useEffect, useReducer} from "react";
import {baseUrl} from "@/utils/config";
import Pusher from 'pusher-js';
import {useQuery} from "@tanstack/react-query";
import {getProfile} from "@/services/userProfileServices";

//types
// type chatType = {
//
// }

const ChatContext = createContext({})
const ChatContextDispatcher =createContext({})

const pusher = new Pusher("527a5a80b22f8ace48f1" ,{cluster: "ap2"} )

const initialState:any = {
    users : [] ,
    chatBox : [] ,
    deskChat : [],
    newChat : false,
    timeNow :'',
    searching : false ,
    searchedUsers : [],
    fromQuickChatId:'',

}


const reducer = (state : any , action : any ):any=> {

    switch (action.type) {
        case "SET_ALL_CHAT" :
            return {...state,
                users: action?.users ,
                chatBox : action?.chatBox ,
                newChat : action?.chatBox,
                timeNow : action?.timeNow,
                deskChat : action?.deskChat
            }

        case 'SET_DESK' :
            return  {...state , deskChat : action?.value}

        case 'SET_TIME_NOW' :
            return  {...state , timeNow : action?.value}

        case 'SET_CHAT_BOX' :
            return  {...state , chatBox : action?.value}

        case 'ON_USER_SEARCH' :
            return {...state , searchedUsers : action?.value , searching : true}

        case 'STOP_SEARCHING' :
            return {...state ,  searchedUsers : [] , searching : false}

        case 'FROM_QUICK_CHAT_ID' :
            return {...state , fromQuickChatId:action?.value}

        // case 'GET_DIRECT_CHAT' :
        //     const d1 = {
        //         "command": "get_direct_chat",
        //         "email" :action?.value
        //     }
        //     try {
        //         socket.send(JSON.stringify(d1))
        //     }catch (err){
        //         socket = new WebSocket(`wss://${baseUrl}/ws/chat/`);
        //     }
        //     return state
        //
        // case 'SEARCH_USERS_BY_SOCKET' :
        //     const d2 = {
        //         "command": "search_users",
        //         "email" :action?.value
        //     }
        //     try {
        //         socket.send(JSON.stringify(d2))
        //     }catch (err){
        //         socket = new WebSocket(`wss://${baseUrl}/ws/chat/`);
        //     }
        //     return state
        //
        // case 'SEND_DIRECT_CHAT' :
        //
        //     const d3 = {
        //         "command": "send_direct_message",
        //         "receiver_email": action?.value?.email,
        //         "text": action?.value?.text,
        //         // ...(action?.replyFrom && {"replied_from": action?.replyFrom}) ,
        //         // ...(action?.file && {"file": action?.file}) ,
        //     }
        //     try {
        //         socket.send(JSON.stringify(d3))
        //     }catch (err){
        //         socket = new WebSocket(`wss://${baseUrl}/ws/chat/`);
        //         // socket.send(JSON.stringify(data))
        //     }
        //     return state

        case 'DEFAULT' : return state
    }
}


const ChatProvider = ({children} : any)=>{
    const [chatData , dispatch ] = useReducer(reducer,initialState)
    const {data , isLoading , error} = useQuery({
        queryKey:['get-user-profile-header'],
        queryFn:getProfile,
        retry:false ,
        refetchOnWindowFocus: true
    })

    useEffect(() => {
        const userId = data?.data?.id
        const channel = pusher.subscribe(`chat-messages-${userId}`);

        channel.bind(`new-chat-messages-${userId}`, (data : any) => {
            console.log(`Event received: ${data}`);
            dispatch({type:"SET_DESK" , value :data})
        });

        return () => {
            pusher.unsubscribe('notification-1');
        };

    }, [data]);
    return(
        <ChatContext.Provider value={{chatData}}>
            <ChatContextDispatcher.Provider value={dispatch}>
                {children}
            </ChatContextDispatcher.Provider>
        </ChatContext.Provider>
    )
}

export default ChatProvider;
export const useChat :any = ()=> useContext(ChatContext)
export const useChatAction = ()=> useContext<any>(ChatContextDispatcher)



