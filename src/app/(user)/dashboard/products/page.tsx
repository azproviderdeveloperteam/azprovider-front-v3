'use client'
import React, {useEffect, useState} from 'react';
 import {useQuery} from "@tanstack/react-query";
 import {getDashboardProducts} from "@/services/dashboardProductsServices";
import ProductList from "@/components/dashboard/products/productList";
import AddProductForm from "@/components/dashboard/products/AddProductForm";
import AddProductCard from "@/components/dashboard/products/AddProductCard";

const ProductsPage = () => {

    const [viewAddProductForm , setViewAddProductForm] = useState(false)

    const {data : productsData, isPending :productsPending, error : productsError} = useQuery({
        queryKey: ['get-dashboard-products'],
        queryFn: getDashboardProducts,
        retry:false,
    })

    useEffect(()=>{
        if(productsData?.data){
            if (productsData?.data?.length > 0){
                setViewAddProductForm(false)
            }else {
                setViewAddProductForm(true)

            }
        }
    },[productsData])
    return (
        viewAddProductForm ?
            <AddProductForm exitKey={productsData?.data ? productsData?.data?.length > 0 ? true : false : false} onClose={()=>setViewAddProductForm(false)}/>

            :
            <div className='max-w-[95rem] lg:w-[95rem] m-auto w-full flex flex-row items-start justify-start overflow-auto snap-x snap-mandatory px-6'>
                <ProductList productsData={productsData?.data} />
                <div className={'py-8'}>
                    <AddProductCard setViewForm={()=>setViewAddProductForm(true)}/>

                </div>
            </div>
    );
};

export default ProductsPage;