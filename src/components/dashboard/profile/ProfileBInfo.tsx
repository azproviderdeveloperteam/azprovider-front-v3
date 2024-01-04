'use client'
import React, {useEffect, useRef, useState} from 'react';
import Image from "next/image";
import {Button} from "@material-tailwind/react";
import {texts} from "@/utils/texts";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import toast from "react-hot-toast";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import MainInput from "@/components/inputs/MainInput";
import {postBInfo} from "@/services/profileServices";
import RegisterBtn from "@/components/Buttons/RegisterBtn";

const ProfileBInfo = ({bInfoData} : any) => {

    const [img ,setImg] = useState<any>(null)
    const [imgView ,setImgView] = useState<any>(null)

    const text = texts.eng
    const myTexts = text.dashboard.pages.profile.bInfo
    const inputRef = useRef<any>(null)

    const schema = Yup
        .object({

        }).shape({
            interName:Yup.string().required('Enter Your International Name'),
            brandName:Yup.string().required('Enter Your Brand Name'),
            cellPhone:Yup.string().required('Enter Cell Phone'),
            localName:Yup.string().required('Enter Local Name'),
            contactPerson:Yup.string().required('Enter Contact Person'),
            email:Yup.string().required('Enter Email'),


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
        mutationFn : postBInfo
    })



    useEffect(()=>{
        setImgView(`${process.env.MEDIA_URL}${bInfoData?.logo}`)
        setImg(bInfoData?.logo)

        setValue('interName',bInfoData?.international_name)
        setValue('brandName',bInfoData?.brand_name)
        setValue('cellPhone',bInfoData?.cell_phone)
        setValue('localName',bInfoData?.local_name)
        setValue('contactPerson',bInfoData?.contact_person)
        setValue('email',bInfoData?.email)

    },[bInfoData])

    const submit = async (d : any) =>{

        const formData = {
            local_name : d?.localName,
            brand_name:d?.brandName,
            international_name:d?.interName,
            contact_person:d?.contactPerson,
            email:d?.email,
            cell_phone:d?.cellPhone,
            // number_of_employees:"",
            // national_code:"",
            // establishment_date:""
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

    const uploadLogo = async (e : any) =>{
         const formData = new FormData()
        formData.append('logo' , e)
        try {
            const d = await mutateAsync(formData)
            toast.success("Logo Uploaded Successfully !")

        }catch (err) {
            if(err instanceof AxiosError){
                if(err?.response?.data?.msg){
                    toast.error(err?.response?.data?.msg)
                }else {
                    toast.error('An Error occurred')
                    setImg(null)

                }
            }
        }

    }
    const hasError = errors?.brandName?.message || errors?.interName?.message || errors?.cellPhone?.message || errors?.localName?.message || errors?.contactPerson?.message || errors?.email?.message
    return (
        <div className='w-full pt-4'>
            <div className='w-full bg-[#F8F8F8] p-5 lg:p-8 rounded-[1rem]'>
                <div className='w-full flex flex-row items-center justify-start'>
                    {
                        img  ?

                            <Image src={imgView} alt={'no-image.svg'} width={100} height={100}  className={'rounded-full object-cover aspect-square'}/>

                            :<Image src={'/no-image.svg'} alt={'no-image.svg'} width={100} height={100} className={'rounded-full object-cover aspect-square'}/>

                    }

                    <Button
                        onClick={()=>{
                            if(inputRef){
                                if(inputRef.current){
                                    inputRef.current.click()
                                }
                            }
                        }}
                            className='bg-transparent text-primary-purple-300 font-bold normal-case ml-3 capitalize  flex flex-row items-center justify-start'>
                       <Image src={'/upload-svg.svg'} alt={'upload-svg.svg'} width={20} height={20} className={'mr-1'} />    {myTexts.uploadLogo}
                    </Button>
                    <input className='hidden' ref={inputRef} type={'file'} onChange={(e)=>{
                        if(e.target.files){
                            setImg(e.target?.files[0])
                            setImgView(URL.createObjectURL(e.target?.files[0]))
                            uploadLogo(e.target?.files[0])
                        }
                    }}/>
                </div>


                <form className='w-full flex flex-row items-start justify-start flex-wrap mt-4 relative z-10' onSubmit={handleSubmit(submit)}>
                    <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                        <div className=' text-[1.3rem] capitalize'>
                            {myTexts.interName} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'interName'}
                            error={errors?.interName?.message}
                            name={'interName'}
                            type={'text'}
                            placeholder={myTexts.interName}
                        />
                    </div>

                    <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                        <div className=' text-[1.3rem] capitalize'>
                            {myTexts.brandName} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'brandName'}
                            error={errors?.brandName?.message}
                            name={'brandName'}
                            type={'text'}
                            placeholder={myTexts.brandName}
                        />
                    </div>


                    <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                        <div className=' text-[1.3rem] capitalize'>
                            {myTexts.cellPhone} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'cellPhone'}
                            error={errors?.cellPhone?.message}
                            name={'cellPhone'}
                            type={'text'}
                            placeholder={myTexts.cellPhone}
                        />
                    </div>


                    <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                        <div className=' text-[1.3rem] capitalize'>
                            {myTexts.localName} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'localName'}
                            error={errors?.localName?.message}
                            name={'localName'}
                            type={'text'}
                            placeholder={myTexts.localName}
                        />
                    </div>


                    <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                        <div className=' text-[1.3rem] capitalize'>
                            {myTexts.contactPerson} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'contactPerson'}
                            error={errors?.contactPerson?.message}
                            name={'contactPerson'}
                            type={'text'}
                            placeholder={myTexts.contactPerson}
                        />
                    </div>

                    <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                        <div className=' text-[1.3rem] capitalize'>
                            {myTexts.email} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'email'}
                            error={errors?.email?.message}
                            name={'email'}
                            type={'text'}
                            placeholder={myTexts.email}
                        />
                    </div>

                    <RegisterBtn loading={isPending} otherClass={'w-full lg:w-[12rem] mt-12'} type={'submit'} disabled={hasError}>
                        Save
                    </RegisterBtn>
                </form>



            </div>
        </div>
    );
};

export default ProfileBInfo;