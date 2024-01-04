import React, {useEffect, useRef, useState} from 'react';
import MainInput from "@/components/inputs/MainInput";
import RegisterBtn from "@/components/Buttons/RegisterBtn";
import {texts} from "@/utils/texts";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useMutation} from "@tanstack/react-query";
import {postBInfo, postCertificate} from "@/services/profileServices";
import toast from "react-hot-toast";
import {AxiosError} from "axios";
import * as Yup from "yup";
import {Button} from "@material-tailwind/react";
import Image from "next/image";

const ProfileCertificates = ({certificateData}: any) => {

    const [img ,setImg] = useState<any>(null)
    const [imgView ,setImgView] = useState<any>(null)

    const text = texts.eng
    const myTexts = text.dashboard.pages.profile.certificate
    const inputRef = useRef<any>(null)
    const schema = Yup
        .object({

        }).shape({
            title:Yup.string().required('Enter a title') ,
            grade:Yup.string().required('Enter a Grade') ,
            type:Yup.string(),
            source:Yup.string(),
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
        mutationFn : postCertificate
    })




    const submit = async (d : any) =>{

        const formData = {
            title : d?.title,
            grade:d?.grade,
            type:d?.type,
            source:d?.source,

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
                    setImg(null)
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
                }
            }
        }

    }

    const hasError =false
    return (
        <div className='w-full pt-4'>
            <div className='w-full bg-[#F8F8F8] p-5 lg:p-8 rounded-[1rem]'>
                <div className='w-full flex flex-row items-center justify-start'>
                    {
                        img  ?

                            <Image src={imgView} alt={'no-image.svg'} width={100} height={100}  className={'rounded-[1rem] object-cover aspect-square'}/>

                            :<Image src={'/no-image.svg'} alt={'no-image.svg'} width={100} height={100} className={'rounded-[1rem] object-cover aspect-square'}/>

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
                            uploadLogo(e.target?.files[0])                        }
                    }}/>
                </div>


                <form className='w-full flex flex-row items-start justify-start flex-wrap mt-4 relative z-10' onSubmit={handleSubmit(submit)}>
                    <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                        <div className=' text-[1.3rem] capitalize'>
                            {myTexts.title} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'title'}
                            error={errors?.title?.message}
                            name={'title'}
                            type={'text'}
                            placeholder={myTexts.title}
                        />
                    </div>

                    <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                        <div className=' text-[1.3rem] capitalize'>
                            {myTexts.grade} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'grade'}
                            error={errors?.grade?.message}
                            name={'grade'}
                            type={'text'}
                            placeholder={myTexts.grade}
                        />
                    </div>


                    <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                        <div className=' text-[1.3rem] capitalize'>
                            {myTexts.type} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'type'}
                            error={errors?.type?.message}
                            name={'type'}
                            type={'text'}
                            placeholder={myTexts.type}
                        />
                    </div>


                    <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                        <div className=' text-[1.3rem] capitalize'>
                            {myTexts.source} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'source'}
                            error={errors?.source?.message}
                            name={'source'}
                            type={'text'}
                            placeholder={myTexts.source}
                        />
                    </div>



                    <div className='w-full '>
                        <RegisterBtn loading={isPending} otherClass={'w-full lg:w-[12rem] mt-12'} type={'submit'} disabled={hasError}>
                            {myTexts.save}
                        </RegisterBtn>
                    </div>

                </form>



            </div>
        </div>
    );
};

export default ProfileCertificates;