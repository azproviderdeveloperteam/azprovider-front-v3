import React, {useState} from 'react';
import {useChat, useChatAction} from "../../contexts/ChatContext";
import ChatDashboard from "@/components/dashboardPages/dahsboard/ChatDashboard";
import ViewRequest from "@/components/dashboard/ViewRequest";

const CompleteChatView = ({viewJustChat ,setViewJustChat} : any) => {

    const [chatMessages , setChatMessages] = useState(undefined)
    const chatDispatch = useChatAction()
    const {chatData} = useChat()



    const getDirectChat = (email : any) =>{

        chatDispatch({type:"GET_DIRECT_CHAT" , value:email})
    }

    const searchUsersBySocket = (email : any) =>{
        chatDispatch({type:"SEARCH_USERS_BY_SOCKET" , value:email})

    }

    const sendIDirectChat = (d : any) =>{

    }


    const firstFunction = () =>{
        setTimeout(()=>{
            if(chatData?.fromQuickChatId){
                getDirectChat(chatData?.fromQuickChatId)
            }
        },1000)
    }


    return (
        <div className='w-full md:bg-[#F8F8F8] h-[calc(100dvh-136px)] rounded-2xl overflow-hidden'>
            <div className={'w-full h-full flex flex-col md:flex-row items-start justify-between'}>
                <div className={`${ chatData?.chatBox?.total_messages !== undefined ? 'h-full md:block md:h-full' : 'h-full md:block md:h-full'} w-full md:w-[30%]  `}>
                    <ChatDashboard viewJustChat={viewJustChat} setViewJustChat={(e)=>setViewJustChat(e)}/>
                    {/*    deskChat={chatData?.deskChat}*/}
                    {/*    setChat={getDirectChat}*/}
                    {/*    searchUsersBySocket={searchUsersBySocket}*/}
                    {/*/>*/}
                </div>

                <div className={`${ chatData?.chatBox?.total_messages === undefined ? 'h-[0px] hidden md:block md:h-full' : 'h-full md:block md:h-full'} w-full md:w-[70%] `}>
                    {
                        chatData?.chatBox?.description === undefined ?
                            <div className='w-full h-full flex flex-col items-center justify-center'>
                                <div>
                                    Select a request
                                </div>
                            </div>
                            :
                            <ViewRequest req={ chatData?.chatBox}/>
                            // <ChatConversation item={chatData?.chatBox}  sendMessage={sendIDirectChat}/>
                    }
                </div>
            </div>
        </div>
    );
};

export default CompleteChatView;