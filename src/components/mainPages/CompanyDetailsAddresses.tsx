'use client'
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {getCompanyDetails} from "@/services/companyServices";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
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

const CompanyDetailsAddresses = ({slug}:any) => {
    const { data, isLoading, error } = useQuery({
        queryKey: [`getCompanyDetails+${slug}`],
        queryFn: () => getCompanyDetails(slug),
        retry: false,
        enabled: false, // This prevents re-fetching
    });


    console.log(data)
    return (
        data?.data?.addresses?.length > 0 ?
        <div className='w-full grid grid-cols-12 mb-4 gap-4'>
            {data?.data?.addresses?.map((itm : any , idx : number)=>{
                return(
                    <div className='col-span-12 md:col-span-6 lg:col-span-4 ' key={idx+1}>
                        <div key={idx+1} className='mt-4 w-full p-4 rounded-md border border-[1px] border-[#000]/20  flex flex-row items-start justify-start gap-4'>

                            <MapContainer style={{ height: 200, width: '50%', marginTop:"1rem" }} center={[itm?.latitude || 0 , itm?.longitude || 0 ]} zoom={8} scrollWheelZoom={true}>
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
                            <div className={'mt-4 '}>
                                {
                                    `
                                            ${itm?.title ||''} : ${itm?.country}, ${itm?.city}, ${itm?.state}, ${itm?.street}, ${itm?.building}, ${itm?.number}, ${itm?.zipcode}
                                            `
                                }
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>

            :   <span className='ml-1 text-[0.8rem] text-[#8E8E8E] font-bold capitalize'>
                {`no location`}
            </span>
    );
};

export default CompanyDetailsAddresses;