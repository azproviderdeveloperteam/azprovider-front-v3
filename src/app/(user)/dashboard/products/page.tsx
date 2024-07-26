'use client'
import React, {useEffect, useState} from 'react';
 import {useQuery} from "@tanstack/react-query";
 import {getDashboardProducts} from "@/services/dashboardProductsServices";
import ProductList from "@/components/dashboard/products/productList";
import AddProductForm from "@/components/dashboard/products/AddProductForm";
import AddProductCard from "@/components/dashboard/products/AddProductCard";
import {getGrantedOrganisationList, getMeasureList} from "@/services/measurementServices";

const ProductsPage = () => {

    const [viewAddProductForm , setViewAddProductForm] = useState(false)
    const [submit ,setSubmit] = useState(0)
    const {data : productsData, isPending :productsPending, error : productsError} = useQuery({
        queryKey: ['get-dashboard-products' , submit],
        queryFn: getDashboardProducts,
        retry:false,
    })
    const {data : allMeasureData, isPending :allMeasurePending, error : allMeasureError} = useQuery({
        queryKey: ['get-all-measure' , submit],
        queryFn: getMeasureList,
        retry:false,
    })
    const {data : getGrantedOrganisationListData, isPending :getGrantedOrganisationListPending, error : getGrantedOrganisationListError} = useQuery({
        queryKey: ['get-getGrantedOrganisationList' ,submit],
        queryFn: getGrantedOrganisationList,
        retry:false,
    })

    useEffect(()=>{
        if(productsData?.data){
            if (productsData?.data?.results?.length > 0){
                setViewAddProductForm(false)
            }else {
                setViewAddProductForm(true)

            }
        }
    },[productsData])
    return (
        viewAddProductForm ?
            <AddProductForm allGrantedList={getGrantedOrganisationListData} allMeasureData={allMeasureData} exitKey={productsData?.data?.results ? productsData?.data?.results?.length > 0 ? true : false : false} onClose={()=>{
                setViewAddProductForm(false)
                setSubmit(submit + 1)
            }}/>

            :
            <div className='w-full overflow-x-hidden'>
                <div className='max-w-[95rem] lg:w-[95rem] m-auto w-full flex flex-row items-start justify-start overflow-auto snap-x snap-mandatory '>
                    <ProductList productsData={productsData?.data?.results} setSubmit={setSubmit} submit={submit}/>

                </div>
                <div className={'max-w-[95rem] lg:w-[95rem] m-auto w-full  py-8 px-5'}>
                    <AddProductCard setViewForm={()=>setViewAddProductForm(true)}/>

                </div>
            </div>

    );
};

export default ProductsPage;