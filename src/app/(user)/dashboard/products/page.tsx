'use client'
import React, {useEffect, useRef, useState} from 'react';
 import {useQuery} from "@tanstack/react-query";
 import {getDashboardProducts} from "@/services/dashboardProductsServices";
import ProductList from "@/components/dashboard/products/productList";
import AddProductForm from "@/components/dashboard/products/AddProductForm";
import AddProductCard from "@/components/dashboard/products/AddProductCard";
import {getGrantedOrganisationList, getMeasureList} from "@/services/measurementServices";
import {useDraggable} from "react-use-draggable-scroll";

const ProductsPage = () => {
    const ref = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);
    const { events } = useDraggable(ref);

    const [viewAddProductForm , setViewAddProductForm] = useState<any>(undefined)
    const [submit ,setSubmit] = useState(0)
    const {data : productsData, isPending :productsPending, error : productsError} = useQuery({
        queryKey: ['get-dashboard-products' , submit],
        queryFn: getDashboardProducts,
        retry:false,
        refetchOnWindowFocus:false
    })
    const {data : allMeasureData, isPending :allMeasurePending, error : allMeasureError} = useQuery({
        queryKey: ['get-all-measure' , submit],
        queryFn: getMeasureList,
        retry:false,
        refetchOnWindowFocus:false

    })
    const {data : getGrantedOrganisationListData, isPending :getGrantedOrganisationListPending, error : getGrantedOrganisationListError} = useQuery({
        queryKey: ['get-getGrantedOrganisationList' ,submit],
        queryFn: getGrantedOrganisationList,
        retry:false,
        refetchOnWindowFocus:false

    })

    useEffect(()=>{
        if(productsData?.data){
            if (productsData?.data?.length > 0){
                setViewAddProductForm(undefined)
            }else {
                setViewAddProductForm(null)

            }
        }
    },[productsData])
    return (
        <>
            {
                viewAddProductForm !== undefined &&
                    <AddProductForm  viewAddProductForm={viewAddProductForm}  allGrantedList={getGrantedOrganisationListData} allMeasureData={allMeasureData} exitKey={productsData?.data ? productsData?.data?.length > 0 ? true : false : false} onClose={()=>{
                        setViewAddProductForm(undefined)
                        setSubmit(submit + 1)
                    }}/>
            }

            <div className={`w-full overflow-x-hidden ${viewAddProductForm !== undefined ? 'hidden' :""}`}>
                <div {...events}
                     ref={ref} className='max-w-[95rem] lg:w-[95rem] m-auto w-full flex flex-row items-start justify-start overflow-x-auto no-scrollbar'>
                    <ProductList  setViewForm={(e : any)=>setViewAddProductForm(e)} productsData={productsData?.data} setSubmit={setSubmit} submit={submit}/>

                </div>
                <div className={'max-w-[95rem] lg:w-[95rem] m-auto w-full  py-8 px-5'}>
                    <AddProductCard setViewForm={()=>setViewAddProductForm(null)}/>

                </div>
            </div>
        </>

    );
};

export default ProductsPage;