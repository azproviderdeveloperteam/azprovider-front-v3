import React, {useRef, useState} from 'react';
import MainInput from "@/components/inputs/MainInput";
import RegisterBtn from "@/components/Buttons/RegisterBtn";
import {texts} from "@/utils/texts";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useMutation} from "@tanstack/react-query";
import {postMembership} from "@/services/profileServices";
import toast from "react-hot-toast";
import {AxiosError} from "axios";
import * as Yup from "yup";
import {Button} from "@material-tailwind/react";
import Image from "next/image";
import AzDatePicker from "@/components/inputs/AzDatePicker";

const ProfileMembership = ({membershipData} : any) => {

    const [img ,setImg] = useState<any>(null)
    const [imgView ,setImgView] = useState<any>(null)
    const [date, setDate] = React.useState<Date>();

    const text = texts.eng
    const myTexts = text.dashboard.pages.profile.memberShip
    const inputRef = useRef<any>(null)
    const schema = Yup
        .object({

        }).shape({
            type:Yup.string().required('Enter a title') ,
            serialNumber:Yup.string(),
            description:Yup.string(),
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
        mutationFn : postMembership
    })




    const submit = async (d : any) =>{

        const formData = {
            serial_number : d?.serialNumber,
            type:d?.type,
            description:d?.description,
            expire_date: date ,
            file : img

        }
        try {
            const d = await mutateAsync(formData)
            toast.success("Data Saved Successfully !")

        }catch (err) {
            if(err instanceof AxiosError){
                if(err?.response?.data?.msg){
                    toast.error(err?.response?.data?.msg)
                }else if(err?.response?.data?.message){
                    toast.error(err?.response?.data?.message)
                } else {
                    toast.error('An Error occurred')
                }
            }
            setImg(null)
        }
    }

    const uploadLogo = async (e : any) =>{
        // const formData = new FormData()
        // formData.append('logo' , e)
        // try {
        //     const d = await mutateAsync(formData)
        //     toast.success("Logo Uploaded Successfully !")
        //
        // }catch (err) {
        //     if(err instanceof AxiosError){
        //         if(err?.response?.data?.msg){
        //             toast.error(err?.response?.data?.msg)
        //         }else {
        //             toast.error('An Error occurred')
        //         }
        //     }
        // }

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


                    <div className='w-full lg:w-[33.3%] pr-[1.3%]  h-full mt-7'>
                        <div className=' text-[1.3rem] capitalize'>
                            {myTexts.expireDate}
                        </div>
                        <AzDatePicker   date={date} setDate={setDate}/>
                    </div>



                    <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                        <div className=' text-[1.3rem] capitalize'>
                            {myTexts.serialNumber} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'serialNumber'}
                            error={errors?.serialNumber?.message}
                            name={'serialNumber'}
                            type={'text'}
                            placeholder={myTexts.serialNumber}
                        />
                    </div>

                    <div className='w-full pr-[1.3%] h-full mt-7'>
                        <div className=' text-[1.3rem] capitalize'>
                            {myTexts.description} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'description'}
                            error={errors?.description?.message}
                            name={'description'}
                            type={'text'}
                            placeholder={myTexts.description}
                            textarea={true}
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

export default ProfileMembership;