'use client'
import React from 'react';
import bg from "@/public/about-usImage-logo.png";
import Image from "next/image";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";


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

const ContactUsPage = () => {
    return (
        <div className='w-full ' >
            <div className='relative w-full    m-auto h-autopt-[2rem] bg-center bg-no-repeat bg-cover '  style={{backgroundImage:`url(${bg.src})`}}>
                <div className=' bg-[#051926] bg-opacity-80 flex flex-col lg:flex-row items-center justify-center w-full  !py-[6rem]  px-[3%] text-white'>
                    <div className='w-full max-w-[66rem] m-auto bg-primary-hsDark11 lg:aspect-[3.152] rounded-[2rem] flex flex-row items-center justify-between'>
                        <div className='py-8 pl-8 w-full'>
                            <h1 className='text-[1.5rem] font-bold'>
                                Contact Us
                            </h1>
                            <p className='w-full mt-3 text-[0.9rem] '>
                                {/*Founded in 2010, <span className='font-bold mx-1 '> AzProvider</span>  has evolved from a supply chain company to a comprehensive digital platform, offering a diverse selection of products and exclusive services from reliable global suppliers. Our platform simplifies sourcing raw materials and finished goods, ensuring high standards for quality, reliability, and affordability. We provide small businesses and large corporations with seamless, efficient supply chain solutions, allowing them to focus on growth. Discover how AZ Provider can support your business today.*/}
                            </p>
                        </div>
                    </div>
                </div>
            </div>




            <div className='  w-full   m-auto h-auto   bg-center bg-no-repeat bg-cover  px-[3%] bg-gradient-to-b from-zinc-100 to-slate-50'  >
                <div className=' w-full 2xl:w-[96rem] m-auto h-auto flex flex-col items-center justify-start py-10'>
                    <div className={'max-w-full min-w-[20rem] flex flex-col items-center justify-start'}>
                        <div id={'one'} className='w-full opacity-40' >
                            <div className='w-full'   >
                                <div className='w-full'  >
                                    <h1 className=' py-3 px-5 w-full text-center text-[100%] opacity-0'  >
                                        What Sets Us Apart
                                    </h1>
                                </div>
                            </div>
                        </div>

                        <h1 className='absolute py-3 px-5 w-full text-center text-[100%] '  >
                            What Sets Us Apart
                        </h1>

                    </div>
                    <div className='max-w-full w-[20rem] flex flex-row items-center justify-center '>
                        <div  className={`h-[2px] w-full  rounded-full`} style={{background:'linear-gradient(90deg, #D48F09 0%, #278BD4 100%)'}}>
                            <div   className={`h-[2px] w-full  rounded-full`} style={{background:'linear-gradient(90deg, #0A0C10 0%, rgba(10, 12, 16, 0) 50%, #0A0C10 100%)'}}>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' w-full 2xl:w-[96rem] m-auto flex flex-col lg:flex-row items-start justify-between px-[3%]'>
                    <div className='w-full lg:w-1/3 flex  flex-col items-center justify-start m-3'>
                        <div className='relative w-[5rem] aspect-square rounded-r-[2rem] rounded-bl-[2rem] overflow-visible !bg-primary-green-tb/20'  >
                            <div className='flex flex-row items-center justify-center absolute left-[0.3rem] top-[-0.3rem] w-[5rem] aspect-square rounded-t-[2rem] rounded-bl-[2rem] bg-black/10 backdrop-blur-[2px]	 border-[1px] border-white/20' >
                                <Image src={'/icon-for-send-email.svg'} alt={'icon-for-send-email.svg'} width={40} height={40} />
                            </div>
                        </div>
                        <h3 className={'ml-2 md:mt-2'}>
                            Email
                        </h3>
                        <p className='text-center mt-4 text-[0.8rem]  px-5'>
                           azprovider@hotmail.com
                        </p>
                        <p className='text-center mt-1 text-[0.8rem]  px-5'>
                            azprovider@diplomaservice.ir
                        </p>
                    </div>

                    <div className='w-full lg:w-1/3 flex  flex-col items-center justify-start m-3'>
                        <div className='relative w-[5rem] aspect-square rounded-r-[2rem] rounded-bl-[2rem] overflow-visible !bg-primary-green-tb/20'  >
                            <div className='flex flex-row items-center justify-center absolute left-[0.3rem] top-[-0.3rem] w-[5rem] aspect-square rounded-t-[2rem] rounded-bl-[2rem] bg-black/10 backdrop-blur-[2px]	 border-[1px] border-white/20' >
                                <Image src={'/call-company.svg'} alt={'call-company.svg'} width={40} height={40} />

                            </div>
                        </div>
                        <h3 className={'ml-2 md:mt-2'}>
                            Call

                        </h3>
                        <p className='text-center mt-4 text-[0.8rem]  px-5'>
                            +9821 44000251
                        </p>
                        <p className='text-center mt-1 text-[0.8rem]  px-5'>
                            +9821 44954303
                        </p>
                        <p className='text-center mt-1 text-[0.8rem]  px-5'>
                            +98 938 712 6050
                        </p>
                    </div>


                    <div className='w-full lg:w-1/3 flex  flex-col items-center justify-start m-3'>
                        <div className='relative w-[5rem] aspect-square rounded-r-[2rem] rounded-bl-[2rem] overflow-visible !bg-primary-green-tb/20'  >
                            <div className='flex flex-row items-center justify-center absolute left-[0.3rem] top-[-0.3rem] w-[5rem] aspect-square rounded-t-[2rem] rounded-bl-[2rem] bg-black/10 backdrop-blur-[2px]	 border-[1px] border-white/20' >
                                <Image src={'/gray-location.svg'} alt={`location of `} width={40} height={40} />


                            </div>
                        </div>
                        <h3 className={'ml-2 md:mt-2'}>
                            Address

                        </h3>
                        <p className='text-center mt-4 text-[0.8rem]  px-5'>
                            Unit 4, No 22, 4th Vahdat St.,
                            Shahed St. East Payambar St.
                            Tehran, IRAN
                        </p>

                    </div>

                </div>

                <div className='w-full 2xl:w-[96rem] px-5 mx-auto my-8'>
                    <MapContainer style={{ height: 600, width: '100%', marginTop:"1rem" }} center={[35.73948885388448, 51.329641450258954 ]} zoom={12} scrollWheelZoom={true}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={[ 35.73948885388448, 51.329641450258954]}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>

        </div>
    );
};

export default ContactUsPage;