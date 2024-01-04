import React, {useEffect, useRef, useState} from 'react';
import {texts} from "@/utils/texts";
import {Button} from "@material-tailwind/react";
import Image from "next/image";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useMutation} from "@tanstack/react-query";
import {postBInfo, postProjects} from "@/services/profileServices";
import toast from "react-hot-toast";
import {AxiosError} from "axios";
import * as Yup from "yup";
import MainInput from "@/components/inputs/MainInput";
import RegisterBtn from "@/components/Buttons/RegisterBtn";
import AzDatePicker from "@/components/inputs/AzDatePicker";

const ProfileProjects = ({projectsData} : any) => {
    const [file ,setFile] = useState<any>(null)
    const [date, setDate] = React.useState<Date>();


    const text = texts.eng
    const myTexts = text.dashboard.pages.profile.projects
    const inputRef = useRef<any>(null)

    const schema = Yup
        .object({

        }).shape({
            title:Yup.string().required('Enter title'),
            customerProjectName:Yup.string().required('Enter customer project name'),

            description:Yup.string().required('Enter Description'),
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
        mutationFn : postProjects
    })



    useEffect(()=>{

    },[projectsData])

    const submit = async (d : any) =>{

        const formData = {
            title : d?.title,
            customer_name:d?.customerProjectName,
            description:d?.description,
            date:date,
            file:file

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
        formData.append('file' , e)
        try {
            const d = await mutateAsync(formData)
            toast.success("Logo Uploaded Successfully !")

        }catch (err) {
            if(err instanceof AxiosError){
                if(err?.response?.data?.msg){
                    toast.error(err?.response?.data?.msg)
                }else {
                    toast.error('An Error occurred')
                    setFile(null)

                }
            }
        }

    }
    return (
        <div className='w-full pt-4'>
            <div className='w-full bg-[#F8F8F8] p-5 lg:p-8 rounded-[1rem]'>
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

                    <div className='w-full lg:w-[33.3%] pr-[1.3%]  h-full mt-7'>
                        <div className=' text-[1.3rem] capitalize'>
                            {myTexts.customerProjectName} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'customerProjectName'}
                            error={errors?.customerProjectName?.message}
                            name={'customerProjectName'}
                            type={'text'}
                            placeholder={myTexts.customerProjectName}
                        />
                    </div>

                    <div className='w-full lg:w-[33.3%] pr-[1.3%]  h-full mt-7'>
                        <div className=' text-[1.3rem] capitalize'>
                            {myTexts.date}
                        </div>
                        <AzDatePicker   date={date} setDate={setDate}/>
                    </div>

                    <div className='w-full pr-2 mt-7'>
                        <div className=' text-[1.3rem] capitalize'>
                            {myTexts.description} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'type description...'}
                            error={errors?.description?.message}
                            name={'description'}
                            type={'text'}
                            placeholder={'type description...'}
                            textarea={true}
                        />
                    </div>

                    <div className='w-full mt-3 flex flex-row items-center justify-start'>

                        <Button
                            onClick={()=>{
                                if(inputRef){
                                    if(inputRef.current){
                                        inputRef.current.click()
                                    }
                                }
                            }}
                            className='bg-transparent text-primary-purple-300 font-bold normal-case ml-3 capitalize  flex flex-row items-center justify-start'>
                            <Image src={'/upload-svg.svg'} alt={'upload-svg.svg'} width={20} height={20} className={'mr-1'} />    {myTexts.upload}
                        </Button>
                        <input className='hidden' ref={inputRef} type={'file'} onChange={(e)=>{
                            if(e.target.files){
                                setFile(e?.target?.files[0])
                                // uploadLogo(e?.target?.files[0])
                            }
                        }}/>

                        {
                            file &&  <div className='ml-2'>
                                {file?.name}
                            </div>
                        }


                    </div>


                    <RegisterBtn loading={isPending} otherClass={'w-full lg:w-[12rem] mt-12'} type={'submit'} >
                        Save
                    </RegisterBtn>
                </form>
            </div>
        </div>
    );
};

export default ProfileProjects;