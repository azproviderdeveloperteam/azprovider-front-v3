'use client'
import React, {useEffect, useRef, useState} from 'react';
import {Button, IconButton, Tooltip} from "@material-tailwind/react";
import Image from "next/image";
import {texts} from "@/utils/texts";
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
import {
    getAllHsCodes,
    getRandomHsCodes,
    getSearchInHsCodesNew,
    getSearchInThirdLevel
} from "@/services/hsCodeServices";
import ThreeDotsLoaderGreen from "@/components/loaders/ThreeDotsLoaderGreen";
import {createProduct, createProductUploadImage , updateProduct} from "@/services/dashboardProductsServices";
import {uploadV2} from "@/services/uploadService";

type GrantedOgType = {
    value : string | undefined ,
    label :string | undefined ,
}
const AddProductForm = ({exitKey , onClose , allMeasureData , allGrantedList , viewAddProductForm} : any) => {

    const [img ,setImg] = useState<any>(null)
    const [imgView ,setImgView] = useState<any>(null)
    const [dateFrom, setDateFrom] = React.useState<Date>();
    const [dateTo, setDateTo] = React.useState<Date>();
    const [grantedOg , setGrantedOg] = useState<any>(null)
    const [selectedMeasure , setSelectedMeasure] = useState<any>( null )
    const [measureOptions , setMeasureOptions] = useState<any>([] )
    const [grantedOgOptions , setGrantedOgOptions] = useState<any>( )


    const [productInput ,setProductInput] = useState<any>(
        {value:"" , code:"" , label:"",
                title:"",
                input :"",
            id:''
    })
    const [options , setOptions] = useState([])
    const [openDrop ,setOpenDrop] = useState(false)

    const text = texts.eng
    const myTexts = text.dashboard.pages.product.form
    const inputRef = useRef<any>(null)

    const schema = Yup
        .object({

        }).shape({

            capacity:Yup.number().required('Enter capacity in number'),
            price:Yup.number(),
            // grantedOrganization:Yup.string().required('Enter Local Name'),
            typeCertification:Yup.string().required('Enter certification type'),
            description:Yup.string().required('Enter description'),
            brandName:Yup.string(),
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
        mutationFn : getSearchInHsCodesNew
    })
    const {data : randomHsData, isPending :randomHsPending, error : randomHsError} = useQuery({
        queryKey: ['hs-random-hscode'],
        queryFn: getRandomHsCodes,
        retry:false,
    })

    const {data : createData  , isPending : createPending , error :createError , mutateAsync : createMutateAsync } =useMutation({
        mutationFn : createProduct
    })
    const {data : updateData  , isPending : updatePending , error :updateError , mutateAsync : updateMutateAsync } =useMutation({
        mutationFn : updateProduct
    })
    const {data : uploadImageData  , isPending : uploadImagePending , error :uploadImageError , mutateAsync : uploadImageMutateAsync } =useMutation({
        mutationFn : uploadV2
    })


    useEffect(()=>{
        if(viewAddProductForm !== null && viewAddProductForm?.title){
            console.log(viewAddProductForm)
            setProductInput({value:viewAddProductForm?.hs_codes , code:viewAddProductForm?.hs_codes , label:"",
                    title:viewAddProductForm?.title,
                    input :`#${viewAddProductForm?.hs_codes} - ${viewAddProductForm?.title}`,
                    id:''
                }
            )
            setDateFrom(new Date(viewAddProductForm?.publish_date_from))
            setDateTo(new Date(viewAddProductForm?.publish_date_to))

            setGrantedOg({value:viewAddProductForm?.granted_organisation?.id , label : viewAddProductForm?.granted_organization})
            setValue('capacity',viewAddProductForm?.size)
            setValue('price',viewAddProductForm?.price)
            setValue('description',viewAddProductForm?.short_description)
            setValue('brandName',viewAddProductForm?.brand_name)
            setValue('typeCertification',viewAddProductForm?.certification)

            // const formData = {
            //
            //
            //     measure:selectedMeasure?.label,
            //
            //     granted_organization:grantedOg?.label,
            //
            // }
        }
    },[])

    useEffect(()=>{
        let mo :any[] = []

        if(allMeasureData?.data){
            allMeasureData?.data?.map((x:any)=>mo.push({value:x?.id , label : x?.name}))
        }
        setMeasureOptions(mo)
    },[allMeasureData])


    useEffect(()=>{
        let mo :any[] = []

        if(allGrantedList?.data){
            allGrantedList?.data?.map((x:any)=>mo.push({value:x?.id , label : x?.name}))
        }
        setGrantedOgOptions(mo)
    },[allGrantedList])
    useEffect(()=>{


        if(randomHsData?.data){
            const hsCodes = randomHsData?.data?.map((item:any)=>(
                {
                    label:<div className='flex flex-row items-center justify-start md:text-[14px] text-[3.1vw]'>
                        {
                            item?.image ?
                                <img src={item?.image} alt={item?.title} className='mr-3 w-[45px] rounded-full'/>
                                :
                                <Image src={'/no-image.svg'} alt={item?.title} width={30} height={30}  className='mr-3 w-[45px] rounded-full' />

                        }
                        <div className='w-[calc(100%-60px)] flex flex-col items-start justify-between'>
                            <div>
                                {`#${item?.code}`}
                            </div>
                            <Tooltip content={item?.title} placement="top">
                                <div className='text-primary-dark-b w-[95%] truncate font-bold'>
                                    {item?.title }
                                </div>
                            </Tooltip>

                        </div>
                    </div>,
                    code : item?.code ,
                    value:item?.code ,
                    title:item?.title ,
                    input :`#${item?.code} - ${item?.title}`,
                    id : item?.id
                }
            ))
            setOptions(hsCodes)
        }
    },[randomHsData])


    const submit = async (d : any) =>{

        const formData = {
            title : productInput?.title,
            size:d?.capacity,
            measure:selectedMeasure?.label,
            brand_name : d?.brandName,
            publish_date_from:dateFrom,
            publish_date_to:dateTo,
            granted_organization:grantedOg?.label,
            certification:d?.typeCertification,
            // hs_code_third_levels:[productInput?.id],
            price:d?.price,
            short_description:d?.description,
            hscode:productInput?.value,
            media_files_id: uploadImageData?.data?.id ?  [
                uploadImageData?.data?.id
            ] :undefined,
            // hs_codes:[productInput?.id],
            // number_of_employees:"",
            // national_code:"",
            // establishment_date:""
        }
        try {

            if(viewAddProductForm !== null){
                const update = await updateMutateAsync({data : formData , id : viewAddProductForm?.id})
                toast.success("Your Product Edited Successfully!")
                onClose()
            }else {
                const d = await createMutateAsync(formData)
                toast.success("Your Product Added Successfully!")
                onClose()
            }

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

    const uploadImage = async (e : any) =>{
        const formData = new FormData()
        formData.append('image' , e)

        try {
            const d = await uploadImageMutateAsync({data:{'image':e} , method:"product_v1"})
        }catch (err) {
            if(err instanceof AxiosError){
                if(err?.response?.data?.msg){
                    toast.error(err?.response?.data?.msg)
                }else if(err?.response?.data?.message){
                    toast.error(err?.response?.data?.message)
                }else if(err?.response?.data?.image?.[0]){
                    toast.error(err?.response?.data?.image?.[0])
                }else if(err?.response?.data?.image){
                    toast.error(err?.response?.data?.image?.toString())
                }  else {
                    toast.error('An Error occurred')
                }
            }
        }
    }

    const searchProduct = async (e : any) =>{
        if(e?.length > 3) {
            try {

                const s = await mutateAsync(e)

                const hsCodes = s?.data?.results?.splice(0,100).map((item:any)=>(
                    {
                        label:<div className='flex flex-row items-center justify-start md:text-[14px] text-[3.1vw]'>
                            {
                                item?.image ?
                                    <img src={item?.image} alt={item?.title} className='mr-3 w-[45px] rounded-full'/>
                                    :
                                    <Image src={'/no-image.svg'} alt={item?.title} width={30} height={30}  className='mr-3 w-[45px] rounded-full' />

                            }
                            <div className='w-[calc(100%-60px)] flex flex-col items-start justify-between'>
                                <div>
                                    {`#${item?.hscode}`}
                                </div>
                                <Tooltip content={item?.title} placement="top">
                                    <div className='text-primary-dark-b w-[95%] truncate font-bold'>
                                        {item?.title }
                                    </div>
                                </Tooltip>
                            </div>
                        </div>,

                        value:item?.hscode ,
                        title:item?.title ,
                        input :`#${item?.hscode} - ${item?.title}`,
                        id : item?.id,
                        ...item
                    }
                ))
                setOptions(hsCodes)
                setOpenDrop(true)

            }catch (err) {

            }
        }
    }


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
                                    if(!uploadImagePending){
                                        inputRef.current.click()
                                    }
                                }
                            }
                        }}
                        className='bg-transparent text-primary-purple-300 font-bold normal-case ml-3 capitalize  flex flex-row items-center justify-start'>
                        <Image src={'/upload-svg.svg'} alt={'upload-svg.svg'} width={20} height={20} className={'mr-1'} />    {uploadImagePending ? 'uploading...' :myTexts.uploadLogo}
                    </Button>
                    <input className='hidden' ref={inputRef} type={'file'} onChange={(e)=>{
                        if(e.target.files){
                            if(e.target?.files[0]){
                                setImg(e.target?.files[0])
                                uploadImage(e.target?.files[0])
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

                        <div className='w-full flex flex-col items-start justify-start relative'>
                            <input  name={'productCode'}
                                    type={'text'}
                                    className={`border border-1 border-slate-700 w-full flex px-3 min-h-[3.85rem] flex-row items-center justify-between bg-transparent rounded-[1.2rem] text-[#A1A1A1] border-[#A1A1A1]`}
                                    placeholder={myTexts.productCode}
                                    value={productInput?.input}
                                    // onBlur={()=>setOpenDrop(false)}
                                    onChange={(event :any)=>{
                                        setOpenDrop(true)
                                        setProductInput(event.target.value)
                                        searchProduct(event.target.value)
                                    }}
                            />
                            {
                                openDrop &&
                                <>
                                    <div className='w-full top-[3.85rem] absolute max-h-[30rem] z-10 bg-white flex flex-vol items-center justify-start p-2 rounded-[1rem] shadow-[0px_12px_20px_0px_rgba(0,_0,_0,_0.10)]'>
                                        { isPending ?
                                            <div className='w-full h-[25rem] flex flex-row items-center justify-center'>
                                                <ThreeDotsLoaderGreen />
                                            </div>
                                            :

                                            <div className='w-full max-h-[25rem] overflow-auto'>
                                                { options?.length > 0 ?
                                                    options?.map((item :any,index : number)=>{
                                                        return(
                                                            item?.title === 'Added By AZ' ? null :
                                                            <div key={index+1} className='w-full py-2 my-1 cursor-pointer' onClick={()=>setProductInput(item)}>
                                                                {item?.label}
                                                            </div>
                                                        )
                                                    })
                                                    :
                                                    <div className='!w-full h-[25rem] flex flex-row items-center justify-center'>
                                                        No Product
                                                    </div>
                                                }
                                            </div>
                                        }
                                    </div>
                                    <div className={'fixed bg-red-100 opacity-0 w-[100vw] h-[100svh] top-0 left-0 z-5 '} onClick={()=>setOpenDrop(false)} />
                                </>

                            }

                        </div>
                        {/*<MainInput*/}
                        {/*    register={register}*/}
                        {/*    label={'productCode'}*/}
                        {/*    error={errors?.productCode?.message}*/}
                        {/*    name={'productCode'}*/}
                        {/*    type={'text'}*/}
                        {/*    placeholder={myTexts.productCode}*/}
                        {/*/>*/}

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
                            type={'number'}
                            placeholder={myTexts.capacity}
                        />
                    </div>

                    <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                        <div className=' text-[1.3rem] capitalize'>
                            {myTexts.measure} <span className='text-secondary-red'>*</span>
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

                    <div className='w-full lg:w-[33.3%] pr-[1.3%]  h-full mt-7'>
                        <div className=' text-[1.3rem] capitalize'>
                            {myTexts.publishedDateFrom}
                        </div>
                        <AzDatePicker   date={dateFrom} setDate={setDateFrom}/>
                    </div>

                    <div className='w-full lg:w-[33.3%] pr-[1.3%]  h-full mt-7'>
                        <div className=' text-[1.3rem] capitalize'>
                            {myTexts.publishedDateTo}
                        </div>
                        <AzDatePicker   date={dateTo} setDate={setDateTo}/>
                    </div>

                    <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                        <div className=' text-[1.3rem] capitalize'>
                            {myTexts.grantedOrganization} <span className='text-secondary-red'>*</span>
                        </div>
                        {/*<MainInput*/}
                        {/*    register={register}*/}
                        {/*    label={'grantedOrganization'}*/}
                        {/*    error={errors?.grantedOrganization?.message}*/}
                        {/*    name={'grantedOrganization'}*/}
                        {/*    type={'text'}*/}
                        {/*    placeholder={myTexts.grantedOrganization}*/}
                        {/*/>*/}
                        <Select
                            className={`border border-1 border-slate-700 w-full flex px-3 min-h-[3.85rem] flex-row items-center justify-between bg-transparent rounded-[1.2rem] text-[#A1A1A1] border-[#A1A1A1]`}

                            onChange={(e)=>{

                                setGrantedOg( e)
                                // getToCurrenciesFunc(e?.value)
                            }}
                            value={grantedOg}
                            options={grantedOgOptions}
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
                    <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                        <div className=' text-[1.3rem] capitalize'>
                            {myTexts.price} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'price'}
                            error={errors?.price?.message}
                            name={'price'}
                            type={'number'}
                            placeholder={myTexts.price}
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
                    <RegisterBtn loading={createPending} otherClass={'w-full lg:w-[12rem] mt-12'} type={'submit'} disabled={false}>
                        Save
                    </RegisterBtn>
                </form>
            </div>
        </div>
    );
};

export default AddProductForm;