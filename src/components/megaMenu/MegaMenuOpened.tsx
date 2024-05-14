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
import {useMutation , useQuery} from "@tanstack/react-query";
import {getCategories, getMegaMenu} from "@/services/megaMenuServices";
import {getMeasureList} from "@/services/measurementServices";
import ThreeDotsLoaderGreen from "@/components/loaders/ThreeDotsLoaderGreen";
import SearchMegaMenu from "@/components/megaMenu/searchMegaMenu";
type cat = {
    title :string ,
    href :string
}

type GetMenuType = {
    type? : string ,
    category? : string,
    hscode?:string,
    title?:string
}
const MegaMenuOpened = () => {
    const text = texts.eng
    const myTexts = text.homePage.welcomeCard
    const {menu} = useMegaMenu()
    const dispatch = useMegaMenuAction()


    const [filter , setFilter] = useState<string | undefined>('hscodes')
    const [selectedCat , setSelectedCat] = useState<string>('')
    const [downView , setDownView] = useState([])
    const onClose = () =>{
        dispatch({type:"CLOSE_MEGA_MENU"})
    }



    const categories = [
        {title :"Hs-Codes", href : "hscodes"} ,
        {title :"Products", href : "products"} ,
        // {title :"Services", href : "services"} ,
        // {title :"Innovations", href : "innovations"} ,
        {title :"Pre-Invoices", href : "preInvoices"} ,
        // {title :"Companies", href : "companies"} ,
    ]



    const {data  , isPending  , error  , mutateAsync} =useMutation({
        mutationFn : getMegaMenu
    })
    const {data : categoriesData, isPending :categoriesPending, error : categoriesError} = useQuery({
        queryKey: ['get-all-categories' ],
        queryFn: getCategories,
        retry:false,
    })

    const getMenu = async (e :GetMenuType) =>  {
        try {
            const a = await mutateAsync({
                ...(e?.type && {type: e.type}) ,
                ...(e?.category && {category: e.category}),
                ...(e?.hscode && {hscode: e.hscode}),
                ...(e?.title && {title: e.title})

            })
            setDownView(a?.data)
        }catch (e) {

        }
    }
    useEffect(()=>{
        if(menu?.menu){
            getMenu({type:"hscode"})
        }
    },[menu])

    const getMenuByCat = (e : any) =>{
        getMenu({type:"hscode" , category : e?.id})
        setSelectedCat(e?.id)
    }


    const changeFilters = (e : string) =>{
        setFilter(e)
        if(e==='hscodes'){
            getMenu({type:'hscode'})
            setSelectedCat('')
        }else {
            getMenu({type:e})
            setSelectedCat(e)
        }
    }

    const searchHscode = (e : string) =>{
        if(e === ''){

        }else if(parseInt(e) > 0){
            setFilter('hscodes')
            setSelectedCat('')
            getMenu({type:'hscode',hscode:e})
        }else {
            setFilter('hscodes')
            setSelectedCat('')
            getMenu({type:'hscode',title:e})
        }
    }
    return (
        <Drawer
            placement="top"
            open={menu?.menu}
            onClose={onClose}
            className="bg-white rounded-b-[3rem] h-auto overflow-auto"
            size={1000}
        >
            <div className='w-full '>
                <div className='max-w-[95vw] m-auto w-full flex flex-row items-center justify-between'>
                    <div className='max-w-[95vw] m-auto w-full h-20 flex flex-row item-center justify-between'>
                        <MainLogoImg className={'w-[10rem]'}  black={true}/>
                    </div>

                    <div className=' w-full h-20 flex flex-row items-center justify-between px-4'>
                        <SearchMegaMenu searchHscode={searchHscode}/>
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
                    <AzSwiperTitleComponent countDesktop={10} countMobile={5} title={''} count={categoriesData?.data} allLink={'#'}>
                        {
                            categoriesData?.data?.map((item:any ,index:number) => (
                                <SwiperSlide key={index}>
                                    <div className={`${index===0 ? ' ' :''} pb-7 px-2 ${selectedCat === item?.id ? '': selectedCat=== '' ? '' : 'opacity-40'}`} key={index+1} onClick={()=>getMenuByCat(item)}>
                                        <ProductCategoryCard src={item?.media_files?.[1]?.image ? item?.media_files?.[1]?.image : item?.media_files?.[0]?.image} title={item?.title} color={'dark'}/>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </AzSwiperTitleComponent>
                </div>


                <div className='max-w-[95vw] m-auto w-full flex flex-row items-start justify-start my-5'>
                    {
                        isPending ?
                            <div className='w-full flex flex-row items-center justify-center py-10'>
                                <ThreeDotsLoaderGreen />
                            </div>
                            :

                            downView?.length > 10 ?
                            <AzSwiperTitleComponent countDesktop={10} countMobile={5} title={''} count={downView?.length} allLink={'#'}>
                                {
                                    downView?.map((item:any ,index:number) => (
                                        <SwiperSlide key={index}>
                                            <div className='w-full flex flex-col items-start justify-start'>
                                                <Tooltip content={item?.title} placement="top" className={'z-[99999]'}>
                                                    <div className='font-bold text-primary-dark-b text-[1.1rem] w-full truncate'>
                                                        {`#${item?.hscode} ${item?.title}`}
                                                    </div>
                                                </Tooltip>
                                                <div className='w-full'>
                                                    {
                                                        item?.children.map((itm : any , idx: number)=>{
                                                            return(
                                                                <Tooltip  key={idx+1} content={itm?.title} placement="top" className={'z-[99999]'}>
                                                                    <h4 className={`mt-3 text-primary-dark-b/60  text-left text-[0.8rem] font-bold px-[5%] w-full truncate`}>
                                                                        {`#${itm?.hscode} ${itm?.title}`}
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
                            :

                            downView?.map((item:any ,index:number) => (
                                <div key={index} className='w-1/5 lg:w-[10%] '>
                                    <div className='w-full flex flex-col items-start justify-start'>
                                        <Tooltip content={item?.title} placement="top" className={'z-[99999]'}>
                                            <div className='font-bold text-primary-dark-b text-[1.1rem] w-full truncate'>
                                                {`#${item?.hscode} ${item?.title}`}
                                            </div>
                                        </Tooltip>
                                        <div className='w-full'>
                                            {
                                                item?.children.map((itm : any , idx: number)=>{
                                                    return(
                                                        <Tooltip  key={idx+1} content={itm?.title} placement="top" className={'z-[99999]'}>
                                                            <h4 className={`mt-3 text-primary-dark-b/60  text-left text-[0.8rem] font-bold px-[5%] w-full truncate`}>
                                                                {`#${itm?.hscode} ${itm?.title}`}
                                                            </h4>
                                                        </Tooltip>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                    }

                </div>


            </div>

        </Drawer>
    );
};

export default MegaMenuOpened;