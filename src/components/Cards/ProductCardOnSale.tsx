'use client'
import React, {useEffect, useState} from 'react';
import {Button, Carousel, DialogFooter, DialogHeader, IconButton, Tooltip} from "@material-tailwind/react";
import hexagon from '@/public/red-hexagon.svg'
import Image from "next/image";
import {useMutation, useQuery} from "@tanstack/react-query";
import {editProduct, onSaleProduct} from "@/services/dashboardProductsServices";
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
import GreenGrayBtn from "@/components/Buttons/GreenGrayBtn";

const ProductCardOnSale = ({item , theme , measureOptions , setSubmitting , submitting} : any) => {
    const [dialog ,setDialog] = useState(false)
    const [cancelDialog , setCancelDialog] = useState(false)
    const [selectedMeasure , setSelectedMeasure] = useState<any>(null )


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
        mutationFn : onSaleProduct
    })

    const text = texts.eng
    const myTexts = text.dashboard.pages.onSale.addForm

    const schema = Yup
        .object({

        }).shape({

            onSalePrice: Yup.number()
                .required("onSalePrice is required")
                .test(
                    "is-in-range",
                    "On Sale Price must be between 1% and 7% of the original price",
                    function (value) {
                        const originalPrice = item?.price; // مقدار اصلی قیمت
                        if (!originalPrice || !value) return true; // اگر مقدار وجود ندارد، بررسی نمی‌کنیم
                        const min = originalPrice * 0.93; // 1 درصد قیمت اصلی
                        const max = originalPrice * 0.99;
                        return value >= min && value <= max;
                    }
                ),
            onSaleSize:Yup.number().required("Capacity is required")
                .test('isCapcity' , "Must be Less than Capacity" , function (value) {
                    return value < item?.capacity
                }),
        })
        .required()
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors,isSubmitting, isDirty, isValid },
        getValues
    } = useForm({ resolver: yupResolver(schema), mode:'onChange'})
    const addDaysToDate = (days : number) => {
        const today = new Date();
        today.setUTCDate(today.getUTCDate() + days); // اضافه کردن تعداد روزها
        return today.toISOString(); // تبدیل به فرمت ISO
    };
    const submit = async (d : any) =>{
        const formData = {
            product_id	:item?.id ,
            capacity: d?.onSaleSize,
            discounted_price: d?.onSalePrice,
            expire_datetime: addDaysToDate(6)
        }
        try {
            const d = await createMutateAsync(formData)
            setDialog(false)
            toast.success("Your Product Added To Az Provider On Sales successfully!")
            setSubmitting(submitting + 1)
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


    const cancelOnSale = async () =>{
        const formData = {
            on_sale	:false ,
        }
        try {
            const d = await createMutateAsync({formData , id : item?.id})
            setDialog(false)
            setCancelDialog(false)

            toast.success("Your Product Removed From To Az Provider On Sales successfully!")
            setSubmitting(submitting + 1)
        }catch (err) {
            setDialog(false)
            setCancelDialog(false)

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


    console.log(item)
    return (
        <>

        <div className={`${item?.on_sale ?"" :"opacity-50"} w-full flex flex-col items-center justify start`}>

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
                                item?.media_files?.[0]?.image
                                    ? <Image alt={'aaa'} src={`${item?.media_files?.[0]?.image?.includes("api.azprovider.com") ? "" :  process.env.MEDIA_URL}${item?.media_files?.[0]?.image}`} width={235} height={235}  className='w-full aspect-[1.4268] rounded-[1.6rem] object-center object-cover'/>
                                    :
                                    <Image alt={'aaa'} src={`/no-image.svg`} width={235} height={235} className='w-full aspect-[1.4268] object-center object-cover rounded-[1.6rem]' />
                            }
                            <div className='absolute w-full h-full top-0 left-0'>
                                <div className='w-full flex flex-row items-center justify-between pt-3 px-[5%]'>
                                    <div className='w-1/2 flex flex-row items-center justify-start text-[0.8rem]'>
                                        <div className='bg-white px-2 text-primary-dark-b rounded-[5px]'>
                                            {`#${item?.svc_code ? item?.svc_code : item?.hscode}`}
                                        </div>

                                        {
                                            item?.capacity &&
                                            <div className='bg-primary-dark-b py-[1px] px-2 text-white rounded-[5px] ml-[5px] text-[0.6rem]'>
                                                {`${item?.capacity || ''} ${item?.measure_unit?.symbol ||''}`}
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
                                { item?.quality_type  ? item?.quality_type : ' - '}
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
                            { item?.description  ? item?.description : ' - '}
                        </p>
                    </div>

                    <div className='w-full px-[5%] pb-3 text-[0.7rem]'>
                        <div className='flex flex-row items-center justify-start'>
                            <Image src={'/union.svg'} alt={'union'} width={10} height={10} />
                            <div className='ml-1 text-[#FF4B23]  '>
                                <span className='text-[0.6rem] absolute translate-y-[-0.6rem] line-through text-[#A1A1A1]'> { item?.on_sale_price ? item?.price  : ''} </span>

                                <span className='font-bold'> { item?.on_sale_price  ? item?.on_sale_price : item?.price ? item?.price  : ' - '} </span> <span className='ml-1'> /Cash</span>
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
                                        item?.published_date ?
                                            `${new Date(item?.published_date)?.getUTCDate()} ${monthNames[new Date(item?.published_date)?.getUTCMonth()]} ${new Date(item?.published_date)?.getUTCFullYear()}`
                                            :
                                            item?.published_date_from ?
                                                `${new Date(item?.published_date_from)?.getUTCDate()} ${monthNames[new Date(item?.published_date_from)?.getUTCMonth()] } ${new Date(item?.published_date_from)?.getUTCFullYear()} - ${new Date(item?.published_date_to)?.getUTCDate()} ${monthNames[new Date(item?.published_date_to)?.getUTCMonth()] } ${new Date(item?.published_date_to)?.getUTCFullYear()}`
                                                :
                                                ' - '
                                }
                            </div>
                        </div>
                    </div>
                </div>



                    <Button
                        onClick={()=>{
                            if(item?.on_sale ){
                                setCancelDialog(true)
                            }else  setDialog(true)
                        }}

                            className={`w-full flex flex-row items-center justify-center mt-2 py-4 bg-transparent hover:scale-[1.1] cursor-pointer transition duration-500 font-roboto capitalize normal-case text-primary-dark-b border-none shadow-none rounded-[1.1rem] bg-primary-dark-b text-white`}>
                        {   item?.on_sale   ? 'Cancel' : 'Apply'}
                    </Button>

        </div>

    <AzDialog open={dialog} handler={()=>setDialog(false)} size={'sm'}>


        <div className='w-full p-5 lg:p-8 rounded-[1rem] relative'>
            <div className='absolute right-5 top-2'>
                <IconButton className={'bg-transparent focus:shadow-none'} onClick={()=>setDialog(false)}>
                    <Image src={'/exit.svg'} alt={'exit.svg'} width={15} height={15} />
                </IconButton>
            </div>

            <form className='w-full flex flex-row items-start justify-start flex-wrap mt-4 relative z-10 text-primary-dark-b' onSubmit={handleSubmit(submit)}>
                <div className='w-full h-full mt-7'>
                    <div className=' text-[1.3rem] capitalize'>
                        {`${myTexts.onSalePrice} (${item?.price})`} <span className='text-secondary-red'>*</span>
                    </div>
                    <MainInput
                        register={register}
                        label={'onSalePrice'}
                        error={errors?.onSalePrice?.message}
                        name={'onSalePrice'}
                        type={'number'}
                        placeholder={myTexts.onSalePrice}
                    />
                </div>

                <div className='w-full h-full mt-7'>
                    <div className=' text-[1.3rem] capitalize'>
                        {`${myTexts.onSaleSize} (${item?.capacity} ${item?.measure_unit?.symbol})`} <span className='text-secondary-red'>*</span>
                    </div>
                    <MainInput
                        register={register}
                        label={'onSaleSize'}
                        error={errors?.onSaleSize?.message}
                        name={'onSaleSize'}
                        type={'number'}
                        placeholder={myTexts.onSaleSize}
                    />
                </div>


                <RegisterBtn loading={createPending} otherClass={'w-full lg:w-[12rem] mt-12'} type={'submit'} disabled={false}>
                    Save
                </RegisterBtn>

            </form>
        </div>
    </AzDialog>

            <AzDialog open={cancelDialog} handler={()=>setCancelDialog(false)} size={'sm'}>
                <DialogHeader>
                   <div className={'text-[1rem]'}> Are you sure to cancel On Sale ?</div>
                </DialogHeader>
                <DialogFooter>
                    <div>

                    </div>
                    <RegisterBtn loading={createPending} otherClass={'bg-[#3F3F3F]/50 text-white lg:w-[8rem] mt-3 mx-1'} onClick={cancelOnSale}>
                        Yes
                    </RegisterBtn>
                    <RegisterBtn   otherClass={'lg:w-[8rem] mt-3 mx-1'}  onClick={()=>setCancelDialog(false)}>
                        No
                    </RegisterBtn>
                </DialogFooter>

            </AzDialog>
  </>
    );
};

export default ProductCardOnSale;