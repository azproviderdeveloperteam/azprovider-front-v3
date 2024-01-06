'use client'
import React, {useEffect, useRef, useState} from 'react';
import {Button, IconButton} from "@material-tailwind/react";
import Image from "next/image";
import {texts} from "@/utils/texts";
import {getMembership, postBInfo} from "@/services/profileServices";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import toast from "react-hot-toast";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import MainInput from "@/components/inputs/MainInput";
import RegisterBtn from "@/components/Buttons/RegisterBtn";
import AzDatePicker from "@/components/inputs/AzDatePicker";
import Select from "react-select";
import {useQuery} from "@tanstack/react-query";
import {getAllHsCodes, getRandomHsCodes, getSearchInThirdLevel} from "@/services/hsCodeServices";
const AddProductForm = ({exitKey , onClose} : any) => {

    const [img ,setImg] = useState<any>(null)
    const [imgView ,setImgView] = useState<any>(null)
    const [date, setDate] = React.useState<Date>();
    const [productInput ,setProductInput] = useState('')
    const [options , setOptions] = useState([])
    const text = texts.eng
    const myTexts = text.dashboard.pages.product.form
    const inputRef = useRef<any>(null)

    const schema = Yup
        .object({

        }).shape({
            productCode:Yup.string().required('Enter Your International Name'),
            capacity:Yup.string().required('Enter Your Brand Name'),
            publishedDate:Yup.string().required('Enter Cell Phone'),
            grantedOrganization:Yup.string().required('Enter Local Name'),
            typeCertification:Yup.string().required('Enter Contact Person'),
            description:Yup.string().required('Enter Email'),
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
        mutationFn : getSearchInThirdLevel
    })
    const {data : randomHsData, isPending :randomHsPending, error : randomHsError} = useQuery({
        queryKey: ['hs-random-hscode'],
        queryFn: getRandomHsCodes,
        retry:false,
    })


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
        // try {
        //     const d = await mutateAsync(formData)
        //     toast.success("Data Saved Successfully !")
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

    const searchProduct = async (e : any) =>{
        if(e?.length > 3) {

        }
    }

    useEffect(()=>{
        if(randomHsData?.data){
            console.log(randomHsData?.data)
        }

        },[randomHsData])
    return (
        <div className='w-full pt-4'>
            <div className='w-full bg-[#F8F8F8] p-5 lg:p-8 rounded-[1rem] relative'>
                {
                    exitKey &&
                    <div className='absolute right-5 top-5'>
                        <IconButton className={'bg-transparent focus:shadow-none'} onClick={onClose}>
                            <Image src={'/exit.svg'} alt={'exit.svg'} width={15} height={15} />
                        </IconButton>
                    </div>
                }
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
                            if(e.target?.files[0]){
                                setImg(e.target?.files[0])
                                setImgView(URL.createObjectURL(e.target?.files[0]))
                            }else {
                                setImg(null)
                            }
                        }else {
                            setImg(null)
                        }
                    }}/>
                </div>

                <form className='w-full flex flex-row items-start justify-start flex-wrap mt-4 relative z-10' onSubmit={handleSubmit(submit)}>
                    <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7 relative'>
                        <div className=' text-[1.3rem] capitalize'>
                            {myTexts.productCode} <span className='text-secondary-red'>*</span>
                        </div>
                        <Select
                            className={`border border-1 border-slate-700 w-full flex px-3 min-h-[3.85rem] flex-row items-center justify-between bg-transparent rounded-[1.2rem] text-[#A1A1A1] border-[#A1A1A1]`}

                            onChange={(e)=>{

                                // setFormData({...formData , fCurrency : e})
                                // getToCurrenciesFunc(e?.value)
                            }}
                            // value={formData?.fCurrency}
                            options={options}
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
                                multiValueLabel: () => 'bg-[#1C1D27] rounded-xl',
                                option: ({ isFocused, isSelected }) =>'bg-[#1C1D27] px-4 py-1',
                            }}
                        />
                        {/*<div className='w-full flex flex-col items-start justify-start'>*/}
                        {/*    <input  name={'productCode'}*/}
                        {/*            type={'text'}*/}
                        {/*            className={`border border-1 border-slate-700 w-full flex px-3 min-h-[3.85rem] flex-row items-center justify-between bg-transparent rounded-[1.2rem] text-[#A1A1A1] border-[#A1A1A1]`}*/}
                        {/*            placeholder={myTexts.productCode}*/}
                        {/*            value={productInput}*/}
                        {/*            onChange={(event :any)=>{*/}
                        {/*                setProductInput(event.target.value)*/}
                        {/*                searchProduct(event.target.value)*/}
                        {/*            }}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        {/*<MainInput*/}
                        {/*    register={register}*/}
                        {/*    label={'productCode'}*/}
                        {/*    error={errors?.productCode?.message}*/}
                        {/*    name={'productCode'}*/}
                        {/*    type={'text'}*/}
                        {/*    placeholder={myTexts.productCode}*/}
                        {/*/>*/}
                        {/*<div className='w-[97%] absolute max-h-[30rem] bg-white flex flex-vol items-center justify-start p-2 rounded-[1rem] shadow-[0px_12px_20px_0px_rgba(0,_0,_0,_0.10)]'>*/}

                        {/*</div>*/}
                    </div>

                    <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                        <div className=' text-[1.3rem] capitalize'>
                            {myTexts.capacity} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'capacity'}
                            error={errors?.capacity?.message}
                            name={'capacity'}
                            type={'text'}
                            placeholder={myTexts.capacity}
                        />
                    </div>


                    <div className='w-full lg:w-[33.3%] pr-[1.3%]  h-full mt-7'>
                        <div className=' text-[1.3rem] capitalize'>
                            {myTexts.publishedDate}
                        </div>
                        <AzDatePicker   date={date} setDate={setDate}/>
                    </div>

                    <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                        <div className=' text-[1.3rem] capitalize'>
                            {myTexts.grantedOrganization} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'grantedOrganization'}
                            error={errors?.grantedOrganization?.message}
                            name={'grantedOrganization'}
                            type={'text'}
                            placeholder={myTexts.grantedOrganization}
                        />
                    </div>

                    <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                        <div className=' text-[1.3rem] capitalize'>
                            {myTexts.typeCertification} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'typeCertification'}
                            error={errors?.typeCertification?.message}
                            name={'typeCertification'}
                            type={'text'}
                            placeholder={myTexts.typeCertification}
                        />
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
                    <RegisterBtn loading={isPending} otherClass={'w-full lg:w-[12rem] mt-12'} type={'submit'} disabled={false}>
                        Save
                    </RegisterBtn>
                </form>
            </div>
        </div>
    );
};

export default AddProductForm;