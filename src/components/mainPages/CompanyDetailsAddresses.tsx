'use client'
import React, {useRef} from 'react';
import {useQuery} from "@tanstack/react-query";
import {getCompanyDetails} from "@/services/companyServices";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import {useDraggable} from "react-use-draggable-scroll";

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
    const ref = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);

    const { events } = useDraggable(ref);


    return (

        <div {...events} ref={ref} className='w-full flex flex-row items-start justify-start overflow-x-auto no-scrollbar gap-3'>
            { data?.data?.addresses?.length > 0 ? data?.data?.addresses?.map((itm : any , idx : number)=>{
                return(
                    <div className='w-10/12' key={idx+1}>
                        <div key={idx+1} className='mt-4 w-full p-4 rounded-2xl shadow-2xl bg-gray-100 flex flex-col items-start justify-start gap-4'>

                            <MapContainer style={{ height: 200, width: '100%', marginTop:"1rem" }} center={[itm?.latitude || 0 , itm?.longitude || 0 ]} zoom={8} scrollWheelZoom={true}>
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
            })

                :   <span className='ml-1 text-[0.8rem] text-[#8E8E8E] font-bold capitalize'>
                {`no location`}
            </span>
            }
        </div>


    );
};

export default CompanyDetailsAddresses;