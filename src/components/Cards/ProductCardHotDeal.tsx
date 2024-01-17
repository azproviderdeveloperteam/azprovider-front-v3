'use client'
import React, {useEffect, useState} from 'react';
import {Button, Carousel, IconButton, Tooltip} from "@material-tailwind/react";
import hexagon from '@/public/red-hexagon.svg'
import Image from "next/image";
import {useMutation, useQuery} from "@tanstack/react-query";
import { editProduct} from "@/services/dashboardProductsServices";
import AzDialog from "@/components/dialog/AzDialog";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import MainInput from "@/components/inputs/MainInput";
import {texts} from "@/utils/texts";
import {getAllMeasure} from "@/services/measurementServices";
import Select from "react-select";
import RegisterBtn from "@/components/Buttons/RegisterBtn";
import toast from "react-hot-toast";
import {AxiosError} from "axios";

const ProductCardHotDeal = ({item , theme , measureOptions , setSubmitting , submitting} : any) => {
    const [dialog ,setDialog] = useState(false)
    const [selectedMeasure , setSelectedMeasure] = useState<any>({value:'kilogram', label : 'kilogram'} )


    const fakeData = [
        {
            img :"https://www.oorchinfile.com/wp-content/uploads/2023/06/red-cherries-plate_-crc0f484db6-_size17.20mb_7360x4912.jpg" ,
        },
        {
            img :"https://www.oorchinfile.com/wp-content/uploads/2023/06/mixture-fresh-nuts-spilled-from-linen-bag-onto-gr_-crc9e130893-_size5.34mb_3775x2517.jpg" ,
        },
        {
            img :"https://www.oorchinfile.com/wp-content/uploads/2023/06/mixture-fresh-nuts-spilled-from-linen-bag-onto-gr_-crc9e130893-_size5.34mb_3775x2517.jpg" ,
        }
    ]
    const monthNamesFull = [ "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December" ];

    const monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

    const {data : createData  , isPending : createPending , error :createError , mutateAsync : createMutateAsync } =useMutation({
        mutationFn : editProduct
    })

    const text = texts.eng
    const myTexts = text.dashboard.pages.hotDeal.addForm

    const schema = Yup
        .object({

        }).shape({
            hotDealPrice:Yup.number(),
            hotDealSize:Yup.number(),
        })
        .required()
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors,isSubmitting, isDirty, isValid },
        getValues
    } = useForm({ resolver: yupResolver(schema), mode:'onChange'})

    const submit = async (d : any) =>{
        const formData = {
            hot_deal	:true ,
            hot_deal_price :d?.hotDealPrice,
            hot_deal_size :d?.hotDealSize,
            hot_deal_measure:selectedMeasure?.label
        }
        try {
            const d = await createMutateAsync({formData , id : item?.id})
            setDialog(false)
            toast.success("Your Product Added To Az Provider On Sales successfully!")
        }catch (err) {
            setDialog(false)
            if(err instanceof AxiosError){
                if(err?.response?.data?.msg){
                    toast.error(err?.response?.data?.msg)
                }else if(err?.response?.data?.message){
                    toast.error(err?.response?.data?.message)
                } else {
                    toast.error('An Error occurred')
                }
            }
        }
    }


    return (
        <>

            <div className={`${item?.hot_deal ?"" :"opacity-70"} w-full flex flex-col items-center justify start`}>

                <div className={` w-full aspect-[0.7334] flex flex-col items-center justify-between rounded-[1.6rem] ${theme==='dark' ?'bg-primary-dark-b shadow-[0px_12px_20px_0px_#062940]' : 'bg-white shadow-[0px_12px_20px_0px_rgba(0,_0,_0,_0.10)]' } `}>
                    <div className='w-full flex flex-col items-center justify-start'>
                        <div className='relative w-full aspect-[1.4268] h-auto' >
                            {/*<Carousel*/}
                            {/*    transition={{ duration: 1 }} className="font-roboto rounded-[1.6rem] w-full h-full "*/}
                            {/*    autoplay={true}*/}
                            {/*    autoplayDelay={5000}*/}
                            {/*    loop={true}*/}
                            {/*    prevArrow={({ handlePrev }:any) => (null) }*/}
                            {/*    nextArrow={({ handleNext }) => (null)}*/}
                            {/*    navigation={({ setActiveIndex, activeIndex, length }) => (*/}
                            {/*        <div className="absolute bottom-2 left-[46%] z-1 flex -translate-x-2/4 gap-2">*/}
                            {/*            {fakeData?.map((_, i) => (*/}
                            {/*                <span*/}
                            {/*                    key={i}*/}
                            {/*                    className={`block  h-[2vw] md:h-[1vw] xl:h-2 cursor-pointer rounded-full transition-all content-[''] ${*/}
                            {/*                        activeIndex === i ? "w-[4vw] md:w-[4vw] xl:w-10 bg-[#D7D7D7]" : "w-[4vw] md:w-[1vw] xl:w-2 bg-[#D7D7D7]"*/}
                            {/*                    }`}*/}
                            {/*                    onClick={() => setActiveIndex(i)}*/}
                            {/*                />*/}
                            {/*            ))}*/}
                            {/*        </div>*/}
                            {/*    )}*/}
                            {/*>*/}
                            {/*    {*/}
                            {/*        fakeData.map((item , index)=>{*/}
                            {/*            return(*/}
                            {/*                <img src={item.img} key={index+1} className='w-full h-full object-center object-cover'/>*/}
                            {/*            )*/}
                            {/*        })*/}
                            {/*    }*/}
                            {/*</Carousel>*/}
                            {
                                item?.image
                                    ? <Image alt={'aaa'} src={`${process.env.MEDIA_URL}${item?.image}`} width={235} height={235}  className='w-full aspect-[1.4268] rounded-[1.6rem] object-center object-cover'/>
                                    :
                                    <Image alt={'aaa'} src={`/no-image.svg`} width={235} height={235} className='w-full aspect-[1.4268] object-center object-cover rounded-[1.6rem]' />
                            }
                            <div className='absolute w-full h-full top-0 left-0'>
                                <div className='w-full flex flex-row items-center justify-between pt-3 px-[5%]'>
                                    <div className='w-1/2 flex flex-row items-center justify-start text-[0.8rem]'>
                                        <div className='bg-white px-2 text-primary-dark-b rounded-[5px]'>
                                            #1231243
                                        </div>

                                        {
                                            item?.size &&
                                            <div className='bg-primary-dark-b  px-2 text-white rounded-[5px] ml-[5px]'>
                                                {item?.size}
                                            </div>
                                        }

                                    </div>
                                    <div className={'w-1/2 flex flex-row items-center justify-center text-[0.8rem]'}>
                                        {
                                            item?.discount_expire_date &&
                                            <div className='bg-[#FF4A23] pl-2 pr-[16px]  translate-x-[12px] text-white rounded-[5px]'>
                                                47:24:15
                                            </div>
                                        }

                                        {
                                            item?.discount_percentage &&
                                            <div style={{backgroundImage:`url(${hexagon.src})`}} className='relative z-10 w-[30%] bg-center bg-cover aspect-square flex flex-row items-center justify-center text-white font-bold'>
                                                15%
                                            </div>

                                        }

                                    </div>

                                </div>

                            </div>
                        </div>



                        <div className='w-full flex flex-row items-center justify-start mt-2 px-[5%]'>
                            <Image src={'/dark-medal.svg'} alt={'dark-medal'} width={20} height={20} />
                            <div className={`${theme === 'dark' ? 'text-white' : 'text-primary-dark-b' } text-[0.7rem] ml-1 mt-1`}>
                                { item?.granted_organization  ? item?.granted_organization : ' - '}
                            </div>
                        </div>


                        <Tooltip content={item?.title} placement="top">
                            <h4 className={`${theme === 'dark' ? 'text-white' : 'text-primary-dark-b' } w-full text-left text-[1.2rem] font-bold px-[5%] truncate`}>
                                {item?.title}
                            </h4>
                        </Tooltip>

                        <div className='w-full px-[5%] flex flex-row items-center justify-start'>
                            <div className='bg-[#A1A1A1]     px-2 text-[0.7rem] text-primary-dark-b rounded-[0.3rem] flex flex-row items-center justify-start'>
                                <Image src={'/star.svg'} alt={'star'} width={11} height={11} />
                                <div className='ml-1 font-bold mt-1'>
                                    { item?.rate  ? item?.rate : ' - '}

                                </div>
                            </div>
                            <div className='text-[#A1A1A1] ml-1 truncate'>
                                { item?.brand_name  ? item?.brand_name : ' - '}
                            </div>
                        </div>
                        <p className={`w-full mt-2 px-[5%] text-[0.8rem] text-justify ${theme === 'dark' ? 'text-white' : 'text-primary-dark-b' } line-clamp`}>
                            { item?.short_description  ? item?.short_description : ' - '}
                        </p>
                    </div>

                    <div className='w-full px-[5%] pb-3 text-[0.7rem]'>
                        <div className='flex flex-row items-center justify-start'>
                            <Image src={'/union.svg'} alt={'union'} width={10} height={10} />
                            <div className='ml-1 text-[#FF4B23]  '>

                                <span className='text-[0.6rem] absolute translate-y-[-0.6rem] line-through text-[#A1A1A1]'> { item?.hot_deal_price ? item?.price  : ''} </span>

                                <span className='font-bold'> { item?.hot_deal_price  ? item?.hot_deal_price : item?.price ? item?.price  : ' - '} </span> <span className='ml-1'> /Cash</span>
                            </div>
                        </div>
                        <div className={`flex flex-row items-center justify-start ${theme === 'dark' ? 'text-white' : 'text-primary-dark-b'} `}>
                            <Image src={'/location.svg'} alt={'location-az-provider'} width={10} height={10} />
                            <div className='ml-1'>
                                {item?.location ? item?.location : ' - '}
                            </div>
                            <div className='font-thin text-[0.7rem] ml-1'>
                                {
                                    item?.publish_date_from ?
                                        `${new Date(item?.publish_date_from)?.getUTCDate()} ${monthNames[new Date(item?.publish_date_from)?.getUTCMonth()] } ${new Date(item?.publish_date_from)?.getUTCFullYear()} - ${new Date(item?.publish_date_to)?.getUTCDate()} ${monthNames[new Date(item?.publish_date_to)?.getUTCMonth()] } ${new Date(item?.publish_date_to)?.getUTCFullYear()}`
                                        :
                                        ' - '
                                }
                            </div>
                        </div>
                    </div>
                </div>



                <Button
                    onClick={()=>{
                        if(item?.hot_deal ){
                            setDialog(true)
                        }else  setDialog(true)
                    }}

                    className={`w-full flex flex-row items-center justify-center mt-2 py-4 bg-transparent hover:scale-[1.1] cursor-pointer transition duration-500 font-roboto capitalize normal-case text-primary-dark-b border-none shadow-none rounded-[1.1rem] bg-primary-dark-b text-white`}>
                    {   item?.hot_deal   ? 'Cancel' : 'Apply'}
                </Button>

            </div>

            <AzDialog open={dialog} handler={()=>setDialog(false)} size={'xl'}>


                <div className='w-full bg-[#F8F8F8] p-5 lg:p-8 rounded-[1rem] relative'>
                    <div className='absolute right-5 top-2'>
                        <IconButton className={'bg-transparent focus:shadow-none'} onClick={()=>setDialog(false)}>
                            <Image src={'/exit.svg'} alt={'exit.svg'} width={15} height={15} />
                        </IconButton>
                    </div>

                    <form className='w-full flex flex-row items-start justify-start flex-wrap mt-4 relative z-10 text-primary-dark-b' onSubmit={handleSubmit(submit)}>
                        <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                            <div className=' text-[1.3rem] capitalize'>
                                {myTexts.hotDealPrice} <span className='text-secondary-red'>*</span>
                            </div>
                            <MainInput
                                register={register}
                                label={'hotDealPrice'}
                                error={errors?.hotDealPrice?.message}
                                name={'hotDealPrice'}
                                type={'number'}
                                placeholder={myTexts.hotDealPrice}
                            />
                        </div>

                        <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                            <div className=' text-[1.3rem] capitalize'>
                                {myTexts.hotDealSize} <span className='text-secondary-red'>*</span>
                            </div>
                            <MainInput
                                register={register}
                                label={'hotDealSize'}
                                error={errors?.hotDealSize?.message}
                                name={'hotDealSize'}
                                type={'number'}
                                placeholder={myTexts.hotDealSize}
                            />
                        </div>

                        <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                            <div className=' text-[1.3rem] capitalize'>
                                {myTexts.hotDealMeasure} <span className='text-secondary-red'>*</span>
                            </div>
                            <Select
                                className={`border border-1 border-slate-700 w-full flex px-3 min-h-[3.85rem] flex-row items-center justify-between bg-transparent rounded-[1.2rem] text-[#A1A1A1] border-[#A1A1A1]`}

                                onChange={(e)=>{

                                    setSelectedMeasure( e)
                                    // getToCurrenciesFunc(e?.value)
                                }}
                                value={selectedMeasure}
                                options={measureOptions}
                                unstyled
                                styles={{
                                    input: (base) => ({
                                        ...base,
                                        base: " hover:cursor-pointer",
                                        fontSize:"9px",
                                        "input:focus": {
                                            boxShadow: "none",
                                        },
                                    }),
                                    multiValueLabel: (base) => ({
                                        ...base,
                                        whiteSpace: "normal",
                                        overflow: "visible",
                                    }),
                                    control: (base) => ({
                                        ...base,
                                        transition: "none",
                                    }),
                                }}

                                classNames={{
                                    control: ({isFocused}) =>' w-full xl:h-[46px] focus:outline-none  text-[16px] px-2 md:px-1  ',
                                    multiValueLabel: () => 'bg-white rounded-xl ',
                                    option: ({ isFocused, isSelected }) =>'bg-white px-4 py-1',
                                }}
                            />
                        </div>

                        <RegisterBtn loading={createPending} otherClass={'w-full lg:w-[12rem] mt-12'} type={'submit'} disabled={false}>
                            Save
                        </RegisterBtn>

                    </form>
                </div>
            </AzDialog>
        </>
    );
};

export default ProductCardHotDeal;