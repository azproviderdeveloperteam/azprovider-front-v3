'use client'
import React, {useState} from 'react';
import ProductCard from "@/components/Cards/ProductCard";
import {Tab, Tabs, TabsHeader} from "@material-tailwind/react";
import {useQuery} from "@tanstack/react-query";
import {getDashboardProducts} from "@/services/dashboardProductsServices";
import ProductList from "@/components/dashboard/products/productList";
const OnSalePage = () => {
    const [activeTab, setActiveTab] = useState<any>('All');

    const data = [
        {
            label: "All",
            value: "All",
            desc: ``,
            icon : null
        },
        {
            label: "Products",
            value: "Products",
            desc: ``,
            icon : null
        },
        {
            label: "Services",
            value: "Services",
            desc: ``,
            icon : null
        },

    ]

    const {data : productsData, isPending :productsPending, error : productsError} = useQuery({
        queryKey: ['get-dashboard-products' ],
        queryFn: getDashboardProducts,
        retry:false,
    })

    return (
        <div className='w-full'>
            <div className='w-full h-[63px] '>
                <Tabs id={'account-tabs'} value={activeTab}>
                    <TabsHeader
                        defaultValue={'Account'}
                        className="text-primary-green-tb rounded-none border-b p-0 font-roboto bg-transparent  h-[63px] overflow-x-auto"
                        indicatorProps={{
                            className:
                                "text-white bg-transparent border-b-4 border-primary-dark-b shadow-none rounded-none font-Poppins",
                        }}
                    >
                        {data?.map(({ label, value,icon }) => (
                            <Tab key={value} value={value}
                                 onClick={() => {
                                     setActiveTab(value)
                                 }}
                                 className={`${activeTab === value ? " text-primary-dark-b font-bold py-2 font-roboto " : "font-bold text-primary-green-tb py-2 font-roboto bg-transparent "} capitalize text-[1.2rem] shrink-0 md:w-[25rem] w-[30vw]`}
                            >
                                <div className='w-full flex flex-row items-center justify-center'>
                                    <div className='flex flex-row items-center justify-center p-1'
                                         style={{filter:activeTab === value ? "invert(40%) sepia(52%) saturate(2334%) hue-rotate(199deg) brightness(98%) contrast(87%)":""}}
                                    >
                                        {icon}
                                    </div>
                                    {label}
                                </div>
                            </Tab>
                        ))}
                    </TabsHeader>
                </Tabs>
            </div>
            <div className='w-full overflow-x-hidden'>
                <div className='max-w-[95rem] lg:w-[95rem] m-auto w-full flex flex-row items-start justify-start overflow-auto snap-x snap-mandatory '>
                    <ProductList productsData={productsData?.data} />

                </div>
            </div>
        </div>

    );
};

export default OnSalePage;