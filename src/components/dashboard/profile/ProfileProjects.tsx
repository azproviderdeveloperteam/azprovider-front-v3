import React, {useRef, useState} from 'react';
import {texts} from "@/utils/texts";
import {Button} from "@material-tailwind/react";
import Image from "next/image";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useMutation} from "@tanstack/react-query";
import {postProjects} from "@/services/profileServices";
import toast from "react-hot-toast";
import {AxiosError} from "axios";
import * as Yup from "yup";
import MainInput from "@/components/inputs/MainInput";
import RegisterBtn from "@/components/Buttons/RegisterBtn";
import AzDatePicker from "@/components/inputs/AzDatePicker";
import {format} from "date-fns";

const ProfileProjects = ({projectsData} : any) => {
    const projectList = Array.isArray(projectsData) ? projectsData : projectsData ? [projectsData] : []
    const [img ,setImg] = useState<File | null>(null)
    const [imgView ,setImgView] = useState<string | null>(null)
    const [date, setDate] = useState<Date>();

    const text = texts.eng
    const myTexts = text.dashboard.pages.profile.projects
    const inputRef = useRef<HTMLInputElement | null>(null)

    const schema = Yup
        .object({

        }).shape({
            title:Yup.string().required('Enter title'),
            customerName:Yup.string().required('Enter customer name'),
            serialNumber:Yup.string().required('Enter serial number'),
            sourceLink:Yup.string().required('Enter source link'),
            description:Yup.string().required('Enter Description'),
        })
        .required()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema), mode:'onChange'})

    const { isPending , mutateAsync} =useMutation({
        mutationFn : postProjects
    })



    const submit = async (d : any) =>{

        const formData = new FormData()
        formData.append('title' , d?.title)
        if(date){
            formData.append('date' , format(date , 'yyyy-MM-dd'))
        }
        formData.append('serial_number' , d?.serialNumber)
        formData.append('source_link' , d?.sourceLink)
        formData.append('description' , d?.description)
        formData.append('customer_name' , d?.customerName)
        if(img){
            formData.append('image' , img)
        }

        try {
            await mutateAsync(formData)
            toast.success("Data Saved Successfully !")
            reset()
            setImg(null)
            setImgView(null)
            setDate(undefined)

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
        }
    }
    return (
        <div className='w-full pt-4'>
            <div className='w-full bg-[#F8F8F8] p-5 lg:p-8 rounded-[1rem]'>
                <div className='w-full flex flex-row items-center justify-start'>
                    {
                        imgView ?

                            <Image src={imgView} alt={'no-image.svg'} width={100} height={100}
                                   className={'rounded-[1rem] object-cover aspect-square'}/>

                            : <Image src={'/no-image.svg'} alt={'no-image.svg'} width={100} height={100}
                                     className={'rounded-[1rem] object-cover aspect-square'}/>

                    }

                    <Button
                        onClick={() => inputRef?.current?.click()}
                        className='bg-transparent text-primary-purple-300 font-bold normal-case ml-3 capitalize  flex flex-row items-center justify-start'>
                        <Image src={'/upload-svg.svg'} alt={'upload-svg.svg'} width={20} height={20}
                               className={'mr-1'}/> {myTexts.uploadLogo}
                    </Button>
                    <input className='hidden' ref={inputRef} type={'file'} accept={'image/*'} onChange={(e) => {
                        if (e.target.files && e.target?.files[0]) {
                            setImg(e.target?.files[0])
                            setImgView(URL.createObjectURL(e.target?.files[0]))
                        } else {
                            setImg(null)
                            setImgView(null)
                        }
                    }}/>
                </div>
                <form className='w-full flex flex-row items-start justify-start flex-wrap mt-4 relative z-10'
                      onSubmit={handleSubmit(submit)}>

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
                            {myTexts.customerName} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'customerName'}
                            error={errors?.customerName?.message}
                            name={'customerName'}
                            type={'text'}
                            placeholder={myTexts.customerName}
                        />
                    </div>

                    <div className='w-full lg:w-[33.3%] pr-[1.3%]  h-full mt-7'>
                        <div className=' text-[1.3rem] capitalize'>
                            {myTexts.date}
                        </div>
                        <AzDatePicker date={date} setDate={setDate}/>
                    </div>

                    <div className='w-full lg:w-[33.3%] pr-[1.3%]  h-full mt-7'>
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

                    <div className='w-full lg:w-[33.3%] pr-[1.3%]  h-full mt-7'>
                        <div className=' text-[1.3rem] capitalize'>
                            {myTexts.sourceLink} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'sourceLink'}
                            error={errors?.sourceLink?.message}
                            name={'sourceLink'}
                            type={'text'}
                            placeholder={myTexts.sourceLink}
                        />
                    </div>

                    <div className='w-full pr-2 mt-7'>
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


                    <RegisterBtn loading={isPending} otherClass={'w-full lg:w-[12rem] mt-12'} type={'submit'}>
                        {myTexts.save}
                    </RegisterBtn>
                </form>

                <div className='w-full mt-8'>
                    <h3 className='text-[1.2rem] font-semibold text-primary-dark-b mb-4 capitalize'>
                        {myTexts.title} list
                    </h3>
                    {
                        projectList.length > 0 ?
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                {projectList.map((item: any, index: number) => {
                                    const imageSrc = item?.image || item?.file
                                    return (
                                        <div key={item?.id || index}
                                             className='w-full bg-white shadow-sm rounded-xl p-4 flex flex-row items-center gap-3 border border-[#F1F1F1]'>
                                            <Image
                                                src={imageSrc ? `${process.env.MEDIA_URL}${imageSrc}` : '/no-image.svg'}
                                                alt={item?.title || 'project'}
                                                width={70}
                                                height={70}
                                                className='object-cover rounded-lg aspect-square'
                                            />
                                            <div className='flex flex-col w-full text-sm'>
                                                {item?.title &&
                                                    <div className='flex justify-between'>
                                                        <span className='text-[#A1A1A1]'>Title:</span>
                                                        <span className='text-primary-dark-b'>{item?.title}</span>
                                                    </div>}
                                                {item?.customer_name &&
                                                    <div className='flex justify-between mt-1'>
                                                        <span className='text-[#A1A1A1]'>Customer:</span>
                                                        <span className='text-primary-dark-b'>{item?.customer_name}</span>
                                                    </div>}
                                                {item?.serial_number &&
                                                    <div className='flex justify-between mt-1'>
                                                        <span className='text-[#A1A1A1]'>Serial:</span>
                                                        <span className='text-primary-dark-b'>{item?.serial_number}</span>
                                                    </div>}
                                                {item?.source_link &&
                                                    <div className='flex justify-between mt-1'>
                                                        <span className='text-[#A1A1A1]'>Source:</span>
                                                        <span className='text-primary-dark-b truncate max-w-[10rem]'>{item?.source_link}</span>
                                                    </div>}
                                                {item?.date &&
                                                    <div className='flex justify-between mt-1'>
                                                        <span className='text-[#A1A1A1]'>Date:</span>
                                                        <span className='text-primary-dark-b'>{item?.date?.toString()?.split('T')[0]}</span>
                                                    </div>}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            :
                            <div className='text-[#8F8F8F] text-sm'>
                                You don’t have any projects yet.
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default ProfileProjects;
