import React from 'react';
import {useChat, useChatAction} from "../../../contexts/ChatContext";
import {useRouter} from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const ChatDashboard = () => {

    const chatDispatch = useChatAction()
    // const {chatData} = useChat()
    const {chatData} = useChat()

    const router = useRouter()

    return (
        // <div className='w-full flex flex-col items-center justify-start bg-primary-gray-100 p-5 rounded-[1.5rem] mt-4'>

        <div className='relative w-full mt-2 aspect-[0.9] bg-primary-gray-100 rounded-[15px] px-[1.5vw] xl:px-[20px] py-[1.5vw] xl:py-[14px] text-primary-dark-b'>
            <h2 className="w-full text-left text-primary-dark-b px-[4vw] md:px-0 text-[2.8vw] md:text-[1.3vw] xl:text-sm font-normal uppercase">
                Chats
            </h2>

            {/*<div className='w-full  flex flex-col items-center justify-start mt-[26%]'>*/}
            {/*    <Image src={'/no-chat.svg'} alt={'no-chat'} className='w-1/2'  width={10} height={10} />*/}
            {/*    <div className="text-center text-primary-dark-b text-[3.5vw] md:text-[1.4vw] xl:text-base font-semibold mt-2 ">There is no conversation</div>*/}
            {/*</div>*/}

            {
                chatData?.deskChat?.length === 0 ?
                    <div className='w-full  flex flex-col items-center justify-start mt-[26%]'>
                        <div className="text-center text-primary-dark-b text-[3.5vw] md:text-[1.4vw] xl:text-base font-semibold mt-2 ">There is no conversation</div>
                    </div>

                    :
                    <div className='w-full h-[calc(100%-20px)] overflow-auto '>
                        {
                            chatData?.deskChat?.map((item : any, index : number)=>{
                                const r = Math.floor(Math.random() * 69);
                                const date = new Date(item?.created_at)
                                return(
                                    <Link
                                        href={'/dashboard/profile/chat'}
                                        key={index+1}
                                        onClick={()=>{

                                            chatDispatch({type:"GET_DIRECT_CHAT" , value:item?.chat_with?.email})
                                            // router.push('/dashboard/profile/chat')
                                        }}
                                        className='w-full cursor-pointer m-auto px-[2vw] md:px-[1px]  py-2 md:py-1 xl:py-4 border-b-[1px] border-[#464C5A] flex flex-row items-center justify-between'>
                                        {/*<div className='w-[20%] xl:w-[50px] md:w-[20%] relative'>*/}
                                        {/*    {item?.chat_with?.avatar ?*/}
                                        {/*        <img src={`${item?.chat_with?.avatar}`}*/}
                                        {/*             className='w-full aspect-square rounded-full object-cover'*/}
                                        {/*        />                    :*/}
                                        {/*             <Image src={'/no-image.svg'} alt={'bookmark-not-fill.svg'} width={500} height={500} className={'w-full aspect-[1] object-cover rounded-[2rem]'}/>*/}

                                        {/*    }*/}
                                        {/*    {*/}
                                        {/*        item?.is_read === false &&*/}
                                        {/*        <div className='absolute w-[12px] aspect-square rounded-full bg-[#3282EB] translate-y-[-13px] translate-x-[37px] ' />*/}

                                        {/*    }*/}

                                        {/*</div>*/}

                                        <div className='grow ml-[3vw] md:ml-2 xl:ml-3 flex flex-col items-start justify-center'>
                                            <div className='font-bold text-[12px] break-all text-[2.7vw] md:text-[1vw] xl:text-sm'>
                                                {item?.chat_with?.first_name == null ?  item?.chat_with?.email: `${item?.chat_with?.first_name} ${item?.chat_with?.last_name}`}
                                            </div>
                                            <div className='text-[13px] w-[75%] mt-[1vw] md:mt-[2px] xl:mt-1 truncate overflow-hidden text-[3vw] md:text-[1.1vw] xl:text-sm'>
                                                {item?.text}
                                            </div>
                                        </div>
                                        <div className='h-[50px] flex flex-col items-center justify-start text-primary-dark-b/40 text-[1.8vw] md:text-[0.9vw] xl:text-sm'>
                                            {date?.toLocaleTimeString('en-US' ,{hour12:false,hour: '2-digit', minute:'2-digit'})}
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
            }

        </div>
    );
};



export default ChatDashboard;