import React from 'react';
import {useChat, useChatAction} from "../../../contexts/ChatContext";
import {useRouter} from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const ChatDashboard = ({viewJustChat, setViewJustChat} : any) => {

    const chatDispatch = useChatAction()
    // const {chatData} = useChat()
    const {chatData} = useChat()


    return (
        // <div className='w-full flex flex-col items-center justify-start bg-primary-gray-100 p-5 rounded-[1.5rem] mt-4'>

        <div className={`relative w-full  bg-primary-gray-100 rounded-[15px] px-[1.5vw] xl:px-[20px] py-[1.5vw] xl:py-[14px] text-primary-dark-b ${viewJustChat ? "h-full"  : "aspect-[0.9]  mt-2"}`}>
            <h2 className="w-full text-left text-primary-dark-b px-[4vw] md:px-0 text-[2.8vw] md:text-[1.3vw] xl:text-sm font-normal uppercase cursor-pointer" onClick={()=>{

                setViewJustChat(!viewJustChat)
            }}>
                {!viewJustChat ? 'Request Lists' : 'Back'}
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
                                    <div
                                        // href={'/dashboard/profile/chat'}
                                        key={index+1}
                                        onClick={()=>{
                                            setViewJustChat(true)
                                            chatDispatch({type:"SET_CHAT_BOX" , value:item})
                                            // router.push('/dashboard/profile/chat')
                                        }}
                                        className={`${item?.uuid === chatData?.chatBox?.uuid ? 'bg-secondary-yellow' : ''} mt-2 w-full cursor-pointer m-auto px-[2vw] md:px-[1px]  py-2 md:py-1 xl:py-4    flex flex-row items-center justify-between shadow-[0px_2px_6px_0px_#0000001A] my-1 rounded-[1rem]`}>
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
                                                {item?.creator_user?.first_name == null ?  item?.creator_user?.email: `${item?.creator_user?.first_name} ${item?.creator_user?.last_name}`}
                                            </div>
                                            <div className='text-[13px] w-[75%] mt-[1vw] md:mt-[2px] xl:mt-1 truncate overflow-hidden text-[3vw] md:text-[1.1vw] xl:text-sm'>
                                                {item?.description}
                                            </div>
                                        </div>
                                        {/*<div className='h-[50px] flex flex-col items-center justify-start text-primary-dark-b/40 text-[1.8vw] md:text-[0.9vw] xl:text-sm'>*/}
                                        {/*    {date?.toLocaleTimeString('en-US' ,{hour12:false,hour: '2-digit', minute:'2-digit'})}*/}
                                        {/*</div>*/}
                                    </div>
                                )
                            })
                        }
                    </div>
            }

        </div>
    );
};



export default ChatDashboard;