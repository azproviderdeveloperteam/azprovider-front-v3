'use client'
import React, {useEffect, useRef, useState} from 'react';
import Image from "next/image";
import {Button, ThemeProvider} from "@material-tailwind/react";
import {texts} from "@/utils/texts";
import {useMutation , useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import toast from "react-hot-toast";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import MainInput from "@/components/inputs/MainInput";
import {postBInfo} from "@/services/profileServices";
import RegisterBtn from "@/components/Buttons/RegisterBtn";
import Select from "react-select";
import {getUserRoleList} from "@/services/authServices";
import value = ThemeProvider.propTypes.value;
import {getCities ,getCountries} from "@/services/cityCountryServices";
import ThreeDotsLoader from "@/components/loaders/ThreeDotsLoader";
import {flushSync} from "react-dom";

const ProfileBInfo = ({bInfoData} : any) => {

    const [img ,setImg] = useState<any>(null)
    const [imgView ,setImgView] = useState<any>(null)
    const [bRole, setBRole] = useState<any>([]); // Default selected value
    const [bRoleOptions , setBRoleOptions] = useState<any>([] )
    const [inputValue, setInputValue] = useState('');
    const [typingTimeout, setTypingTimeout] = useState<any>(null);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [cities, setCities] = useState<any[]>([]);

    const [selectedCountry, setSelectedCountry] = useState<any>(null); // Default selected value
    const [selectedCity, setSelectedCity] = useState<any>(null); // Default selected value

    const text = texts.eng
    const myTexts = text.dashboard.pages.profile.bInfo
    const inputRef = useRef<any>(null)

    const schema = Yup
        .object({

        }).shape({
            first_name:Yup.string(),
            last_name:Yup.string(),
            international_name:Yup.string(),
            business_register_code:Yup.string(),
            // business_role:Yup.string(),
            email:Yup.string(),


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


    const { data :initialCities, error: initialCitiesError, isPending : citiesPending } = useQuery({
        queryKey: ['cities', selectedCountry],
        queryFn: () => getCities(selectedCountry?.label, page, 50 , undefined),
    });
    useEffect(() => {
        if (initialCities) {
                setCities(initialCities?.data?.results ? initialCities?.data?.results?.map(x=>{return{value:x.id , label :x?.name}}) || [] : []);
        }
    }, [initialCities]);
    useEffect(()=>{
        setImgView(`${bInfoData?.logo}`)
        setImg(bInfoData?.logo)

        setValue('international_name',bInfoData?.international_name)
        setValue('first_name',bInfoData?.first_name)
        setValue('last_name',bInfoData?.last_name)
        setValue('business_register_code',bInfoData?.business_register_code)
        // setValue('business_role',bInfoData?.business_role)
        setBRole(bInfoData?.business_role?.map(x=>{return{label:x.title , value : x?.id}}))
        setSelectedCity({label:bInfoData?.city , value:'1'})
        setSelectedCountry({label:bInfoData?.country , value:'2'})
        setValue('email',bInfoData?.email)

    },[bInfoData])


    const submit = async (d : any) =>{
        const data = {
            first_name:d?.first_name,
            last_name:d?.last_name,
            international_name:d?.international_name,
            business_register_code:d?.business_register_code,
            business_role_id:bRole?.map(x => x?.value),
            country:selectedCountry?.label,
            city:selectedCity?.label
            // email:d?.email,

        }
        try {
            const d = await mutateAsync({
                data,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
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
        }
    }

    const uploadLogo = async (e : any) =>{
         const formData = new FormData()
        formData.append('logo' , e)
        try {
            await mutateAsync({
                data :formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success("Logo Uploaded Successfully !")

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

    const {data : allRoleData, isPending :allRolePending, error : allRoleError} = useQuery({
        queryKey: ['get-all-Role' ],
        queryFn: getUserRoleList,
        retry:false,
    })

    useEffect(()=>{
        let mo :any[] = []

        if(allRoleData?.data){
            allRoleData?.data?.map((x:any)=>mo.push({value:x?.id , label : x?.title}))
        }
        setBRoleOptions(mo)
    },[allRoleData])


    const {
        data: countries,
        isPending: countriesPending,
        error: countriesError,
    } = useQuery({
        queryKey: ['get-countries'],
        queryFn: getCountries,
        retry: false,
    });

    useEffect(()=>{
        setPage(1)
    },[countries])
    const loadMoreCities = async (cityName : string | undefined) => {
        if (isLoadingMore) return;

        setIsLoadingMore(true);
        const nextPage = page + 1;

        try {

            if(cityName){
                const moreCitiesResponse = await getCities(selectedCountry?.label?.toString(), nextPage , 50 , cityName);
                const newCities = moreCitiesResponse?.data?.results?.map(x=>{return{value:x.id , label :x?.name}}) || [];

                if (newCities.length === 0) {
                    setPage(1)
                    setIsLoadingMore(false);
                    return;
                }
                flushSync(()=>{
                    setCities(newCities)
                    setPage(1)
                })
            }else {
                const moreCitiesResponse = await getCities(selectedCountry?.label?.toString(), nextPage , 50 , undefined);
                const newCities = moreCitiesResponse?.data?.results?.map(x=>{return{value:x.id , label :x?.name}}) || [];

                if (newCities.length === 0) {
                    setPage(1)
                    setIsLoadingMore(false);
                    return;
                }
                flushSync(()=>{
                    const a = cities.concat(newCities)
                    setCities(a)
                }) ;
                flushSync(()=>setPage(nextPage)) ;
            }




        } catch (error) {
            console.error("Error loading more cities:", error);
        } finally {
            setIsLoadingMore(false);
        }
    };





    const handleInputChange = (newValue: string) => {
        // Clear the previous timeout
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        // Update input value and set a new timeout
        setInputValue(newValue);

        // Set a new timeout to delay the search
        setTypingTimeout(
            setTimeout(() => {
                loadMoreCities(newValue); // Trigger the search after 1 second of inactivity
            }, 1000)
        );
    };



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
                            label={'international_name'}
                            error={errors?.interName?.message}
                            name={'international_name'}
                            type={'text'}
                            placeholder={myTexts.interName}
                        />
                    </div>

                    <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                        <div className=' text-[1.3rem] capitalize'>
                            {'First Name'} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'first_name'}
                            error={errors?.first_name?.message}
                            name={'first_name'}
                            type={'text'}
                            placeholder={'first name'}
                        />
                    </div>


                    <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                        <div className=' text-[1.3rem] capitalize'>
                            {"Last Name"} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'last_name'}
                            error={errors?.last_name?.message}
                            name={'last_name'}
                            type={'text'}
                            placeholder={'last name'}
                        />
                    </div>


                    <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                        <div className=' text-[1.3rem] capitalize'>
                            {'Business Register Code'} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'business_register_code'}
                            error={errors?.business_register_code?.message}
                            name={'business_register_code'}
                            type={'text'}
                            placeholder={'business register code'}
                        />
                    </div>


                    <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                        <div className=' text-[1.3rem] capitalize'>
                            {'Business Role'} <span className='text-secondary-red'>*</span>
                        </div>
                        {/*<MainInput*/}
                        {/*    register={register}*/}
                        {/*    label={'business_role'}*/}
                        {/*    error={errors?.business_role?.message}*/}
                        {/*    name={'business_role'}*/}
                        {/*    type={'text'}*/}
                        {/*    placeholder={'business role'}*/}
                        {/*/>*/}
                        <Select
                            className={`border border-1 border-slate-700 w-full flex px-3 min-h-[3.85rem] flex-row items-center justify-between bg-transparent rounded-[1.2rem] text-[#A1A1A1] border-[#A1A1A1]`}
                            isMulti
                            onChange={(e)=>{

                                setBRole( e)
                                // getToCurrenciesFunc(e?.value)
                            }}
                            value={bRole}
                            options={bRoleOptions}
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
                                multiValueLabel: () => 'bg-white  rounded-xl shadow-md',
                                option: ({ isFocused, isSelected }) =>'bg-white px-4 py-1',
                            }}
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
                    <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>

                        <div className=' text-[1.3rem]'>
                            Country <span className='text-secondary-red'>*</span>
                        </div>
                        {/*<MainInput*/}
                        {/*    register={register}*/}
                        {/*    label={'City Or Country'}*/}
                        {/*    error={errors?.cityOrCountry?.message}*/}
                        {/*    name={'cityOrCountry'}*/}
                        {/*    type={'text'}*/}
                        {/*    placeholder={'City Or Country'}*/}
                        {/* />*/}

                        {
                            countriesPending ?

                                <div className='w-full h-[3rem] flex flex-row items-center justify-center'>
                                    <ThreeDotsLoader />
                                </div>

                                :<Select
                                    className={`border border-1 border-slate-700 w-full flex px-3 min-h-[3.85rem] flex-row items-center justify-between bg-transparent rounded-[1.2rem] text-[#A1A1A1] border-[#A1A1A1]`}

                                    onChange={(e)=>{

                                        setSelectedCountry( e)
                                        // getToCurrenciesFunc(e?.value)
                                    }}
                                    value={selectedCountry}
                                    options={countries?.data?.results ? countries?.data?.results?.map(x=>{return{value:x.id , label :x?.name}}) || [] : []}
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
                                        multiValueLabel: () => 'bg-white  rounded-xl shadow-md',
                                        option: ({ isFocused, isSelected }) =>'bg-white px-4 py-1',
                                    }}
                                />
                        }
                    </div>
                    <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                        <div className=' text-[1.3rem]'>
                            City <span className='text-secondary-red'>*</span>
                        </div>


                        <Select
                            onMenuScrollToBottom={()=>loadMoreCities(undefined)}  // Trigger when reaching the bottom of the list
                            className={`border border-1 border-slate-700 w-full flex px-3 min-h-[3.85rem] flex-row items-center justify-between bg-transparent rounded-[1.2rem] text-[#A1A1A1] border-[#A1A1A1]`}
                            onChange={(e)=>{
                                setSelectedCity( e)
                                // getToCurrenciesFunc(e?.value)
                            }}
                            value={selectedCity}
                            options={cities}
                            onInputChange={(e)=>handleInputChange(e)}
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
                                multiValueLabel: () => 'bg-white  rounded-xl shadow-md',
                                option: ({ isFocused, isSelected }) =>'bg-white px-4 py-1',
                            }}
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