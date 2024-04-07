'use client'
import React, {useEffect, useState} from 'react';
import {useMegaMenu, useMegaMenuAction} from "../../contexts/MegaMenuContext";
import {Drawer, IconButton, Input, Tooltip} from "@material-tailwind/react";
import MainLogoImg from "@/components/Logo/MainLogoImg";
import {texts} from "@/utils/texts";
import GreenGrayBtn from "@/components/Buttons/GreenGrayBtn";
import RegisterBtn from "@/components/Buttons/RegisterBtn";
import Image from "next/image";
import {SwiperSlide} from "swiper/react";
import AzSwiperTitleComponent from "@/components/azSwiper/AzSwiperTitleComponent";
import ProductCategoryCard from "@/components/Cards/ProductCategoryCard";
import {useMutation} from "@tanstack/react-query";
import {getMegaMenu} from "@/services/megaMenuServices";
type cat = {
    title :string ,
    href :string
}
const MegaMenuOpened = () => {
    const text = texts.eng
    const myTexts = text.homePage.welcomeCard
    const {menu} = useMegaMenu()
    const dispatch = useMegaMenuAction()

    const [search , setSearch] = useState<string | undefined>('')
    const [filter , setFilter] = useState<string | undefined>('products')

    const onClose = () =>{
        dispatch({type:"CLOSE_MEGA_MENU"})
    }

    const changeInput = (e : string | undefined)=>{

        setSearch(e)
    }

    const changeFilters = (e : string) =>{
        setFilter(e)
    }
    const categories = [
        {title :"Products", href : "products"} ,
        {title :"Services", href : "services"} ,
        {title :"Innovations", href : "innovations"} ,
        {title :"Pre-Invoices", href : "preInvoices"} ,
        {title :"Companies", href : "companies"} ,
    ]

    const fakeData = [
        {
            src:"/book.svg",
            title:"Book &\n" +
                "Desk Stuf ",
        },
        {
            src:"/mobile.svg",
            title:"Phone ",
        },
        {
            src:"/milk.svg",
            title:"Milk & Animal Protein ",
        },
        {
            src:"/mobile.svg",
            title:"Digital",
        },
        {
            src:"/mobile.svg",
            title:"Bazar Industry ",
        },
        {
            src:"/mobile.svg",
            title:"Phone",
        },
        {
            src:"/mobile.svg",
            title:"Phone",
        },
        {
            src:"/mobile.svg",
            title:"Phone",
        },
        {
            src:"/mobile.svg",
            title:"Phone",
        },
        {
            src:"/mobile.svg",
            title:"Phone",
        },
        {
            src:"/mobile.svg",
            title:"Phone",
        },
        {
            src:"/mobile.svg",
            title:"Phone",
        },
        {
            src:"/mobile.svg",
            title:"Phone",
        },
        {
            src:"/mobile.svg",
            title:"Phone",
        },
        {
            src:"/mobile.svg",
            title:"Phone",
        },

        {
            src:"/mobile.svg",
            title:"Phone",
        },
        {
            src:"/mobile.svg",
            title:"Phone",
        },
        {
            src:"/mobile.svg",
            title:"Phone",
        },
        {
            src:"/mobile.svg",
            title:"Phone",
        },
        {
            src:"/mobile.svg",
            title:"Phone",
        },
        {
            src:"/mobile.svg",
            title:"Phone",
        },
        {
            src:"/mobile.svg",
            title:"Phone",
        },
        {
            src:"/mobile.svg",
            title:"Phone",
        },
        {
            src:"/mobile.svg",
            title:"Phone",
        },
        {
            src:"/mobile.svg",
            title:"Phone",
        },
        {
            src:"/mobile.svg",
            title:"Phone",
        },
        {
            src:"/mobile.svg",
            title:"Phone",
        },
        {
            src:"/mobile.svg",
            title:"Phone",
        },
        {
            src:"/mobile.svg",
            title:"Phone",
        },
        {
            src:"/mobile.svg",
            title:"Phone",
        },
        {
            src:"/mobile.svg",
            title:"Phone",
        },
        {
            src:"/mobile.svg",
            title:"Phone",
        },
        {
            src:"/mobile.svg",
            title:"Phone",
        },

    ]


    const {data  , isPending  , error  , mutateAsync} =useMutation({
        mutationFn : getMegaMenu
    })


    const getMenu = async () =>  {
        try {
            const a = await mutateAsync({type:"hscode"})
        }catch (e) {

        }
    }
    useEffect(()=>{
        getMenu()
    },[])
    return (
        <Drawer
            placement="top"
            open={menu?.menu}
            onClose={onClose}
            className="bg-white rounded-b-[3rem] h-auto"
            size={1000}
        >
            <div className='w-full '>
                <div className='max-w-[95vw] m-auto w-full flex flex-row items-center justify-between'>
                    <div className='max-w-[95vw] m-auto w-full h-20 flex flex-row item-center justify-between'>
                        <MainLogoImg className={'w-[10rem]'}  black={true}/>
                    </div>

                    <div className=' w-full h-20 flex flex-row items-center justify-between px-4'>
                        <div className='lg:w-2/3 md:w-[85%] w-1/2 max-w-[53rem] border-[1px] border-secondary-yellow h-16  rounded-[1.1rem] flex flex-row items-center justify-between px-1 py-1 '>
                            <input
                                value={search}
                                onChange={(e)=>changeInput(e.target.value)}
                                className={'grow !h-full border-none outline-0 !outline-transparent !outline-none text-primary-dark-b focus:!outline-none focus:border-none'}
                                placeholder={'Search By HS Code Or Title'}
                            />
                            <RegisterBtn otherClass={'!min-h-full !rounded-[1.1rem] !w-[33%] !p-0'}>
                                {'Search'}
                            </RegisterBtn>
                        </div>
                        <IconButton className={'bg-transparent focus:shadow-none'} onClick={onClose}>
                            <Image src={'/exit.svg'} alt={'exit.svg'} width={15} height={15} />
                        </IconButton>
                    </div>

                </div>

                <div className='max-w-[95vw] m-auto w-full flex flex-row items-center justify-between my-5'>
                    <div className={'flex flex-row items-center justify-start'}>
                        <div className='text-[#A1A1A1] text-[0.8rem]'>
                            Categories:
                        </div>
                        {
                            categories.map((item:cat , index:number)=>{
                                return(
                                    <div
                                        key={index+1}
                                        onClick={()=>changeFilters(item.href)}
                                    >
                                        <GreenGrayBtn active={filter === item.href}>
                                            {item.title}
                                        </GreenGrayBtn>
                                    </div>

                                )
                            })
                        }
                    </div>


                </div>
                <div className='max-w-[95vw] m-auto w-full flex flex-row items-center justify-between my-5'>
                    <AzSwiperTitleComponent countDesktop={15} countMobile={2} title={''} count={fakeData?.length} allLink={'#'}>
                        {
                            fakeData?.map((item:any ,index:number) => (
                                <SwiperSlide key={index}>
                                    <div className={`${index===0 ? ' ' :''} pb-7 px-2`} key={index+1}>
                                        <ProductCategoryCard src={item.src} title={item.title} color={'dark'}/>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </AzSwiperTitleComponent>
                </div>


                <div className='max-w-[95vw] m-auto w-full flex flex-row items-center justify-between my-5'>
                    <AzSwiperTitleComponent countDesktop={10} countMobile={2} title={''} count={fakeData?.length} allLink={'#'}>
                        {
                            fakeData?.map((item:any ,index:number) => (
                                <SwiperSlide key={index}>
                                    <div className='w-full flex flex-col items-start justify-start'>
                                        <div className='font-bold text-[1.1rem]'>
                                            Title
                                        </div>
                                        <div className='w-full'>
                                            {
                                                [...Array(10)].map((itm : any , idx: number)=>{
                                                    return(
                                                        <Tooltip  key={idx+1} content={item?.title} placement="top" className={'z-[99999]'}>
                                                            <h4 className={`mt-3 text-primary-dark-b/60 w-full text-left text-[0.8rem] font-bold px-[5%] truncate`}>
                                                                {item?.title}
                                                            </h4>
                                                        </Tooltip>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </AzSwiperTitleComponent>
                </div>


            </div>

        </Drawer>
    );
};

export default MegaMenuOpened;