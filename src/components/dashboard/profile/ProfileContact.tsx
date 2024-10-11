'use client'
import React, {useEffect, useState} from 'react';
import {texts} from "@/utils/texts";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useMutation} from "@tanstack/react-query";
import {getAddresses, patchContact, postContact} from "@/services/profileServices";
import * as Yup from "yup";
import MainInput from "@/components/inputs/MainInput";
import AzDialog from "@/components/dialog/AzDialog";
import {Button, Checkbox} from "@material-tailwind/react";
import RegisterBtn from "@/components/Buttons/RegisterBtn";
import toast from "react-hot-toast";
import {AxiosError} from "axios";
import Image from "next/image";
import AddEditAddress from "@/components/dashboard/profile/AddEditAddress";
import {useQuery} from "@tanstack/react-query";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import L from 'leaflet';

const DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const ProfileContact = ({contactData} : any) => {
    const text = texts.eng
    const myTexts = text.dashboard.pages.profile.contact
    const [socials,setSocials] = useState<any>([])
    const [socialsDialog,setSocialDialog] = useState<any>(false)
    const [moreData , setMoreData] = useState(false)
    const [addAddress , setAddAddress] = useState<any>(undefined)
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
    const {data :patchContactData , isPending:patchContactPending  , error :patchContactError  , mutateAsync :patchContactMutateAsync} =useMutation({
        mutationFn : patchContact
    })
    const {data : AddressesData, isPending :AddressesPending, error : AddressesError} = useQuery({
        queryKey: ['get-addresses',addAddress],
        queryFn: getAddresses,
        retry:false,
    })


    console.log(AddressesData)

    const addSocials = () =>{
        for(let x in socials){
            try {

            }catch (e) {
                
            }
        }
    }
    const submit = async (d:any)=>{

        const formData = {
            ...(d?.tell && {tel:d?.tell}),
            ...(d?.fax && {fax:d?.fax}),
            ...(d?.websiteAddress && {website:d?.websiteAddress}),
            is_default:true
        }

        try {
            if(contactData?.[0]?.id){
                const d = await patchContactMutateAsync({id:contactData?.[0]?.id , data:formData})
                toast.success("Data Saved Successfully !")
            }else {
                const d = await mutateAsync(formData)
                toast.success("Data Saved Successfully !")
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
        console.log(contactData?.[0])
        setValue('tell',contactData?.[0]?.tel)
        setValue('fax',contactData?.[0]?.fax)
        setValue('websiteAddress',contactData?.[0]?.website)
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

                        {/*<Button className={'flex flex-row items-center justify-center font-roboto font-normal normal-case shadow-none hover:shadow-none text-[1.1rem] mt-12 bg-transparent text-primary-green-tb'} onClick={()=>setMoreData(!moreData)} disabled={false}>*/}
                        {/*    {myTexts.advanceDataInformation}*/}
                        {/*    <Image src={'/green-tb-arrow.svg'} alt={'arrow-carousel-az-provider'} width={40} height={40} className={moreData ? 'transition duration-500' : 'rotate-180 transition duration-500'}/>*/}

                        {/*</Button>*/}
                    </div>


                </form>
            </div>
            <AddEditAddress item={addAddress} open={addAddress !== undefined} onClose={()=>setAddAddress(undefined)}/>
                <div className='w-full bg-[#F8F8F8] p-3 rounded-[1rem] p-8 mt-5'>
                    <h2>
                        Addresses
                    </h2>

                    {
                        AddressesData?.data?.map((itm : any , idx:number)=>{
                            return(
                                <div key={idx+1} className='mt-4 w-full p-4 rounded-md border border-[1px] border-[#000]/20  flex flex-row items-start justify-start gap-4'>
                                    {
                                        <MapContainer style={{ height: 280, width: '50%', marginTop:"1rem" }} center={[itm?.latitude || 0 , itm?.longitude || 0 ]} zoom={20} scrollWheelZoom={true}>
                                            <TileLayer
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />

                                            <Marker position={[itm?.latitude || 0 , itm?.longitude || 0 ]}>
                                                <Popup>
                                                    A pretty CSS3 popup. <br /> Easily customizable.
                                                </Popup>
                                            </Marker>
                                        </MapContainer>

                                    }
                                    <div className={'mt-4 '}>
                                        {
                                            `
                                            ${itm?.title ||''} : ${itm?.country}, ${itm?.city}, ${itm?.state}, ${itm?.street}, ${itm?.building}, ${itm?.number}, ${itm?.zipcode}
                                            `
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                    <RegisterBtn onClick={()=>setAddAddress(null)}>
                        Add New Address
                    </RegisterBtn>
                </div>
        </div>
    );
};

export default ProfileContact;