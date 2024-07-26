'use client'
import React, {useEffect, useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import {getDashboardServices} from "@/services/dashboardProductsServices";
import {getAllMeasure, getGrantedOrganisationList} from "@/services/measurementServices";
import AddProductForm from "@/components/dashboard/products/AddProductForm";
import ProductList from "@/components/dashboard/products/productList";
import AddProductCard from "@/components/dashboard/products/AddProductCard";
import AddServiceForm from "@/components/dashboard/services/AddServiceForm";
import ServiceListDashboard from "@/components/dashboard/services/ServiceListDashboard";
import AddServiceCard from "@/components/dashboard/services/AddServiceCard";

const ServicesPage = () => {
    const [viewAddProductForm , setViewAddProductForm] = useState(false)
    const [submit ,setSubmit] = useState(0)


    const {data : servicesData, isPending :servicesPending, error : servicesError} = useQuery({
        queryKey: ['get-dashboard-services' , submit],
        queryFn: getDashboardServices,
        retry:false,
    })
    const {data : allMeasureData, isPending :allMeasurePending, error : allMeasureError} = useQuery({
        queryKey: ['get-all-measure' , submit],
        queryFn: getAllMeasure,
        retry:false,
    })



    const {data : getGrantedOrganisationListData, isPending :getGrantedOrganisationListPending, error : getGrantedOrganisationListError} = useQuery({
        queryKey: ['get-getGrantedOrganisationList' ,submit],
        queryFn: getGrantedOrganisationList,
        retry:false,
    })

    useEffect(()=>{

        if(servicesData?.data){
            if (servicesData?.data?.length > 0){
                setViewAddProductForm(false)
            }else {
                setViewAddProductForm(true)

            }
        } else setViewAddProductForm(true)
    },[servicesData])

    return (
       viewAddProductForm ?
            <AddServiceForm allGrantedList={getGrantedOrganisationListData} allMeasureData={allMeasureData} exitKey={servicesData?.data ? servicesData?.data?.length > 0 ? true : false : false} onClose={()=>{
                setViewAddProductForm(false)
                setSubmit(submit + 1)
            }}/>

            :
            <div className='w-full overflow-x-hidden'>
                <div className='max-w-[95rem] lg:w-[95rem] m-auto w-full flex flex-row items-start justify-start overflow-auto snap-x snap-mandatory '>
                    <ServiceListDashboard productsData={servicesData?.data} setSubmit={setSubmit} submit={submit}/>

                </div>
                <div className={'max-w-[95rem] lg:w-[95rem] m-auto w-full  py-8 px-5'}>
                    <AddServiceCard setViewForm={()=>setViewAddProductForm(true)}/>

                </div>
            </div>
    );
};

export default ServicesPage;