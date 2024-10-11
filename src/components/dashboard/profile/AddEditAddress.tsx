'use client'
import React, {useState} from 'react';
import AzDialog from "@/components/dialog/AzDialog";
import MainInput from "@/components/inputs/MainInput";
import RegisterBtn from "@/components/Buttons/RegisterBtn";
import {texts} from "@/utils/texts";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {useMutation} from "@tanstack/react-query";
import {postAddress} from "@/services/profileServices";
import "leaflet/dist/leaflet.css";

import {MapContainer, TileLayer, Marker, useMapEvents, Popup} from "react-leaflet";
import toast from "react-hot-toast";
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

const AddEditAddress = ({item , open , onClose}:any) => {
    const text = texts.eng
    const myTexts = text.dashboard.pages.profile.contact
    const [position, setPosition] = useState<any>([35.7219, 51.3347])

    const schema = Yup
        .object({

        }).shape({
            title:Yup.string().default(''),
            country:Yup.string().default(''),
            city:Yup.string().default(''),
            state:Yup.string().default(''),
            street:Yup.string().default(''),
            building:Yup.string().default(''),
            number:Yup.string().default(''),
            zipcode:Yup.string().default(''),
            // is_available:Yup.boolean().default(true),
            // is_default:Yup.boolean().default(true),

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
        mutationFn : postAddress
    })


    const submit = async (d) =>{
        try {
            const data = await mutateAsync({...d , is_available:true , is_default:true , latitude:position[0] , longitude:position[1]})
            console.log(data?.data)
            toast.success('Address Added Successfully')
        }catch (e) {
            toast.error('Error Occurred')
        }
    }




    function makeACall(bounds, zoom, zoomThreshold = 8) {
        setPosition([bounds?._northEast?.lat,bounds?._northEast?.lng])
       console.log(bounds , zoom , zoomThreshold)
    }

    const MapEvents = () => {
        const map = useMapEvents({
            click : (e)=>setPosition([e?.latlng?.lat , e?.latlng?.lng]),
            moveend: () => makeACall(map.getBounds(), map.getZoom()),
            zoomend: () => makeACall(map.getBounds(), map.getZoom())
        });
        return null;
    };
    console.log(item)
    return (
        <AzDialog size={'xl'} open={open}  handler={onClose} >
            <form className='w-full  text-primary-dark-g flex flex-row items-start justify-start flex-wrap mt-4 relative z-10' onSubmit={handleSubmit(submit)}>
                <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                    <div className=' text-[1.3rem] capitalize'>
                        {myTexts.locationTitle} <span className='text-secondary-red'>*</span>
                    </div>
                    <MainInput
                        register={register}
                        label={'location title'}
                        error={errors?.title?.message}
                        name={'title'}
                        type={'text'}
                        placeholder={myTexts.locationTitle}
                    />
                </div>
                <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                    <div className=' text-[1.3rem] capitalize'>
                        {'Country'} <span className='text-secondary-red'>*</span>
                    </div>
                    <MainInput
                        register={register}
                        label={'cityCountry'}
                        error={errors?.country?.message}
                        name={'country'}
                        type={'text'}
                        placeholder={'country'}
                    />
                </div>
                <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                    <div className=' text-[1.3rem] capitalize'>
                        {'city'} <span className='text-secondary-red'>*</span>
                    </div>
                    <MainInput
                        register={register}
                        label={''}
                        error={errors?.city?.message}
                        name={'city'}
                        type={'text'}
                        placeholder={'city'}
                    />
                </div>
                <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                    <div className=' text-[1.3rem] capitalize'>
                        {'State / Province'} <span className='text-secondary-red'>*</span>
                    </div>
                    <MainInput
                        register={register}
                        label={'provinceState'}
                        error={errors?.state?.message}
                        name={'state'}
                        type={'text'}
                        placeholder={'state / province'}
                    />
                </div>


                <div className='w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7'>
                    <div className=' text-[1.3rem] capitalize'>
                        {myTexts.streetAllay} <span className='text-secondary-red'>*</span>
                    </div>
                    <MainInput
                        register={register}
                        label={'streetAllay'}
                        error={errors?.street?.message}
                        name={'street'}
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
                        error={errors?.zipcode?.message}
                        name={'zipcode'}
                        type={'text'}
                        placeholder={myTexts.zipCode}
                    />
                </div>
                <MapContainer style={{ height: 280, width: '100%', marginTop:"1rem" }} center={position} zoom={5} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapEvents />
                    <Marker position={position}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>

                </MapContainer>

                <div className='w-full flex flex-col lg:flex-row items-center justify-between'>
                    <RegisterBtn loading={isPending} otherClass={'w-full lg:w-[12rem] mt-12'} type={'submit'} disabled={false}>
                        {myTexts.save}
                    </RegisterBtn>

                </div>


            </form>



         </AzDialog>
    );
};

export default AddEditAddress;