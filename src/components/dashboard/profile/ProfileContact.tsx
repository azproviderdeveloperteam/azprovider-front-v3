'use client'
import React, {useEffect, useState} from 'react';
import {texts} from "@/utils/texts";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useMutation} from "@tanstack/react-query";
import {postBInfo, postContact} from "@/services/profileServices";
import * as Yup from "yup";
import MainInput from "@/components/inputs/MainInput";
import Select from "react-select";
import AzDialog from "@/components/dialog/AzDialog";
import {Button, Checkbox} from "@material-tailwind/react";
import {array} from "yup";
import RegisterBtn from "@/components/Buttons/RegisterBtn";
import toast from "react-hot-toast";
import {AxiosError} from "axios";
import Image from "next/image";

const ProfileContact = ({contactData} : any) => {
    const text = texts.eng
    const myTexts = text.dashboard.pages.profile.contact
    const [socials,setSocials] = useState<any>([])
    const [socialsDialog,setSocialDialog] = useState<any>(false)
    const [moreData , setMoreData] = useState(false)

    const schema = Yup
        .object({

        }).shape({
            tell:Yup.string(),
            fax:Yup.string(),
            websiteAddress:Yup.string(),
            instagram:Yup.string().default('').nullable(),
            youtube:Yup.string().default('').nullable(),
            linkedin:Yup.string().default('').nullable(),
            x:Yup.string().default('').nullable(),
            whatsapp:Yup.string().default('').nullable(),
            facebook:Yup.string().default('').nullable(),
            telegram:Yup.string().default('').nullable(),

            cityCountry:Yup.string().default('').nullable(),
            locationTitle:Yup.string().default('').nullable(),
            provinceState:Yup.string().default('').nullable(),
            streetAllay:Yup.string().default('').nullable(),
            building:Yup.string().default('').nullable(),
            number:Yup.string().default('').nullable(),
            zipCode:Yup.string().default('').nullable(),
        })
        .required()
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors,isSubmitting, isDirty, isValid },
        getValues
    } = useForm({ resolver: yupResolver(schema), mode:'onChange'})

    const {data  , isPending  , error  , mutateAsync} =useMutation({
        mutationFn : postContact
    })

    console.log(errors)
    const submit = async (d:any)=>{

        const formData = {
            ...(d?.tell && {phone:d?.tell}),
            ...(d?.fax && {fax:d?.fax}),
            ...(d?.locationTitle && {address:d?.locationTitle}),
            ...(d?.cityCountry && {country:d?.cityCountry}),
            // ...(d?.number && {number:d?.number}),
            ...(d?.provinceState && {state:d?.provinceState}),
            ...(d?.building && {building:d?.building}),
            // ...(d?.tell && {unit:d?.tell}),
            ...(d?.zipCode && {zip_code:d?.zipCode}),
            ...(d?.websiteAddress && {website:d?.websiteAddress}),
            ...(d?.instagram && {instagram:d?.instagram}),
            ...(d?.whatsapp && {whatsapp:d?.whatsapp}),
            ...(d?.facebook && {facebook:d?.facebook}),
            // ...(d?.tell && {aparat:d?.tell}),
            ...(d?.youtube && {youtube:d?.youtube}),
            ...(d?.telegram && {telegram:d?.telegram}),
            ...(d?.linkedin && {linkedin:d?.linkedin}),
            ...(d?.streetAllay && {street:d?.streetAllay}),

        }

        try {
            const d = await mutateAsync(formData)
            toast.success("Data Saved Successfully !")

        }catch (err) {
            if(err instanceof AxiosError){
                if(err?.response?.data?.msg){
                    toast.error(err?.response?.data?.msg)
                }else {
                    toast.error('An Error occurred')
                }
            }
        }
    }

    const options = [
        { value: "instagram", label: "Instagram" },
        { value: "youtube", label: "Youtube" },
        { value: "linkedin", label: "linkedin" },
        { value: "x", label: "X" },
        { value: "whatsapp", label: "whatsapp" },
        { value: "facebook", label: "facebook" },
        { value: "telegram", label: "telegram" },
     ];

    useEffect(()=>{
        setValue('tell',contactData?.phone)
        setValue('fax',contactData?.fax)
        setValue('websiteAddress',contactData?.website)
        setValue('instagram',contactData?.instagram)
        setValue('linkedin',contactData?.linkedin)

        // setValue('x',contactData?.international_name)
        setValue('whatsapp',contactData?.whatsapp)
        setValue('facebook',contactData?.facebook)
        setValue('telegram',contactData?.telegram)
        setValue('youtube',contactData?.youtube)
        setValue('cityCountry',contactData?.country)

        setValue('locationTitle',contactData?.address)
        setValue('provinceState',contactData?.state)
        setValue('streetAllay',contactData?.street)
        setValue('building',contactData?.building)
        setValue('number',contactData?.contact_person)
        setValue('zipCode',contactData?.zip_code)

    },[contactData])
     return (
        <div className='w-full pt-4'>
            <AzDialog open={socialsDialog} handler={()=>setSocialDialog(false)} size={'xs'}>
               <div className='w-full flex flex-col items-center justify-start'>
                   {
                       options.map((item ,index)=>{
                           return (
                               <div key={index+1} className='w-[15rem] flex flex-row items-center justify-start text-primary-dark-b'>
                                   <Checkbox color="green" checked={socials?.filter((e :any) =>e.value === item?.value)?.length > 0} onChange={(e)=>{
                                       if(e.target.checked){
                                           setSocials(socials.concat(item))
                                       }else{
                                           setSocials(socials.filter((e :any) =>e.value != item?.value))
                                       }

                                   }}/>
                                   <div>
                                       {item?.label}
                                   </div>
                               </div>
                           )
                       })
                   }
               </div>

            </AzDialog>
            <div className='w-full bg-[#F8F8F8] p-3 rounded-[1rem] p-8'>
                <form className='w-full flex flex-row items-start justify-start flex-wrap mt-4 relative z-10' onSubmit={handleSubmit(submit)}>
                    <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                        <div className=' text-[1.3rem] capitalize'>
                            {myTexts.tell} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'tell'}
                            error={errors?.tell?.message}
                            name={'tell'}
                            type={'text'}
                            placeholder={myTexts.tell}
                        />
                    </div>
                    <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                        <div className=' text-[1.3rem] capitalize'>
                            {myTexts.faxL} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'fax'}
                            error={errors?.fax?.message}
                            name={'fax'}
                            type={'text'}
                            placeholder={myTexts.faxL}
                        />
                    </div>

                    <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                        <div className=' text-[1.3rem] capitalize'>
                            {myTexts.websiteAddress} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'websiteAddress'}
                            error={errors?.websiteAddress?.message}
                            name={'websiteAddress'}
                            type={'text'}
                            placeholder={myTexts.websiteAddress}
                        />
                    </div>


                    {
                        socials.map((item : any ,index : number)=>{
                            return(
                                <div key={index+1} className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                                    <div className=' text-[1.3rem] capitalize'>
                                        {item?.label}
                                    </div>
                                    <MainInput
                                        register={register}
                                        label={item?.label}
                                        error={''}
                                        name={item?.value}
                                        type={'text'}
                                        placeholder={item?.label}
                                    />
                                </div>

                            )
                        })
                    }
                    <div className='w-full lg:w-[31%] pr-5 h-full mt-7 flex flex-col items-center justify-end'>
                        <div className='opacity-0 text-[1.3rem] capitalize'>
                          s
                        </div>
                        <Button
                            onClick={()=>{
                               setSocialDialog(true)
                            }}
                            className='bg-transparent text-primary-purple-300 font-bold normal-case ml-3 capitalize  flex flex-row items-center justify-start'>
                           + add more social links
                        </Button>

                    </div>
                    <div className='w-full flex flex-col lg:flex-row items-center justify-between'>
                        <RegisterBtn loading={isPending} otherClass={'w-full lg:w-[12rem] mt-12'} type={'submit'} disabled={false}>
                            {myTexts.save}
                        </RegisterBtn>

                        <Button className={'flex flex-row items-center justify-center font-roboto font-normal normal-case shadow-none hover:shadow-none text-[1.1rem] mt-12 bg-transparent text-primary-green-tb'} onClick={()=>setMoreData(!moreData)} disabled={false}>
                            {myTexts.advanceDataInformation}
                            <Image src={'/green-tb-arrow.svg'} alt={'arrow-carousel-az-provider'} width={40} height={40} className={moreData ? 'transition duration-500' : 'rotate-180 transition duration-500'}/>

                        </Button>
                    </div>


                </form>
            </div>

            {
                moreData ?
                    <div className='w-full bg-[#F8F8F8] p-3 rounded-[1rem] p-8 mt-5'>
                        <form className='w-full flex flex-row items-start justify-start flex-wrap mt-4 relative z-10' onSubmit={handleSubmit(submit)}>
                            <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                                <div className=' text-[1.3rem] capitalize'>
                                    {myTexts.locationTitle} <span className='text-secondary-red'>*</span>
                                </div>
                                <MainInput
                                    register={register}
                                    label={'location title'}
                                    error={errors?.locationTitle?.message}
                                    name={'locationTitle'}
                                    type={'text'}
                                    placeholder={myTexts.locationTitle}
                                />
                            </div>
                            <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                                <div className=' text-[1.3rem] capitalize'>
                                    {myTexts.cityCountry} <span className='text-secondary-red'>*</span>
                                </div>
                                <MainInput
                                    register={register}
                                    label={'cityCountry'}
                                    error={errors?.cityCountry?.message}
                                    name={'cityCountry'}
                                    type={'text'}
                                    placeholder={myTexts.cityCountry}
                                />
                            </div>

                            <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                                <div className=' text-[1.3rem] capitalize'>
                                    {myTexts.provinceState} <span className='text-secondary-red'>*</span>
                                </div>
                                <MainInput
                                    register={register}
                                    label={'provinceState'}
                                    error={errors?.provinceState?.message}
                                    name={'provinceState'}
                                    type={'text'}
                                    placeholder={myTexts.provinceState}
                                />
                            </div>


                            <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                                <div className=' text-[1.3rem] capitalize'>
                                    {myTexts.streetAllay} <span className='text-secondary-red'>*</span>
                                </div>
                                <MainInput
                                    register={register}
                                    label={'streetAllay'}
                                    error={errors?.streetAllay?.message}
                                    name={'streetAllay'}
                                    type={'text'}
                                    placeholder={myTexts.streetAllay}
                                />
                            </div>

                            <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                                <div className=' text-[1.3rem] capitalize'>
                                    {myTexts.building} <span className='text-secondary-red'>*</span>
                                </div>
                                <MainInput
                                    register={register}
                                    label={'building'}
                                    error={errors?.building?.message}
                                    name={'building'}
                                    type={'text'}
                                    placeholder={myTexts.building}
                                />
                            </div>

                            <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                                <div className=' text-[1.3rem] capitalize'>
                                    {myTexts.number} <span className='text-secondary-red'>*</span>
                                </div>
                                <MainInput
                                    register={register}
                                    label={'number'}
                                    error={errors?.number?.message}
                                    name={'number'}
                                    type={'text'}
                                    placeholder={myTexts.number}
                                />
                            </div>

                            <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                                <div className=' text-[1.3rem] capitalize'>
                                    {myTexts.zipCode} <span className='text-secondary-red'>*</span>
                                </div>
                                <MainInput
                                    register={register}
                                    label={'zipCode'}
                                    error={errors?.zipCode?.message}
                                    name={'zipCode'}
                                    type={'text'}
                                    placeholder={myTexts.zipCode}
                                />
                            </div>


                            <div className='w-full flex flex-col lg:flex-row items-center justify-between'>
                                <RegisterBtn loading={isPending} otherClass={'w-full lg:w-[12rem] mt-12'} type={'submit'} disabled={false}>
                                    {myTexts.save}
                                </RegisterBtn>

                            </div>


                        </form>
                    </div>
                    : null
            }


        </div>
    );
};

export default ProfileContact;